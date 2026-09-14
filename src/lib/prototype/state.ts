export type Scene = 'analysis'|'capture'|'finding'|'hold'|'request'|'sent'|'continue'|'offline';
export type JourneyState = { scene: Scene; pole: string; photoCount: number; photoCount024: number; message: string; instruction: 'await-review'|'hold'|'continue'; concernId: string };
export type JourneyEvent =
  | { type: 'scene'; scene: Scene }
  | { type: 'capture'|'flag'|'add-photo'|'next-pole'|'unable'|'reset' }
  | { type: 'instruction-received'; instruction: 'hold'|'continue'|'request'; reason: string };

export function seedScene(scene: Scene = 'finding'): JourneyState {
  return {scene, pole:'024', photoCount:1, photoCount024:1, message:'', instruction:scene==='continue'?'continue':['hold','request','sent','offline'].includes(scene)?'hold':'await-review', concernId:'concern-024'};
}

// Explicit scene selection simulates time/network conditions. User actions preserve record identity.
export function journeyReducer(state: JourneyState, event: JourneyEvent): JourneyState {
  switch(event.type) {
    case 'reset': return seedScene();
    case 'scene': return seedScene(event.scene);
    case 'capture': return {...state,scene:'finding',photoCount:Math.max(1,state.photoCount),message:''};
    case 'flag': return {...state,scene:'hold',instruction:'hold',message:''};
    case 'add-photo': return {...state,photoCount:state.photoCount+1,photoCount024:state.pole==='024'?state.photoCount+1:state.photoCount024,scene:state.scene==='request'?'sent':state.scene,message:state.scene==='offline'?'Photo saved on device. Upload pending.':'Photo added to this concern.'};
    case 'unable': return {...state,scene:'hold',instruction:'hold',message:'Office notified: requested view could not be obtained. Pole remains on hold.'};
    case 'next-pole': return {...state,pole:'025',scene:'capture',photoCount:0,instruction:'await-review',concernId:'concern-025',message:state.instruction==='continue'?'Pole 024 has authorization to continue. Now viewing pole 025.':'Pole 024 still awaits clearance. Now viewing pole 025.'};
    case 'instruction-received':
      if(!event.reason.trim()) return state;
      return {...state,pole:'024',photoCount:state.photoCount024,concernId:'concern-024',scene:event.instruction==='continue'?'continue':event.instruction==='request'?'request':'hold',instruction:event.instruction==='continue'?'continue':'hold',message:`Supervisor instruction received: ${event.reason}`};
  }
}
