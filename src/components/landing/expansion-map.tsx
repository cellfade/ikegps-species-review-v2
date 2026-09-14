"use client";
import { useState } from 'react';
import styles from './landing-page.module.css';
const groups = [
  { year: '2024', color: '#ae5a2d', points: [[95,205],[155,235],[220,200],[305,250],[375,205]] },
  { year: '2025', color: '#665cc6', points: [[130,170],[220,155],[295,190],[390,165],[445,205]] },
  { year: '2026', color: '#277c85', points: [[190,110],[275,140],[360,100],[435,135],[505,105]] },
];
export const syntheticObservations = groups.flatMap(group=>group.points.map(([x,y],index)=>({
 year:group.year, color:group.color, x, y,
 species:['IKEstrel','Osprey','American crow'][index%3],
 region:index%2===0?'Region A':'Region B',
 assessment:index===4?'Identity uncertain':'Reviewed observation',
})));
type MapProps={year?:string;onYearChange?:(year:string)=>void;species?:string};
export function ExpansionMap({year:controlledYear,onYearChange,species='All species'}:MapProps={}){
 const [localYear,setLocalYear]=useState('All years');
 const year=controlledYear??localYear;
 const setYear=(value:string)=>{setLocalYear(value);onYearChange?.(value);};
 const observations=syntheticObservations.filter(point=>(year==='All years'||point.year===year)&&(species==='All species'||point.species===species));
 return <figure className={styles.observationMap}>
  <div className={styles.mapToolbar}><div><strong>Nesting observations</strong><span>Synthetic data · Schematic region</span></div><label>Year <select value={year} onChange={e=>setYear(e.target.value)} aria-label="Illustrative observation year"><option>All years</option>{groups.map(g=><option key={g.year}>{g.year}</option>)}</select></label></div>
  <svg viewBox="0 0 600 320" role="img" aria-label={`Illustrative regional map of nesting observations: ${year}, ${species}, ${observations.length} records. Points are synthetic and do not represent real nest locations.`}>
   <rect width="600" height="320" fill="#f0f0e9"/>
   <path d="M0 45Q110 90 175 25T370 70T600 25V0H0ZM0 300Q100 240 170 290T360 265T600 300V320H0Z" fill="#e0e5d7"/>
   <path d="M350 -15C265 35 385 85 315 140S280 200 335 250S300 300 315 340" stroke="#d0e3e8" strokeWidth="19" fill="none"/>
   <g stroke="#fff" strokeWidth="4" fill="none"><path d="M-10 135L165 150L260 85L475 65L610 100"/><path d="M65 0L115 100L165 150L205 325"/><path d="M-10 270L245 230L405 245L610 190"/><path d="M510 0L475 65L440 170L405 245L435 330"/></g>
   <g stroke="#d6d6cb" strokeWidth="1" fill="none"><path d="M0 100L600 250M0 185L600 30M60 0L570 320M250 0L90 320"/></g>
   {observations.map((point,index)=><circle key={`${point.year}-${index}`} cx={point.x} cy={point.y} r="8" fill={point.color} stroke="white" strokeWidth="3"><title>{`${point.species} · ${point.year} · ${point.assessment}`}</title></circle>)}
   <text x="22" y="296" fill="#62685f" fontSize="11">Illustrative region · No real coordinates</text>
  </svg>
  <figcaption>{groups.map(g=><span key={g.year}><i style={{background:g.color}}/>{g.year}</span>)}<small>Synthetic observation years. No migration inference.</small></figcaption>
 </figure>;
}
