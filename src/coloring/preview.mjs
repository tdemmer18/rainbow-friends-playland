// node preview.mjs <catId> [solo|all] -> writes PNG contact sheets into $OUT
import fs from "fs";import path from "path";import {execFileSync} from "child_process";
const dir=path.dirname(new URL(import.meta.url).pathname);
const files=["kit.js",...fs.readdirSync(dir).filter(f=>/^\d\d-.*\.js$/.test(f)).sort()];
const src=files.map(f=>fs.readFileSync(path.join(dir,f),"utf8")).join("\n")+"\nreturn CATS;";
const CATS=new Function(src)();
const [,,want="all",mode="solo"]=process.argv,out=process.env.OUT||"/tmp";
for(const cat of CATS){if(want!=="all"&&cat.id!==want)continue;
  let pages=cat.pages;const soloN=pages.findIndex(p=>p.id.includes("+"));
  pages=mode==="solo"?pages.slice(0,soloN<0?pages.length:soloN):mode==="duo"?pages.slice(soloN):pages;
  const cols=6,tw=240,th=270+22,rows=Math.ceil(pages.length/cols);
  let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${cols*tw}" height="${rows*th}"><rect width="100%" height="100%" fill="#eee"/>`;
  pages.forEach((p,i)=>{const x=(i%cols)*tw,y=Math.floor(i/cols)*th;
    s+=p.make().replace("<svg ",`<svg x="${x+6}" y="${y+4}" width="${tw-12}" height="${th-26}" `)+`<text x="${x+tw/2}" y="${y+th-6}" font-size="16" font-family="sans-serif" text-anchor="middle">${i+1}. ${p.name.replace(/&/g,"&amp;")}</text>`});
  s+="</svg>";const f=`${out}/${cat.id}-${mode}`;fs.writeFileSync(f+".svg",s);
  execFileSync("rsvg-convert",[f+".svg","-o",f+".png"]);console.log(cat.id,cat.pages.length,"pages ->",f+".png");}
