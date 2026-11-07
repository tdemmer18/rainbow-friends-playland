/* Coloring book drawing kit.
   Every shape is line art: a white region with a dark outline that a child taps to fill.
   Subjects are drawn in a 100x100 box (ground at y=95). Pages are 144x162. */
const K="#1d1a24",RA=` fill="#fff" stroke="${K}" data-r=""`;
const n2=v=>Math.round(v*100)/100;
/* regions */
const c=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}"${RA}/>`;
const o=(x,y,rx,ry,a)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"${a?` transform="rotate(${a} ${x} ${y})"`:""}${RA}/>`;
const p=d=>`<path d="${d}"${RA}/>`;
const rc=(x,y,w,h,r=0,a)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"${a?` transform="rotate(${a} ${x+w/2} ${y+h/2})"`:""}${RA}/>`;
const pg=pts=>`<polygon points="${pts}"${RA}/>`;
/* lines and ink */
const l=d=>`<path d="${d}" fill="none" stroke="${K}"/>`;
const d=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${K}" stroke="none"/>`;
const dk=s=>`<path d="${s}" fill="${K}" stroke="none"/>`;
const eye=(x,y,r=2.6)=>d(x,y,r)+`<circle cx="${n2(x+r*.35)}" cy="${n2(y-r*.38)}" r="${n2(r*.36)}" fill="#fff" stroke="none"/>`;
const smile=(x,y,w=4)=>l(`M${x-w} ${y}Q${x} ${y+w*.9} ${x+w} ${y}`);
const wsmile=(x,y,w=4)=>l(`M${x-w} ${y}Q${x-w/2} ${y+w*.7} ${x} ${y}Q${x+w/2} ${y+w*.7} ${x+w} ${y}`);
const closed=(x,y,w=3)=>l(`M${x-w} ${y}Q${x} ${y+w*.9} ${x+w} ${y}`);
/* a cute face: eyes, smile, rosy cheeks */
function face(x,y,s=1,o2={}){
  const g=o2.gap??7,r=(o2.eye??2.7)*s;
  let h=o2.sleepy?closed(x-g*s,y,2.6*s)+closed(x+g*s,y,2.6*s):eye(x-g*s,y,r)+eye(x+g*s,y,r);
  if(o2.cheeks!==false)h+=o(n2(x-(g+5)*s),n2(y+5*s),n2(2.8*s),n2(1.9*s))+o(n2(x+(g+5)*s),n2(y+5*s),n2(2.8*s),n2(1.9*s));
  if(o2.nose)h+=dk(`M${x-2.2*s} ${y+3.6*s}h${4.4*s}l${-2.2*s} ${2.4*s}Z`);
  if(o2.mouth!==false)h+=(o2.nose?wsmile(x,y+6.2*s,3.2*s):smile(x,y+5.5*s,3.4*s));
  return h;
}
/* place a drawing: translate, scale, optional mirror (about the 100 box) */
const T=(inner,tx=0,ty=0,s=1,flip=false)=>`<g transform="translate(${n2(tx+(flip?100*s:0))} ${n2(ty)}) scale(${flip?-s:s} ${s})">${inner}</g>`;
const R=(inner,a,x=50,y=50)=>`<g transform="rotate(${a} ${x} ${y})">${inner}</g>`;
/* small reusable bits */
const star=(x,y,r,a=0)=>{let s="";for(let i=0;i<10;i++){const q=(i*36-90+a)*Math.PI/180,rr=i%2?r*.45:r;s+=`${n2(x+rr*Math.cos(q))},${n2(y+rr*Math.sin(q))} `}return pg(s.trim())};
const heart=(x,y,s)=>p(`M${x} ${y+s*.85}C${x-s*1.1} ${y+s*.1} ${x-s*.95} ${y-s*.75} ${x} ${y-s*.25}C${x+s*.95} ${y-s*.75} ${x+s*1.1} ${y+s*.1} ${x} ${y+s*.85}Z`);
const cloud=(x,y,s=1)=>p(`M${x-14*s} ${y+6*s}a${6*s} ${6*s} 0 0 1 ${2*s} ${-11*s}a${8*s} ${8*s} 0 0 1 ${14*s} ${-4*s}a${7*s} ${7*s} 0 0 1 ${12*s} ${5*s}a${5*s} ${5*s} 0 0 1 ${0} ${10*s}Z`);
const sun=(x,y,r)=>{let s="";for(let i=0;i<8;i++){const a=i*Math.PI/4;s+=l(`M${n2(x+Math.cos(a)*(r+3))} ${n2(y+Math.sin(a)*(r+3))}L${n2(x+Math.cos(a)*(r+8))} ${n2(y+Math.sin(a)*(r+8))}`)}return s+c(x,y,r)+face(x,y,r/13,{cheeks:false})};
const flower=(x,y,s=1)=>{let h="";for(let i=0;i<5;i++){const a=i*72*Math.PI/180;h+=c(n2(x+Math.cos(a)*5*s),n2(y+Math.sin(a)*5*s),n2(4*s))}return h+c(x,y,n2(3.4*s))};
const tulip=(x,y,s=1)=>l(`M${x} ${y}V${y-14*s}`)+p(`M${x-6*s} ${y-26*s}L${x-6*s} ${y-18*s}Q${x} ${y-10*s} ${x+6*s} ${y-18*s}L${x+6*s} ${y-26*s}L${x+3*s} ${y-22*s}L${x} ${y-27*s}L${x-3*s} ${y-22*s}Z`)+p(`M${x} ${y-4*s}Q${x+8*s} ${y-12*s} ${x+9*s} ${y-6*s}Q${x+5*s} ${y-2*s} ${x} ${y-4*s}Z`);
const grassTuft=(x,y,s=1)=>l(`M${x-4*s} ${y}L${x-6*s} ${y-6*s}M${x} ${y}L${x} ${y-8*s}M${x+4*s} ${y}L${x+6*s} ${y-6*s}`);
const bubble=(x,y,r)=>c(x,y,r)+l(`M${n2(x-r*.5)} ${n2(y-r*.15)}A${n2(r*.55)} ${n2(r*.55)} 0 0 1 ${n2(x-r*.1)} ${n2(y-r*.55)}`);
const leaf=(x,y,s=1,a=0)=>R(p(`M${x} ${y}Q${x+6*s} ${y-10*s} ${x} ${y-20*s}Q${x-6*s} ${y-10*s} ${x} ${y}Z`)+l(`M${x} ${y}L${x} ${y-16*s}`),a,x,y);
const sparkle=(x,y,s=1)=>p(`M${x} ${y-6*s}Q${x+1*s} ${y-1*s} ${x+6*s} ${y}Q${x+1*s} ${y+1*s} ${x} ${y+6*s}Q${x-1*s} ${y+1*s} ${x-6*s} ${y}Q${x-1*s} ${y-1*s} ${x} ${y-6*s}Z`);
const wheel=(x,y,r)=>c(x,y,r)+c(x,y,n2(r*.45))+d(x,y,n2(r*.12));
const stripes=(arr)=>arr.map(l).join("");

