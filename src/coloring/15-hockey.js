/* ---------- Hockey (made-up teams) ---------- */
{
const ice=y=>rc(1,y,142,161-y)+l(`M72 ${y}V161`)+o(72,y+22,18,7)+c(72,y+22,2);
const boards=y=>rc(1,y,142,14)+rc(10,y+3,34,8,2)+rc(100,y+3,34,8,2);
const bg=[
  ()=>BG.sky()+[20,52,92,124].map(x=>rc(x-6,8,12,6,2)+l(`M${x-4} 14l-3 6M${x} 14v7M${x+4} 14l3 6`)).join("")+boards(112)+ice(126),
  ()=>BG.sky()+cloud(30,24,.8)+moon(118,22,8)+pine(14,124,.8)+pine(132,126,.75)+BG.hills(124)+o(72,148,64,12)+l("M30 148q6-3 12 0M96 150q6-3 12 0"),
];
const puck=(x=50,y=50,s=1)=>p(`M${x-26*s} ${y}V${y+10*s}Q${x} ${y+22*s} ${x+26*s} ${y+10*s}V${y}Z`)+o(x,y,26*s,10*s);
const stick=(a,flip)=>R(rc(46,4,8,74,3)+p(flip?"M54 74H24Q16 74 16 84Q16 90 24 90H54Z":"M46 74H76Q84 74 84 84Q84 90 76 90H46Z")+l("M46 16H54M46 22H54M46 28H54"),a,50,50);
const skate=()=>p("M22 12H50V46Q74 48 82 58Q86 68 78 70H16Q12 66 14 56L20 36Z")+l("M28 20H42M28 28H42M28 36H44")+rc(14,68,68,6,3)+l("M22 74V80M70 74V80")+p("M8 80H86Q94 80 92 86H10Q6 84 8 80Z");
const hJersey=(num,name)=>p("M30 10Q50 18 70 10L92 22L84 42L74 38V94H26V38L16 42L8 22Z")+p("M40 12Q50 22 60 12Q56 18 50 18Q44 18 40 12Z")+rc(26,80,48,6)+rc(17,30,10,5,1,-25)+rc(73,30,10,5,1,25)+tx(50,70,32,num,1.3)+(name?tx(50,34,8.5,name,.8):"");
const items=[
 ["puck","Hockey Puck",()=>puck(50,44,1.4)+face(50,62,.8,{cheeks:false})+l("M6 36h10M2 48h14M6 60h10"),{float:true}],
 ["sticks","Hockey Sticks",()=>stick(-28,false)+stick(28,true)+puck(50,84,.5),{float:true}],
 ["skate","Ice Skate",()=>skate()],
 ["helmet","Hockey Helmet",()=>p("M16 54Q14 14 50 12Q86 14 84 54Q84 62 76 62H24Q16 62 16 54Z")+l("M24 30Q50 22 76 30")+rc(22,52,56,30,8)+l("M30 52V82M40 52V82M50 52V82M60 52V82M70 52V82M22 62H78M22 72H78")+o(16,58,5,9)+o(84,58,5,9),{float:true}],
 ["net","Hockey Goal",()=>p("M10 90V24Q10 14 20 14H80Q90 14 90 24V90")+l("M10 90V24Q10 14 20 14H80Q90 14 90 24V90")+l("M22 22V88M34 18V88M46 16V88M58 16V88M70 18V88M80 22V88M14 34H86M12 48H88M12 62H88M12 76H88")+l("M4 92H96")+puck(66,80,.3)],
 ["jersey","Hockey Jersey",()=>hJersey("9","ICE STAR")],
 ["mask","Goalie Mask",()=>p("M50 6Q16 6 16 44Q16 80 50 94Q84 80 84 44Q84 6 50 6Z")+p("M30 34Q38 28 46 36Q40 44 30 34Z")+p("M70 34Q62 28 54 36Q60 44 70 34Z")+rc(30,52,40,30,8)+l("M38 52V82M50 52V82M62 52V82M30 62H70M30 72H70")+star(50,20,6)+l("M22 46l-6 2M78 46l6 2"),{float:true}],
 ["cup","Champion Cup",()=>rc(20,82,60,12,3)+rc(26,70,48,12,3)+rc(32,58,36,12,3)+rc(44,40,12,18)+p("M14 10H86Q86 40 50 42Q14 40 14 10Z")+o(50,10,36,6)+star(50,26,7)+l("M26 76H74M34 64H66")],
 ["gloves","Hockey Gloves",()=>R(p("M14 30Q14 10 26 10H40Q48 10 48 22V64H14Z")+l("M24 10V30M34 10V30M14 40H48M14 52H48")+rc(10,62,42,24,6),-10,30,50)+R(p("M86 30Q86 10 74 10H60Q52 10 52 22V64H86Z")+l("M76 10V30M66 10V30M52 40H86M52 52H86")+rc(48,62,42,24,6),10,70,50)],
 ["icemachine","Ice Machine",()=>rc(8,40,70,36,6)+rc(16,48,22,14,3)+rc(46,18,28,26,4)+rc(50,22,20,14,2)+rc(76,56,16,20,3)+rc(4,74,90,6,2)+wheel(24,84,9)+wheel(66,84,9)+heart(60,60,5)+l("M2 92Q30 88 50 92T98 92")],
 ["pennant","Team Pennant",()=>rc(8,10,6,86,3)+p("M14 14L94 36L14 58Z")+tx(46,41,10.5,"GO ICE!",.9)+star(24,28,4)],
 ["goal","Goal!",()=>T(p("M10 90V24Q10 14 20 14H80Q90 14 90 24V90")+l("M10 90V24Q10 14 20 14H80Q90 14 90 24V90M22 22V88M34 18V88M46 16V88M58 16V88M70 18V88M80 22V88M14 34H86M12 48H88M12 62H88M12 76H88M4 92H96"),0,0,1)+puck(50,70,.5)+star(14,8,6)+star(88,8,6)+sparkle(50,6,1)],
 ["penguinplayer","Penguin Player",()=>o(50,62,24,30)+o(50,68,15,22)+o(40,93,9,4)+o(60,93,9,4)+R(rc(70,20,6,62,3)+p("M70 80H92Q98 80 96 88H70Z"),10,73,50)+o(28,62,6,15,20)+o(72,58,6,14,-30)+
   p("M28 40Q26 14 50 14Q74 14 72 40Q62 34 50 34Q38 34 28 40Z")+face(50,44,1,{mouth:false})+pg("46,50 54,50 50,56")],
 ["polargoalie","Polar Bear Goalie",()=>rc(26,70,20,25,6)+rc(54,70,20,25,6)+l("M26 80H46M54 80H74")+o(50,62,24,20)+rc(64,50,28,26,5)+c(33,25,7)+c(67,25,7)+c(50,40,20)+o(50,49,9,6.5)+face(50,39,1,{nose:true,gap:8})+o(18,60,10,12)],
 ["beaverplayer","Beaver Player",()=>o(84,86,10,16,60)+sitBody({})+tx(50,86,13,"8",1)+HEADS.beaver().replace(brows(29),"")+R(rc(14,24,6,62,3)+p("M14 84H-6Q-12 84 -10 92H14Z"),-8,17,50)],
 ["moosefan","Moose Fan",()=>sitBody({arms:false})+HEADS.moose().replace(brows(28),"")+T(foamFinger(),58,30,.5)+o(34,72,6,10,18)],
 ["icefoxes","Ice Foxes",()=>crest("ICE FOXES","fox",0),{float:true}],
 ["polarbears","Polar Bears",()=>crest("POLAR BEARS","polar",1),{float:true}],
 ["penguinpals","Penguin Pals",()=>crest("PENGUIN PALS","penguin",2),{float:true}],
 ["blizzardwolves","Blizzard Wolves",()=>crest("BLIZZARD WOLVES","wolf",0),{float:true}],
 ["snowowls","Snow Owls",()=>crest("SNOW OWLS","owl",1),{float:true}],
 ["frostymoose","Frosty Moose",()=>crest("FROSTY MOOSE","moose",2),{float:true}],
 ["glaciersharks","Glacier Sharks",()=>crest("GLACIER SHARKS","shark",0),{float:true}],
 ["staryetis","Star Yetis",()=>crest("STAR YETIS","yeti",1),{float:true}],
];
category({id:"hockey",name:"Hockey",color:"#7cc8ff",bg,items,cover:"icefoxes"});
}
