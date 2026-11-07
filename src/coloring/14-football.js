/* ---------- Football (made-up teams) ---------- */
{
const field=y=>rc(1,y,142,161-y)+[24,48,72,96,120].map(x=>l(`M${x} ${y}V161`)).join("")+l(`M1 ${y+12}H143`);
const stands=()=>rc(1,58,142,36)+l("M1 70H143M1 82H143")+[12,30,48,66,84,102,120,136].map((x,i)=>c(x,58-(i%2)*2,5)).join("");
const flags=()=>l("M1 10Q72 26 143 10")+[14,34,54,74,94,114,132].map((x,i)=>{const y=n2(12+16*(1-((x-72)/71)**2)*.7);return pg(`${x-7},${y-1} ${x+7},${y+1} ${x},${y+13}`)}).join("");
const bg=[
  ()=>BG.sky()+sun(22,20,7)+cloud(116,22,.9)+stands()+field(124),
  ()=>BG.sky()+flags()+cloud(30,44,.7)+cloud(112,50,.6)+field(130),
];
const ball=(x=50,y=50,s=1,a=-25)=>R(p(`M${x-42*s} ${y}Q${x} ${y-36*s} ${x+42*s} ${y}Q${x} ${y+36*s} ${x-42*s} ${y}Z`)+l(`M${x-30*s} ${y-12*s}Q${x-26*s} ${y} ${x-30*s} ${y+12*s}M${x+30*s} ${y-12*s}Q${x+26*s} ${y} ${x+30*s} ${y+12*s}`)+
  l(`M${x-12*s} ${y}H${x+12*s}`)+[-8,-4,0,4,8].map(k=>l(`M${x+k*s} ${y-3*s}V${y+3*s}`)).join(""),a,x,y);
const helmet=(num="")=>p("M14 60Q10 18 50 14Q86 14 88 48L88 62Q74 74 56 70L46 76H24Q14 74 14 60Z")+p("M48 22Q76 22 84 44")+c(44,50,6)+l("M70 54H96M74 54V72M84 54V70M96 54Q98 66 88 72H70")+(num?tx(28,44,12,num):"");
const jersey=(num,name)=>p("M30 10Q50 18 70 10L92 22L84 42L74 38V94H26V38L16 42L8 22Z")+p("M40 12Q50 22 60 12Q56 18 50 18Q44 18 40 12Z")+l("M16 42L22 30M84 42L78 30")+tx(50,72,34,num,1.3)+(name?tx(50,36,9,name,.8):"");
const items=[
 ["football","Football",()=>ball(50,52,1.05)+face(50,50,.9,{cheeks:false}),{float:true}],
 ["helmet","Football Helmet",()=>helmet("7"),{float:false}],
 ["jersey","Jersey",()=>jersey("12","STAR")],
 ["goalpost","Goal Post",()=>rc(46,64,8,31,2)+rc(18,58,64,8,3)+rc(14,8,8,56,3)+rc(78,8,8,56,3)+c(18,6,4)+c(82,6,4)+o(50,94,22,3)],
 ["trophy","Trophy",()=>rc(26,84,48,10,3)+rc(34,76,32,10,2)+rc(44,58,12,18)+p("M24 22H76Q76 60 50 62Q24 60 24 22Z")+p("M24 28Q8 28 10 40Q12 52 28 50")+p("M76 28Q92 28 90 40Q88 52 72 50")+star(50,40,9)+T(ball(50,50,1,-20),31,-2,.38)],
 ["whistle","Whistle",()=>l("M34 30Q10 8 30 4Q60 0 70 30")+p("M26 46Q26 30 44 30H86V50H62Q64 74 44 74Q26 74 26 56Z")+c(44,56,8)+rc(72,34,10,12,2)+l("M90 30l6-4M92 40h6M90 50l6 4")],
 ["foamfinger","Foam Finger",()=>foamFinger()],
 ["cleat","Cleat",()=>p("M20 30H46L50 52Q76 54 88 64Q94 72 86 78H12Q8 74 10 64L16 40Z")+l("M24 40H40M24 48H42M22 56H44")+p("M8 78H90V84H8Z")+[16,30,48,64,80].map(x=>rc(x-3,84,6,6,1)).join("")+star(68,68,5)],
 ["tee","Kicking Tee",()=>p("M30 94L36 72H64L70 94Z")+R(ball(50,40,.9,0),90,50,40).replace("rotate(90 50 40)","rotate(90 50 40)")+l("M8 20l8 4M4 40h10M8 60l8-4")],
 ["pennant","Team Pennant",()=>rc(8,10,6,86,3)+p("M14 14L94 36L14 58Z")+tx(46,41,11,"GO TEAM!",.9)],
 ["scoreboard","Scoreboard",()=>rc(46,70,8,25)+rc(4,10,92,62,5)+rc(10,16,80,12,3)+tx(50,25.5,8,"TOUCHDOWN!",.7)+rc(12,36,32,30,3)+rc(56,36,32,30,3)+tx(28,60,22,"7")+tx(72,60,22,"3")+l("M50 40V62")],
 ["megaphone","Megaphone",()=>p("M20 40L76 16V84L20 60Z")+o(76,50,8,34)+rc(8,38,14,24,4)+p("M30 60L26 80H38L40 64Z")+l("M86 30l8-6M90 50h8M86 70l8 6")+star(48,50,7)],
 ["bearqb","Bear Quarterback",()=>sitBody({})+tx(50,86,14,"1",1)+c(33,25,7)+c(67,25,7)+c(50,40,20)+p("M28 36Q28 14 50 14Q72 14 72 36Q64 30 50 30Q36 30 28 36Z")+o(50,49,9,6.5)+face(50,40,1,{nose:true,gap:8})+T(ball(50,50,1,-30),54,46,.34)],
 ["pupplayer","Puppy Running Back",()=>sitBody({tail:l("M70 86Q86 84 88 70")})+tx(50,86,14,"22",1)+HEADS.pup().replace(brows(29),"")+T(ball(50,50,1,20),8,50,.34)],
 ["cheerkitty","Cheer Kitty",()=>sitBody({arms:false})+bumpy(24,58,11,10,.2)+bumpy(76,58,11,10,.2)+p("M31 30L33 14L45 23Z")+p("M69 30L67 14L55 23Z")+c(50,40,19)+face(50,40,1,{nose:true,gap:7})+p("M50 20L38 12L38 26ZM50 20L62 12L62 26Z")+c(50,20,3)+tx(50,84,10,"GO!",.9)],
 ["touchdown","Touchdown!",()=>rc(46,64,8,31,2)+rc(18,58,64,8,3)+rc(14,22,8,40,3)+rc(78,22,8,40,3)+T(ball(50,50,1,-35),26,6,.48)+star(20,10,6)+star(84,12,5)+sparkle(10,40,.9)+sparkle(92,42,.9)],
 ["thunderbears","Thunder Bears",()=>crest("THUNDER BEARS","bear",0,p("M80 80L86 70H82L86 62L76 74H80Z")),{float:true}],
 ["rocketfoxes","Rocket Foxes",()=>crest("ROCKET FOXES","fox",1),{float:true}],
 ["lightningpups","Lightning Pups",()=>crest("LIGHTNING PUPS","pup",2),{float:true}],
 ["mightylions","Mighty Lions",()=>crest("MIGHTY LIONS","lion",0),{float:true}],
 ["wildowls","Wild Owls",()=>crest("WILD OWLS","owl",1),{float:true}],
 ["sunnydragons","Sunny Dragons",()=>crest("SUNNY DRAGONS","dragon",2),{float:true}],
 ["supersharks","Super Sharks",()=>crest("SUPER SHARKS","shark",0),{float:true}],
 ["starbunnies","Star Bunnies",()=>crest("STAR BUNNIES","bunny",1),{float:true}],
];
category({id:"football",name:"Football",color:"#a86b3c",bg,items,cover:"thunderbears"});
}