/* page composition */
const W=144,H=162;
function sheet(body){return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">${body}<rect x="1" y="1" width="${W-2}" height="${H-2}" rx="4" fill="none" stroke="${K}" stroke-width="2"/></svg>`}
/* subject placed with constant outline width at any scale */
const put=(art,tx,ty,s,flip)=>`<g stroke-width="${n2(1.4/s)}">${T(art,tx,ty,s,flip)}</g>`;

const CATS=[];
/* cat: {id,name,color,bg:[(variant)=>svg,...],float:bool, items:[[id,name,fn,{float,flip}]]} */
function category(cat){
  const items=cat.items.map(([id,name,fn,opt={}])=>({id,name,fn,float:opt.float??(cat.ground?.includes(id)?false:cat.float??false),big:opt.big??1,bg:opt.bg??cat.bgOf?.(id),duoScale:cat.duoScale}));
  const pages=[];
  const bgs=cat.bg;
  items.forEach((it,i)=>pages.push({id:`${cat.id}:${it.id}`,name:it.name,make:()=>sheet(bgs[it.bg??i%bgs.length](i)+solo(it))}));
  const n=items.length,want=cat.count||50,seen=new Set();
  outer:for(let k=1;k<n;k++)for(let i=0;i<n;i++){
    if(pages.length>=want)break outer;
    const a=i,b=(i+k*3+1)%n;if(a===b)continue;const key=[a,b].sort((x,y)=>x-y).join("-");if(seen.has(key))continue;seen.add(key);
    const A=items[a],B=items[b],j=pages.length;
    pages.push({id:`${cat.id}:${A.id}+${B.id}`,name:`${A.name} & ${B.name}`,make:()=>sheet(afterSky(bgs[A.bg!=null&&A.bg===B.bg?A.bg:A.bg!=null||B.bg!=null?0:j%bgs.length](j),!A.float&&!B.float?rainbowArc(72,150,62):"")+duo(A,B,j))});
  }
  CATS.push({id:cat.id,name:cat.name,color:cat.color,cover:cat.cover||items[0].id,pages});
}
function solo(it){const s=1.12*it.big,tx=(W-100*s)/2;
  if(it.float)return put(it.fn(),tx,(H-100*s)/2+4,s);
  return put(it.fn(),tx,150-95*s,s);}
function duo(A,B,j){
  if(!A.float&&!B.float){const s=A.duoScale||.72;return put(A.fn(),2,152-95*s*A.big,s*A.big)+put(B.fn(),W-2-100*s*B.big,152-95*s*B.big,s*B.big)}
  if(A.float&&B.float){const s=.8;return put(A.fn(),2,14,s*A.big)+put(B.fn(),W-2-100*s*B.big,72,s*B.big,j%2===1)}
  const [F,G]=A.float?[A,B]:[B,A],s=.8;return put(F.fn(),2,12,.74*F.big)+put(G.fn(),W-2-100*s*G.big,152-95*s*G.big,s*G.big);}
/* rainbow arch of colorable bands */
function rainbowArc(cx,cy,r,bands=5,w=5){let h="";for(let i=0;i<bands;i++){const a=r-i*w,b=a-w;
  h+=p(`M${cx-a} ${cy}A${a} ${a} 0 0 1 ${cx+a} ${cy}L${cx+b} ${cy}A${b} ${b} 0 0 0 ${cx-b} ${cy}Z`)}return h}
const afterSky=(bg,extra)=>bg.replace(/^(<rect[^>]*\/>)/,"$1"+extra);
/* shared backgrounds */
const BG={
  sky:()=>rc(1,1,W-2,H-2,4),
  hills:(y=128)=>p(`M1 ${y}Q36 ${y-14} 72 ${y-2}T143 ${y-6}V161H1Z`),
  ground:(y=136)=>p(`M1 ${y}Q72 ${y-6} 143 ${y}V161H1Z`),
};
/* scalloped circle: manes, wool, bushes, clouds */
function bumpy(x,y,r,n=12,b=.16,rot=0){let s="";const pt=(a,rr)=>`${n2(x+Math.cos(a)*rr)} ${n2(y+Math.sin(a)*rr)}`;
  for(let i=0;i<n;i++){const a0=(i/n)*2*Math.PI+rot,a1=((i+1)/n)*2*Math.PI+rot,am=(a0+a1)/2;if(!i)s+=`M${pt(a0,r)}`;s+=`Q${pt(am,r*(1+b*2))} ${pt(a1,r)}`}
  return p(s+"Z")}
/* rounded leg standing on the ground */
const leg=(x,y1,y2=95,w=7)=>rc(n2(x-w/2),y1,w,n2(y2-y1),n2(w*.45));
/* front-facing sitting animal body: tail, body, belly, feet, arms; returns string */
function sitBody({x=50,y=74,rx=24,ry=21,belly=true,feet=true,arms=true,tail=""}={}){
  return tail+o(x,y,rx,ry)+(belly?o(x,y+4,n2(rx*.56),n2(ry*.66)):"")+
    (feet?o(x-12,90,8.5,5)+o(x+12,90,8.5,5):"")+(arms?o(x-rx+7,y-1,5.5,9.5,18)+o(x+rx-7,y-1,5.5,9.5,-18):"");
}
/* elliptical scallops (wool, fluffy clouds, bushes) */
function bumpyE(x,y,rx,ry,n=14,b=.12){let s="";const pt=(a,k)=>`${n2(x+Math.cos(a)*rx*k)} ${n2(y+Math.sin(a)*ry*k)}`;
  for(let i=0;i<n;i++){const a0=(i/n)*2*Math.PI,a1=((i+1)/n)*2*Math.PI,am=(a0+a1)/2;if(!i)s+=`M${pt(a0,1)}`;s+=`Q${pt(am,1+b*2)} ${pt(a1,1)}`}
  return p(s+"Z")}
/* a side-view horse-like animal facing right; opt: mane, ears, tail, extra */
function horse({mane=true,ears="pony",tail=true,stripes:st=[],spots="",x=0}={}){
  return leg(28,60)+leg(56,60)+(tail?p("M18 50Q6 56 8 76Q14 70 16 62Q18 58 22 56Z"):"")+p("M54 48L64 24L78 32L72 62Z")+o(42,58,26,15)+leg(36,62)+leg(64,62)+
   (ears==="long"?o(66,10,3.5,11,-15)+o(72,12,3.5,11,10):p("M66 22L66 10L73 19Z"))+
   p("M68 22Q76 14 82 20L93 38Q96 49 86 50Q79 50 77 44L68 33Z")+o(87,44,6,5)+d(88,44,1)+eye(77,27,2.2)+
   (mane?p("M66 20Q70 30 62 30Q66 36 58 38Q62 44 54 46L54 40L60 24Z"):"")+stripes(st)+spots+
   l("M24 92H32M52 92H60M32 94H40M60 94H68");
}
const pine=(x,y,s=1)=>rc(n2(x-3*s),n2(y-10*s),n2(6*s),n2(10*s))+pg(`${x-16*s},${y-8*s} ${x},${y-30*s} ${x+16*s},${y-8*s}`)+pg(`${x-13*s},${y-22*s} ${x},${y-42*s} ${x+13*s},${y-22*s}`)+pg(`${x-10*s},${y-34*s} ${x},${y-52*s} ${x+10*s},${y-34*s}`);
const shroom=(x,y,s=1)=>rc(n2(x-3*s),n2(y-8*s),n2(6*s),n2(8*s),2)+p(`M${x-9*s} ${y-7*s}Q${x-9*s} ${y-18*s} ${x} ${y-18*s}Q${x+9*s} ${y-18*s} ${x+9*s} ${y-7*s}Z`)+c(n2(x-3*s),n2(y-12*s),n2(1.8*s))+c(n2(x+4*s),n2(y-13*s),n2(1.5*s));
const acorn=(x,y,s=1)=>o(x,n2(y+3*s),n2(5*s),n2(6*s))+p(`M${x-6*s} ${y+1*s}Q${x-6*s} ${y-5*s} ${x} ${y-5*s}Q${x+6*s} ${y-5*s} ${x+6*s} ${y+1*s}Z`)+l(`M${x} ${y-5*s}l${1*s} ${-3*s}`);
/* chibi person: hair style fn draws behind/front; outfit fn draws body */
function kid({hairBack="",hairFront="",body,hat="",extra=""}){
  return hairBack+(body||p("M36 56L26 90H74L64 56Z"))+o(40,93,6,3.5)+o(60,93,6,3.5)+o(28,66,4.5,9,25)+o(72,66,4.5,9,-25)+c(50,34,18)+hairFront+face(50,36,.95,{gap:7})+hat+extra;
}
const moon=(x,y,r)=>p(`M${x} ${y-r}A${r} ${r} 0 1 0 ${x+r*.9} ${y+r*.45}A${r*.75} ${r*.75} 0 1 1 ${x} ${y-r}Z`);
/* outlined text (colorable look, not a region) */
const tx=(x,y,size,str,sw=1)=>`<text x="${x}" y="${y}" font-family="Arial Rounded MT Bold,Arial Black,Arial,sans-serif" font-weight="900" font-size="${size}" text-anchor="middle" fill="none" stroke="${K}" stroke-width="${sw}" stroke-linejoin="round">${str}</text>`;
/* team mascot heads, centered on (50,40), about 46 wide; brave brows for team crests */
const brows=(y=31)=>l(`M37 ${y}L46 ${y+3}M63 ${y}L54 ${y+3}`);
const HEADS={
  bear:()=>c(33,25,7)+c(67,25,7)+c(33,25,3.5)+c(67,25,3.5)+c(50,40,20)+o(50,49,9,6.5)+face(50,39,1,{nose:true,gap:8})+brows(),
  polar:()=>c(33,26,6)+c(67,26,6)+c(50,40,20)+o(50,49,9,6.5)+face(50,39,1,{nose:true,gap:8})+brows(),
  fox:()=>p("M28 32L26 14L42 22Z")+p("M72 32L74 14L58 22Z")+p("M26 30Q30 58 50 60Q70 58 74 30Q62 24 50 26Q38 24 26 30Z")+p("M30 38Q36 56 50 58Q42 48 44 40Q38 42 30 38Z")+p("M70 38Q64 56 50 58Q58 48 56 40Q62 42 70 38Z")+eye(42,38,2.4)+eye(58,38,2.4)+dk("M47.6 51h4.8l-2.4 2.6Z")+brows(32),
  pup:()=>c(50,38,20)+o(50,48,9,6.5)+face(50,38,1,{nose:true,gap:8})+o(30,38,7,13,18)+o(70,38,7,13,-18)+brows(29),
  lion:()=>bumpy(50,40,28,14,.14)+c(34,25,6)+c(66,25,6)+c(50,41,20)+o(50,50,9,6.5)+face(50,40,1,{nose:true,gap:8})+brows(31),
  owl:()=>p("M30 32L26 12L44 24Z")+p("M70 32L74 12L56 24Z")+o(50,42,24,22)+c(40,40,9)+c(60,40,9)+eye(40,40,3.6)+eye(60,40,3.6)+pg("46,48 54,48 50,55")+l("M32 28L46 34M68 28L54 34"),
  dragon:()=>p("M36 24L30 6L44 20Z")+p("M64 24L70 6L56 20Z")+c(50,38,20)+o(50,50,12,8)+d(46,49,1.3)+d(54,49,1.3)+eye(42,35,2.6)+eye(58,35,2.6)+smile(50,53,3)+brows(28),
  shark:()=>p("M42 22L52 2L60 22Z")+o(50,40,24,20)+p("M30 44Q50 66 70 44Q50 52 30 44Z")+l("M34 46l3 4l3-4l3 4l3-4l3 4l3-4l3 4l3-4l3 4l2-3")+eye(40,34,2.6)+eye(60,34,2.6)+brows(27),
  bunny:()=>o(42,14,6.5,16,-8)+o(58,14,6.5,16,8)+o(42,16,3,10,-8)+o(58,16,3,10,8)+c(50,42,18)+face(50,41,1,{nose:true,gap:7})+brows(33),
  wolf:()=>p("M28 32L26 12L42 22Z")+p("M72 32L74 12L58 22Z")+c(50,40,19)+p("M44 44Q40 56 50 60Q60 56 56 44Z")+p("M31 40Q40 46 44 54Q34 50 31 40Z")+p("M69 40Q60 46 56 54Q66 50 69 40Z")+eye(42,36,2.2)+eye(58,36,2.2)+dk("M47.6 52h4.8l-2.4 2.6Z")+brows(28),
  penguin:()=>o(50,40,22,21)+p("M34 44Q32 26 50 26Q68 26 66 44Q60 58 50 58Q40 58 34 44Z")+face(50,40,1,{mouth:false,gap:7})+pg("45,45 55,45 50,51")+brows(31),
  moose:()=>p("M34 30Q16 34 8 20L12 18L14 24L16 14L20 16L20 24L24 12L28 14L28 26Q32 26 38 26Z")+p("M66 30Q84 34 92 20L88 18L86 24L84 14L80 16L80 24L76 12L72 14L72 26Q68 26 62 26Z")+o(50,38,15,16)+o(50,52,13,9)+d(45,52,1.6)+d(55,52,1.6)+eye(43,35,2.2)+eye(57,35,2.2)+smile(50,57,3)+brows(28),
  yeti:()=>bumpy(50,40,22,14,.12)+o(50,44,14,12)+eye(45,41,2.2)+eye(55,41,2.2)+smile(50,48,4)+pg("47,49 49,53 51,49")+brows(36),
  beaver:()=>c(33,24,5)+c(67,24,5)+c(50,40,20)+o(50,49,10,7)+dk("M47 45h6l-3 3Z")+rc(46,53,8,7,1.5)+l("M50 53V60")+eye(42,37,2.4)+eye(58,37,2.4)+brows(29),
};
/* team crest: shape 0 shield, 1 circle badge, 2 pennant-banner; mascot head + ribbon with the team name */
function crest(name,head,shape=0,extra=""){
  const body=shape===0?p("M12 6H88V46Q88 80 50 96Q12 80 12 46Z")+p("M18 12H82V46Q82 74 50 89Q18 74 18 46Z")
    :shape===1?c(50,48,46)+c(50,48,38)+star(18,74,5)+star(82,74,5)
    :p("M10 10L50 2L90 10L86 78L50 96L14 78Z")+p("M16 15L50 8L84 15L81 74L50 89L19 74Z");
  const words=name.split(" "),fs=Math.min(9.5,88/(Math.max(...words.map(w=>w.length))*.72+.01));
  return body+T(HEADS[head](),8,-3,.84)+p("M0 62H100L94 71L100 80H0L6 71Z")+(words.length>1?tx(50,69.5,fs*.82,words[0],.8)+tx(50,78.5,fs*.82,words.slice(1).join(" "),.8):tx(50,74.5,fs,name,.9))+extra;
}
/* "#1" foam finger: pointer finger on the left, thumb across the front, so it reads clearly as pointing */
const foamFinger=()=>rc(26,6,18,46,9)+rc(24,40,54,44,12)+c(52,42,7)+c(64,42,7)+c(74,46,6)+o(50,58,18,6,-8)+rc(28,82,46,12,3)+tx(51,74,13,"#1",1);
