export function decisionPrerequisite(action: string | null, state: { photoAvailable: boolean; reviewed: boolean; dirty: boolean; nesting: string }) {
  if (action !== 'continue' && action !== 'confirm') return '';
  if (!state.photoAvailable) return 'Wait for the photo to arrive before assessing this pole. Work remains on hold.';
  if (!state.reviewed || state.dirty) return 'Complete and save Your assessment below before making this work decision. A message to the crew does not replace the assessment.';
  if (action === 'continue' && state.nesting !== 'No nesting observed') return 'To release this hold, record No nesting observed in Your assessment. If the evidence is uncertain, keep the hold and request photos.';
  if (action === 'confirm' && state.nesting !== 'Nesting observed') return 'To confirm work stoppage, record Nesting observed in Your assessment. If the evidence is uncertain, keep the hold.';
  return '';
}

export function assessmentProblem(state: {bird: string; species: string; reason: string}) {
  if(state.bird === 'Not yet reviewed') return 'Choose Bird visibility. Select Uncertain if you cannot tell.';
  if(state.species === 'Not yet verified') return 'Choose Species assessment. Select Unknown if you cannot identify it.';
  if(state.bird === 'Visible' && state.species === 'No bird: non-animal object') return 'Bird visibility and species disagree. Review those selections before saving.';
  if(!state.reason.trim()) return 'Add evidence or a reason for your assessment.';
  return '';
}

export function crewDecision(instruction: "hold" | "continue" | "request", confirmedStoppage: boolean) {
  return instruction === "request" ? "request" : confirmedStoppage ? "stopped" : instruction;
}

export function shouldSupersedeDecision(delivery: string, assessmentChanged: boolean) {
  return delivery === 'Sent · Awaiting crew receipt' && assessmentChanged;
}
export function nextCorridorPole(pole: string) {
  return pole === '023' ? '024' : pole === '024' ? '025' : '023';
}
