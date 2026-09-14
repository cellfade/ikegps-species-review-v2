"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Eye, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ExpansionMap, syntheticObservations } from '@/components/landing/expansion-map';
import styles from './page.module.css';

export default function ConservationPage(){
 const [year,setYear]=useState('All years');
 const [species,setSpecies]=useState('All species');
 const [preview,setPreview]=useState(false);
 const filtered=syntheticObservations.filter(record=>(year==='All years'||record.year===year)&&(species==='All species'||record.species===species));
 return <main className={styles.page}>
  <header className={styles.header}><Link href="/" target="_top"><ArrowLeft size={15}/>Case study</Link><span>IKE · Conservation concept</span><small>Synthetic observations</small></header>
  <section className={styles.intro}><div><p className={styles.eyebrow}><Leaf size={15}/>Audubon partner perspective</p><h1>Review observations<br/>across years.</h1><p>Explore a proposed conservation record using species and observation-year filters. All locations and records in this view are synthetic.</p></div><Button onClick={()=>setPreview(true)}><Eye size={15}/>Preview sharing package</Button></section>
  <div className={styles.filters}><label>Species<select aria-label="Species filter" value={species} onChange={e=>setSpecies(e.target.value)}>{['All species','IKEstrel','Osprey','American crow'].map(value=><option key={value}>{value}</option>)}</select></label><p role="status"><strong>{filtered.length}</strong> observations · {year}</p><button onClick={()=>{setSpecies('All species');setYear('All years');}}>Reset filters</button></div>
  <section className={styles.content} aria-label="Conservation observations"><ExpansionMap year={year} onYearChange={setYear} species={species}/><aside className={styles.context}><p className={styles.eyebrow}>Read this view</p><h2>Observation year,<br/>with uncertainty intact.</h2><p>Colors show when an observation was recorded. These examples support filter exploration; they do not establish migration, abundance, or population change.</p><p>“Reviewed” identifies a sample assessment state. IKEstrel is the fictional species from the exercise.</p><small>Region A and Region B are placeholders. No real nest coordinates are included.</small></aside></section>
  <section className={styles.records}><div><h2>Observation records</h2><span>{species} · {year}</span></div><div className={styles.tableScroll}><table><thead><tr><th>Species</th><th>Observation year</th><th>General region</th><th>Assessment</th></tr></thead><tbody>{filtered.map((record,index)=><tr key={`${record.year}-${index}`}><td>{record.species}</td><td>{record.year}</td><td>{record.region}</td><td><span className={record.assessment==='Identity uncertain'?styles.uncertain:styles.reviewed}>{record.assessment}</span></td></tr>)}</tbody></table></div></section>
  <footer className={styles.footer}>Future sharing workflow · Utility approval and partner access remain to be designed. This prototype has no publication service.</footer>
  <Dialog open={preview} onOpenChange={setPreview}><DialogContent className={styles.preview}><DialogHeader><DialogTitle>Conservation-sharing preview</DialogTitle><DialogDescription>{filtered.length} synthetic observations match {species.toLowerCase()} and {year.toLowerCase()}. This preview does not publish or transmit a package.</DialogDescription></DialogHeader><div className={styles.previewColumns}><section><h3>Included in this preview</h3><ul><li>Species suggestion and assessment</li><li>Observation year</li><li>General region placeholder</li><li>Uncertainty retained with the record</li></ul></section><section><h3>Excluded from the proposed package</h3><ul><li>Pole, work-order and customer identifiers</li><li>Crew identity and internal notes</li><li>Precise nest coordinates</li><li>Original photos, EXIF and visual identifiers</li></ul></section></div><div className={styles.sample}><h3>Sample record</h3><p>{filtered[0]?.species} · {filtered[0]?.year} · {filtered[0]?.region}</p><span>{filtered[0]?.assessment}</span></div><p className={styles.future}>A future utility owner would review redaction and approve the package before granting partner access. Revoking a future access link would not recall downloaded copies.</p><Button variant="outline" onClick={()=>setPreview(false)}>Return to observations</Button></DialogContent></Dialog>
 </main>;
}
