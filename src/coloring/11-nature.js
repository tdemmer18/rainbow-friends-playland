/* ---------- Nature ---------- */
{
const bg=[
  ()=>BG.sky()+cloud(26,24,.9)+cloud(116,30,.8)+BG.hills(130)+grassTuft(14,152)+grassTuft(130,150),
  ()=>BG.sky()+l("M20 30q4-4 8 0q4-4 8 0")+l("M104 22q4-4 8 0q4-4 8 0")+BG.ground(136)+grassTuft(24,154)+grassTuft(118,152)+flower(132,146,.6),
];
const petals=(x,y,n,r,pr,pw)=>{let s="";for(let i=0;i<n;i++){const a=i/n*360;s+=o(n2(x+Math.cos(a*Math.PI/180)*r),n2(y+Math.sin(a*Math.PI/180)*r),pr,pw,n2(a))}return s};
const stem=(x,y1,y2)=>l(`M${x} ${y1}Q${x-4} ${(y1+y2)/2} ${x} ${y2}`)+leaf(x,y1+(y2-y1)*.65,1,-55)+leaf(x,y1+(y2-y1)*.45,.9,55);
const tree=(x=50)=>p(`M${x-7} 95Q${x-5} 76 ${x-6} 60H${x+6}Q${x+5} 76 ${x+7} 95Z`)+l(`M${x-2} 70l-6-6M${x+2} 76l6-5`)+bumpy(x,38,30,13,.1);
const items=[
 ["daisy","Daisy",()=>stem(50,52,95)+petals(50,36,12,17,10,5)+c(50,36,11)+face(50,35,.7,{cheeks:false})],
 ["sunflower","Sunflower",()=>stem(50,60,95)+petals(50,36,16,24,11,5.5)+c(50,36,17)+face(50,34,1)+[[42,46],[58,46],[50,50]].map(([x,y])=>c(x,y,1.2)).join("")],
 ["tulips","Tulips",()=>tulip(30,95,1.6)+tulip(50,95,2.1)+tulip(72,95,1.5)],
 ["rose","Rose",()=>l("M50 50V95")+leaf(50,80,1.1,-60)+leaf(50,68,1,60)+p("M30 34Q30 60 50 62Q70 60 70 34Q60 44 50 40Q40 44 30 34Z")+p("M34 30Q36 14 50 14Q64 14 66 30Q60 40 50 38Q40 40 34 30Z")+l("M42 28Q46 20 52 22Q58 26 54 32Q48 34 46 28")],
 ["oak","Oak Tree",()=>tree()+face(50,38,1.1)],
 ["pine","Pine Tree",()=>pine(50,95,1.75)+star(50,2,6)],
 ["palm","Palm Tree",()=>p("M44 95Q50 60 56 30H62Q58 60 56 95Z")+l("M48 80h6M50 66h7M53 52h7M56 40h6")+p("M60 30Q40 14 16 26Q36 22 58 34Z")+p("M60 30Q80 12 96 26Q78 22 62 34Z")+p("M60 30Q50 40 42 58Q48 40 58 32Z")+p("M60 30Q72 40 82 56Q70 40 62 32Z")+p("M60 30Q58 10 70 2Q62 14 62 30Z")+c(56,34,4)+c(64,36,4)+p("M20 95Q50 86 80 95Z")],
 ["appletree","Apple Tree",()=>tree()+c(32,30,4.5)+c(64,24,4.5)+c(48,46,4.5)+c(70,46,4.5)+c(36,52,4.5)+c(52,22,4.5)+c(80,90,4.5)],
 ["rainbowsky","Rainbow Sky",()=>rainbowArc(50,78,46,6,6)+bumpyE(10,78,14,10,10,.12)+bumpyE(90,78,14,10,10,.12)+sun(84,16,8)],
 ["sun","Sunshine",()=>sun(50,46,26)+cloud(22,86,.9)+cloud(80,90,.7),{float:true}],
 ["rain","Rain Cloud",()=>bumpyE(50,34,36,20,12,.1)+face(50,34,1.1)+[[26,64],[40,72],[56,66],[70,76],[34,86],[62,90],[48,92]].map(([x,y])=>p(`M${x} ${y-6}Q${x+4} ${y} ${x} ${y+3}Q${x-4} ${y} ${x} ${y-6}Z`)).join(""),{float:true}],
 ["snowflake","Snowflake",()=>{let s="";for(let i=0;i<6;i++){s+=R(rc(46,10,8,40,4)+p("M50 22L40 14L42 10L50 16L58 10L60 14Z")+p("M50 34L38 26L40 22L50 28L60 22L62 26Z"),i*60,50,50)}return s+c(50,50,10)+face(50,49,.55,{cheeks:false})},{float:true}],
 ["snowman","Snowman",()=>c(50,76,22)+c(50,44,16)+rc(32,56,36,6,3)+rc(58,58,8,14,3,-10)+p("M36 26H64V22H58V6H42V22H36Z")+face(50,44,.9,{mouth:false})+pg("50,47 62,50 50,51")+smile(50,53,3)+
   c(50,70,2.4)+c(50,80,2.4)+l("M30 66L12 54M70 66L88 54M16 56l-4-6M84 56l4-6")+o(50,96,30,2.5)],
 ["leaves","Autumn Leaves",()=>R(p("M50 92Q14 64 26 34Q30 46 38 42Q36 24 50 8Q64 24 62 42Q70 46 74 34Q86 64 50 92Z")+l("M50 92V24M50 58L36 46M50 70L64 56"),0)+leaf(18,96,1.1,-40)+leaf(86,96,1,40)],
 ["mushrooms","Mushrooms",()=>shroom(36,95,3.4)+shroom(76,95,2)+face(36,74,.9,{cheeks:false})+grassTuft(10,95)+grassTuft(92,95)],
 ["cactus","Cactus",()=>p("M28 82H72L68 96H32Z")+rc(24,76,52,8,3)+rc(40,18,20,58,10)+rc(18,36,12,24,6)+rc(70,28,12,22,6)+rc(22,54,22,8,4)+rc(56,46,22,8,4)+face(50,40,.9)+flower(50,16,.7)],
 ["mountains","Mountains",()=>p("M2 95L34 30L66 95Z")+p("M34 95L68 18L98 95Z")+p("M58 40L68 18L78 40L72 36L68 42L64 36Z")+p("M26 46L34 30L42 46L38 44L34 48L30 44Z")+sun(16,14,6)],
 ["flowerpot","Flower Pot",()=>stem(50,40,70)+petals(50,26,6,10,8,5)+c(50,26,7)+p("M26 70H74L68 96H32Z")+rc(22,66,56,10,3)+heart(50,84,5)],
 ["bouquet","Bouquet",()=>l("M50 92L36 46M50 92L50 40M50 92L64 46")+petals(34,36,6,7,6,4)+c(34,36,5)+petals(66,36,6,7,6,4)+c(66,36,5)+petals(50,24,6,7,6,4)+c(50,24,5)+p("M30 54L50 96L70 54Q50 64 30 54Z")+p("M44 70Q50 62 56 70L50 76Z")],
 ["lily","Water Lily",()=>l("M2 82Q14 76 26 82T50 82T74 82T98 82")+p("M10 76Q4 58 30 56Q60 54 90 60Q98 72 80 80Q50 86 10 76Z")+l("M50 70L60 58")+petals(50,46,8,14,12,5)+c(50,46,6)],
 ["pumpkin","Pumpkin",()=>rc(46,10,8,14,2,10)+leaf(56,20,.8,70)+o(30,58,18,30)+o(70,58,18,30)+o(50,58,18,32)+face(50,54,1.2)],
 ["moonstars","Moon & Stars",()=>moon(46,50,32)+face(30,48,.9,{sleepy:true,gap:5})+star(78,22,8)+star(84,62,6)+star(66,86,5)+sparkle(16,16,.9),{float:true}],
 ["beach","Beach Day",()=>p("M2 95Q50 80 98 95Z")+l("M2 78Q14 72 26 78T50 78T74 78T98 78")+l("M70 92L60 30")+p("M30 34Q60 8 92 26Q76 26 74 32Q66 24 58 32Q50 26 44 34Q38 30 30 34Z")+sun(18,18,7)+p("M14 92L20 82L26 92Z")+rc(12,92,16,3,1)],
 ["garden","Garden",()=>rc(2,66,96,5,1)+rc(2,80,96,5,1)+[8,24,40,56,72,88].map(x=>p(`M${x-3} 95V62L${x} 58L${x+3} 62V95Z`)).join("")+tulip(16,95,1.2)+flower(32,52,1)+l("M32 56V95")+tulip(48,95,1.4)+flower(64,48,1.1)+l("M64 52V95")+tulip(82,95,1.2)],
];
category({id:"nature",name:"Nature",color:"#13bfd3",bg,items,cover:"sunflower"});
}
