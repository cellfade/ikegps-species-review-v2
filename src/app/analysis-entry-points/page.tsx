import { AnalysisEntryPoints } from './analysis-entry-points';
export default async function Page({searchParams}:{searchParams:Promise<{path?:string}>}) { const params=await searchParams; return <AnalysisEntryPoints initialPath={params.path}/>; }
