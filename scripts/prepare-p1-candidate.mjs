import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=process.cwd(),destination=path.resolve(root,'work/p1-candidate');
if(!destination.startsWith(path.resolve(root,'work')+path.sep))throw Error('Candidate outside work');
const manifest=JSON.parse(await fs.readFile('proposals/phase4-p1-manifest.json','utf8'));
const hash=value=>createHash('sha256').update(value.replaceAll('\r\n','\n')).digest('hex');
for(const entry of manifest.files){const source=await fs.readFile(path.join(root,'theme',entry.file),'utf8');if(hash(source)!==entry.sourceSha256)throw Error('Source changed; review proposal again: '+entry.file);}
await fs.cp(path.join(root,'theme'),path.join(destination,'theme'),{recursive:true});
const args=['apply','--directory=work/p1-candidate','proposals/phase4-p1-stock-and-spanish.patch'];
execFileSync('git',['apply','--check',...args.slice(1)],{cwd:root,stdio:'pipe'});
execFileSync('git',args,{cwd:root,stdio:'pipe'});
for(const entry of manifest.files){const candidate=await fs.readFile(path.join(destination,'theme',entry.file),'utf8');if(hash(candidate)!==entry.candidateSha256)throw Error('Candidate hash mismatch: '+entry.file);}
console.log(JSON.stringify({status:'LOCAL_CANDIDATE_PREPARED',directory:'work/p1-candidate/theme',files:manifest.files.map(x=>x.file),remoteWrites:0},null,2));
