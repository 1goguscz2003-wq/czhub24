(()=>{"use strict";
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const CFG={
  supabase:"https://cishmtektnuvjxyuetvm.supabase.co",
  key:"sb_publishable_F9lya4xhIKkXcpjhWXvaNg_l-nBZT8g",
  contest:"https://t.me/CZHUB24Bot?start=contest"
};
const CITY_MEDIA={
  "praha":{landmark:"КАРЛОВ МОСТ",url:"https://commons.wikimedia.org/wiki/Special:FilePath/Charles%20Bridge%20Prague.jpg?width=960"},
  "brno":{landmark:"ЗАМОК ШПИЛЬБЕРК",url:"https://commons.wikimedia.org/wiki/Special:FilePath/Brno%20spilberg%20castle.jpg?width=960"},
  "ostrava":{landmark:"DOLNÍ VÍTKOVICE · BOLT TOWER",url:"https://commons.wikimedia.org/wiki/Special:FilePath/Ostrava%2C%20Doln%C3%AD%20oblast%20V%C3%ADtkovice%2C%20Bolt%20Tower.jpg?width=960"},
  "plzen":{landmark:"СОБОР СВ. ВАРФОЛОМЕЯ",url:"https://commons.wikimedia.org/wiki/Special:FilePath/Plzen%20with%20St%20Bartholomew%20Cathedral%201.JPG?width=960"},
  "liberec":{landmark:"БАШНЯ JEŠTĚD",url:"https://commons.wikimedia.org/wiki/Special:FilePath/Je%C5%A1t%C4%9Bd%20tower%202025-12-01%2005.jpg?width=960"},
  "hradec-kralove":{landmark:"БЕЛАЯ БАШНЯ · СОБОР СВ. ДУХА",url:"https://commons.wikimedia.org/wiki/Special:FilePath/Hradec%20Kr%C3%A1lov%C3%A9%2C%20de%20Pra%C5%BEsk%C3%BD%20most%20over%20de%20Elbe%20met%20de%20B%C3%ADl%C3%A1%20v%C4%9B%C5%BE%20en%20de%20torens%20van%20katedr%C3%A1ln%C3%AD%20kostel%20svat%C3%A9ho%20Ducha%20%28Dm205706-424%29%20IMG%206786%202018-08-05%2018.48.jpg?width=960"},
  "pardubice":{landmark:"ПЕРНШТЕЙНСКАЯ ПЛОЩАДЬ · ЗЕЛЁНЫЕ ВОРОТА",url:"https://commons.wikimedia.org/wiki/Special:FilePath/Pernstejn%20Square%20with%20Green%20Gate%2C%20Pardubice%2C%20Czech%20Republic.jpg?width=960"},
  "olomouc":{landmark:"КОЛОННА СВ. ТРОИЦЫ · РАТУША",url:"https://commons.wikimedia.org/wiki/Special:FilePath/Olomouc%20Town%20Hall%20and%20Holy%20Trinity%20Column.jpg?width=960"},
  "karlovy-vary":{landmark:"МЛЫНСКАЯ КОЛОННАДА",url:"https://commons.wikimedia.org/wiki/Special:FilePath/Mill%20Colonnade%20in%20Karlovy%20Vary.jpg?width=960"},
  "ceske-budejovice":{landmark:"ЧЁРНАЯ БАШНЯ",url:"https://commons.wikimedia.org/wiki/Special:FilePath/The%20black%20tower.jpg?width=960"},
  "usti-nad-labem":{landmark:"VĚTRUŠE",url:"https://commons.wikimedia.org/wiki/Special:FilePath/Vetruse%20Usti%20nad%20Labem.jpg?width=960"},
  "zlin":{landmark:"БАШНЯ BAŤA · BUILDING 21",url:"https://commons.wikimedia.org/wiki/Special:FilePath/Ba%C5%A5a%27s%20Skyscraper%2C%20a.k.a.%20Building%20No.%2021%20in%20Zl%C3%ADn%2C%20Czech%20Republic.jpg?width=960"},
  "jihlava":{landmark:"ИСТОРИЧЕСКИЙ ЦЕНТР",url:"https://commons.wikimedia.org/wiki/Special:FilePath/Jihlava%20-%20panoramio.jpg?width=960"},
  "czechia":{landmark:"ВСЯ ЧЕХИЯ",url:"./assets/map-clean.png"}
};
const CATEGORY_MEDIA={
  work:"https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=960&q=68",
  gigs:"https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=960&q=68",
  rent:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=960&q=68",
  market:"https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=960&q=68",
  auto:"https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=960&q=68",
  services:"https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=960&q=68",
  documents:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=960&q=68",
  community:"https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=960&q=68",
  roommates:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=960&q=68",
  moving:"https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=960&q=68",
  repairs:"https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=960&q=68",
  beauty:"https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=960&q=68",
  education:"https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=960&q=68",
  legal:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=960&q=68",
  health:"https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=960&q=68",
  food:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=960&q=68",
  events:"https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=960&q=68",
  sport:"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=960&q=68",
  "lost-found":"https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=960&q=68",
  other:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=960&q=68"
};

let DATA=null, cities=[], categories=[], platforms=[];
let pendingCat=null, focusCat=0, cityToken=0, catToken=0;
let state=readState();
const imageCache=new Map();

function readState(){
  try{return JSON.parse(localStorage.getItem("czhub24_state")||'{"city":null,"cat":null}')}
  catch(e){return {city:null,cat:null}}
}
function session(){
  let x=localStorage.getItem("czhub24_session");
  if(!x){x=(crypto.randomUUID?crypto.randomUUID():"s-"+Date.now());localStorage.setItem("czhub24_session",x)}
  return x;
}
function source(){
  const p=new URLSearchParams(location.search);
  return p.get("src")||p.get("utm_source")||"direct";
}
function track(type,data){
  if(!CFG.supabase||!CFG.key)return;
  fetch(CFG.supabase+"/rest/v1/analytics_events",{
    method:"POST",
    keepalive:true,
    headers:{apikey:CFG.key,Authorization:"Bearer "+CFG.key,"Content-Type":"application/json",Prefer:"return=minimal"},
    body:JSON.stringify({data:Object.assign({type:type,sessionId:session(),source:source()},data||{})})
  }).catch(()=>{});
}
function t(v){return typeof v==="string"?v:(v&&v.ru)||""}
function save(){
  localStorage.setItem("czhub24_state",JSON.stringify(state));
  $("#crumbCity").textContent=state.city?state.city.name:"ГОРОД";
  $("#crumbCat").textContent=state.cat?state.cat.name:"КАТЕГОРИЯ";
  $("#choiceBtn").textContent=state.city?(state.city.name+(state.cat?" / "+state.cat.name.split(" / ")[0]:"")):"ВЫБРАТЬ ГОРОД";
}
function preload(url){
  if(!url)return Promise.resolve(false);
  if(imageCache.has(url))return imageCache.get(url);
  const p=new Promise(resolve=>{
    const im=new Image();
    im.decoding="async";
    im.onload=()=>resolve(true);
    im.onerror=()=>resolve(false);
    im.src=url;
  });
  imageCache.set(url,p);return p;
}
function warmImages(){
  const urls=cities.map(c=>(CITY_MEDIA[c.id]||{}).url).filter(Boolean)
    .concat(categories.map(c=>CATEGORY_MEDIA[c.id]).filter(Boolean));
  urls.slice(0,7).forEach(preload);
  const later=()=>urls.slice(7).forEach(preload);
  if("requestIdleCallback" in window)requestIdleCallback(later,{timeout:1400});else setTimeout(later,180);
}
function openOverlay(id){
  closeOverlays();
  const el=$("#"+id);if(!el)return;
  el.classList.add("open");document.body.classList.add("modal-open");
}
function closeOverlays(){
  $$(".overlay").forEach(x=>x.classList.remove("open"));
  document.body.classList.remove("modal-open");
}
function jump(id){
  closeOverlays();
  const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:"smooth",block:"start"});
}
function cityOverlay(cat){
  pendingCat=cat||null;
  $("#cityOverlayTitle").textContent=cat?t(cat.name):"ВЫБЕРИ ГОРОД";
  $("#cityOverlaySub").textContent=cat?"Категория выбрана. Теперь выбери город.":"Сначала выбери город — категория будет следующим шагом.";
  $("#cityGrid").innerHTML=cities.map((c,i)=>
    '<button data-citypick="'+i+'"><b>'+t(c.name).toUpperCase()+'</b><small>'+c.meta+' · ВЫБРАТЬ</small></button>'
  ).join("");
  openOverlay("cityOverlay");
}
function extraOverlay(){
  const extras=categories.filter(c=>!["work","gigs","rent"].includes(c.id));
  $("#extraGrid").innerHTML=extras.map(c=>
    '<button data-extrapick="'+c.id+'"><b>'+t(c.name).toUpperCase()+'</b><small>'+t(c.meta)+'</small></button>'
  ).join("");
  openOverlay("extraOverlay");
}
function pickCity(i){
  const c=cities[i];if(!c)return;
  state.city={slug:c.id,name:t(c.name).toUpperCase()};
  track("city_select",{city:c.id});
  if(pendingCat){
    state.cat={slug:pendingCat.id,name:t(pendingCat.name).toUpperCase()};
    track("category_select",{city:c.id,category:pendingCat.id});
    save();closeOverlays();showResult();
  }else{
    save();closeOverlays();jump("categories");
  }
}
function pickCatById(id){
  const c=categories.find(x=>x.id===id);if(!c)return;
  state.cat={slug:c.id,name:t(c.name).toUpperCase()};
  track("category_select",{city:state.city?state.city.slug:null,category:c.id});
  save();
  if(state.city)showResult();else cityOverlay(c);
}
function gate(){
  return new Promise(resolve=>{
    const g=$("#gate"), label=$("#gateText");
    label.textContent=(state.city?state.city.name:"ВСЯ ЧЕХИЯ")+" × "+(state.cat?state.cat.name:"ОСНОВНАЯ ГРУППА");
    g.classList.remove("run");void g.offsetWidth;g.classList.add("run");
    setTimeout(()=>{g.classList.remove("run");resolve()},1030);
  });
}
async function showResult(){
  closeOverlays();
  await gate();
  $("#resultCode").textContent="CZHUB24 / "+(state.city?state.city.name:"ВСЯ ЧЕХИЯ")+" / "+(state.cat?state.cat.name:"ОСНОВНАЯ ГРУППА");
  $("#resultTitle").innerHTML='<span>'+(state.city?state.city.name:"ВСЯ ЧЕХИЯ")+'</span><i>×</i><span>'+(state.cat?state.cat.name:"ОСНОВНАЯ ГРУППА")+'</span>';
  $("#result").classList.add("open");document.body.classList.add("modal-open");
}
function goPlatform(id){
  const p=platforms.find(x=>x.id===id);if(!p)return;
  const contest=state.cat&&state.cat.slug==="contest";
  track(contest?"giveaway_click":"platform_click",{city:state.city?state.city.slug:"all",category:state.cat?state.cat.slug:"all",platform:id});
  location.href=(contest&&id==="telegram")?CFG.contest:p.defaultUrl;
}
function buildCities(){
  $("#cityRows").innerHTML=cities.map((c,i)=>
    '<div class="cityRow '+(i===0?"active":"")+'" data-city="'+i+'">'+
    '<small>['+String(i+1).padStart(3,"0")+']</small><small>'+c.meta+'</small><b>'+t(c.name).toUpperCase()+'</b><small>ОТКРЫТЬ ↗</small></div>'
  ).join("");
  $$(".cityRow").forEach(row=>{
    row.addEventListener("mouseenter",()=>focusCity(+row.dataset.city));
    row.addEventListener("focusin",()=>focusCity(+row.dataset.city));
    row.addEventListener("click",()=>pickCity(+row.dataset.city));
  });
  focusCity(0);
}
function focusCity(i){
  const c=cities[i];if(!c)return;
  cityToken++;const token=cityToken;
  $$(".cityRow").forEach((x,j)=>x.classList.toggle("active",j===i));
  $("#previewName").textContent=t(c.name).toUpperCase();
  let lm=$("#previewLandmark");
  if(!lm){lm=document.createElement("div");lm.id="previewLandmark";lm.className="previewLandmark";$("#cityPreview").appendChild(lm)}
  const media=CITY_MEDIA[c.id]||{};
  lm.textContent=media.landmark||c.meta;
  const preview=$("#cityPreview");preview.classList.add("loading");
  if(!media.url){preview.classList.remove("loading");return}
  preload(media.url).then(ok=>{
    if(token!==cityToken)return;
    if(ok)preview.style.backgroundImage='url("'+media.url.replace(/"/g,"%22")+'")';
    requestAnimationFrame(()=>preview.classList.remove("loading"));
  });
}
function buildCats(){
  $("#catList").innerHTML=categories.map((c,i)=>
    '<div class="catItem '+(i===0?"active":"")+'" data-catindex="'+i+'"><small>['+String(i+1).padStart(2,"0")+']</small><b>'+t(c.name).toUpperCase()+'</b><span>→</span></div>'
  ).join("");
  $$(".catItem").forEach(row=>{
    row.addEventListener("mouseenter",()=>focusCategory(+row.dataset.catindex));
    row.addEventListener("focusin",()=>focusCategory(+row.dataset.catindex));
    row.addEventListener("click",()=>pickCatById(categories[+row.dataset.catindex].id));
  });
  focusCategory(0);
}
function focusCategory(i){
  const c=categories[i];if(!c)return;
  focusCat=i;catToken++;const token=catToken;
  $$(".catItem").forEach((x,j)=>x.classList.toggle("active",j===i));
  $("#catCode").textContent=String(i+1).padStart(2,"0")+" / CATEGORY";
  $("#catName").textContent=t(c.name).toUpperCase();
  $("#catDesc").textContent=t(c.meta);
  const preview=$("#catPreview"), url=CATEGORY_MEDIA[c.id];
  preview.classList.add("loading");
  if(!url){preview.classList.remove("loading");return}
  preload(url).then(ok=>{
    if(token!==catToken)return;
    if(ok)preview.style.backgroundImage='url("'+url.replace(/"/g,"%22")+'")';
    requestAnimationFrame(()=>preview.classList.remove("loading"));
  });
}
function nodeHover(el,on){
  const c=categories.find(x=>x.id===el.dataset.cat);
  if(on&&c){
    $("#coreTitle").textContent=t(c.name).toUpperCase();
    $("#coreSub").textContent=t(c.meta).toUpperCase().slice(0,42);
    $("#coreText").textContent="Категория → город → площадка.";
  }else{
    $("#coreTitle").innerHTML="ВСЯ<br>ЧЕХИЯ";
    $("#coreSub").textContent="ВЫБЕРИ КАК УДОБНЕЕ";
    $("#coreText").textContent="Город → категория или категория → город.";
  }
}
function setupEvents(){
  document.addEventListener("click",e=>{
    const close=e.target.closest("[data-close]");if(close){closeOverlays();$("#result").classList.remove("open");document.body.classList.remove("modal-open")}
    const j=e.target.closest("[data-jump]");if(j)jump(j.dataset.jump);
    const cp=e.target.closest("[data-citypick]");if(cp)pickCity(+cp.dataset.citypick);
    const ep=e.target.closest("[data-extrapick]");if(ep){const c=categories.find(x=>x.id===ep.dataset.extrapick);if(c){closeOverlays();cityOverlay(c)}}
    const interactive=e.target.closest(".node,.btn,.cityRow,.catItem,.choiceGrid button,.qrFloat,.navCard,.resultPlatforms button");
    if(interactive)clickBurst(e.clientX,e.clientY);
  });
  $$(".node[data-cat]").forEach(n=>{
    n.addEventListener("mouseenter",()=>nodeHover(n,true));n.addEventListener("mouseleave",()=>nodeHover(n,false));
    n.addEventListener("click",()=>{const c=categories.find(x=>x.id===n.dataset.cat);if(c){track("category_select",{category:c.id,city:state.city?state.city.slug:null});cityOverlay(c)}});
  });
  $("#moreCats").addEventListener("click",extraOverlay);
  $("#cityFirst").addEventListener("click",()=>cityOverlay());
  $("#choiceBtn").addEventListener("click",()=>cityOverlay());
  $("#mainGroup").addEventListener("click",()=>{state.city={slug:"all",name:"ВСЯ ЧЕХИЯ"};state.cat={slug:"all",name:"ОСНОВНАЯ ГРУППА"};save();showResult()});
  $("#catSelect").addEventListener("click",()=>{const c=categories[focusCat];if(c)pickCatById(c.id)});
  $("#menuBtn").addEventListener("click",()=>openOverlay("menuOverlay"));
  $("#qrBtn").addEventListener("click",()=>{track("share_qr",{source:"share-qr"});openOverlay("qrOverlay")});
  $("#scrollGroups").addEventListener("click",()=>jump("cities"));
  $("#giveBtn").addEventListener("click",()=>{track("giveaway_click",{source:"site-giveaway"});location.href=CFG.contest});
  $("#resultClose").addEventListener("click",()=>{$("#result").classList.remove("open");document.body.classList.remove("modal-open")});
  $$("[data-dest]").forEach(x=>x.addEventListener("click",()=>goPlatform(x.dataset.dest)));
  $$("[data-platform]").forEach(x=>x.addEventListener("click",()=>goPlatform(x.dataset.platform)));
  $$("[data-home]").forEach(x=>x.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"})));
  addEventListener("keydown",e=>{if(e.key==="Escape"){closeOverlays();$("#result").classList.remove("open");document.body.classList.remove("modal-open")}});
  addEventListener("scroll",()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    $("#progress").style.width=(max?scrollY/max*100:0)+"%";
  },{passive:true});
}
function clickBurst(x,y){
  const b=document.createElement("i");b.className="clickBurst";b.style.left=x+"px";b.style.top=y+"px";document.body.appendChild(b);setTimeout(()=>b.remove(),620);
}
function reveals(){
  const els=$$(".sectionHead,.cityLayout,.catLayout,.platformCards,.give,.about");
  els.forEach(el=>el.classList.add("reveal"));
  if(!("IntersectionObserver" in window)){els.forEach(el=>el.classList.add("seen"));return}
  const io=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add("seen");io.unobserve(en.target)}}),{threshold:.12,rootMargin:"0px 0px -5% 0px"});
  els.forEach(el=>io.observe(el));
}
function startCursorSparks(){
  if(matchMedia("(pointer:coarse)").matches||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  let last=0,count=0;
  addEventListener("pointermove",e=>{
    cursorX=e.clientX;cursorY=e.clientY;
    const now=performance.now();if(now-last<52||count>14)return;last=now;count++;
    const s=document.createElement("i");s.className="cursorSpark";
    s.style.left=e.clientX+"px";s.style.top=e.clientY+"px";
    s.style.setProperty("--ray",(10+Math.random()*14)+"px");s.style.setProperty("--dx",(-12+Math.random()*24)+"px");s.style.setProperty("--dy",(7+Math.random()*18)+"px");
    document.body.appendChild(s);setTimeout(()=>{s.remove();count--},680);
  },{passive:true});
}
let cursorX=-9999,cursorY=-9999;
function startCosmos(){
  const canvas=$("#cosmosCanvas");if(!canvas)return;
  const ctx=canvas.getContext("2d",{alpha:true});
  let w=0,h=0,dpr=1,stars=[];
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  function resize(){
    dpr=Math.min(devicePixelRatio||1,1.5);w=innerWidth;h=innerHeight;
    canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=w+"px";canvas.style.height=h+"px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const n=Math.min(165,Math.max(70,Math.round(w*h/9500)));
    stars=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,r:.45+Math.random()*1.25,a:.2+Math.random()*.72,p:Math.random()*Math.PI*2,s:.003+Math.random()*.009,c:Math.random()>.72}));
  }
  function draw(ts){
    ctx.clearRect(0,0,w,h);
    for(const st of stars){
      const pulse=reduced?st.a:st.a*(.72+.28*Math.sin(ts*st.s+st.p));
      let x=st.x,y=st.y;
      const dx=cursorX-x,dy=cursorY-y,dist=Math.hypot(dx,dy);
      let boost=0;
      if(dist<155){boost=(155-dist)/155;x-=dx*boost*.022;y-=dy*boost*.022}
      ctx.globalAlpha=Math.min(1,pulse+boost*.5);
      ctx.fillStyle=st.c?"#a8ccff":"#eef7ff";
      ctx.beginPath();ctx.arc(x,y,st.r+boost*.75,0,Math.PI*2);ctx.fill();
      if(st.c&&(st.r>1||boost>.45)){
        const ray=5+st.r*5+boost*10;ctx.strokeStyle="rgba(196,226,255,"+(0.14+boost*.22)+")";ctx.lineWidth=.6;
        ctx.beginPath();ctx.moveTo(x-ray,y);ctx.lineTo(x+ray,y);ctx.moveTo(x,y-ray);ctx.lineTo(x,y+ray);ctx.stroke();
      }
    }
    ctx.globalAlpha=1;
    requestAnimationFrame(draw);
  }
  resize();addEventListener("resize",resize,{passive:true});requestAnimationFrame(draw);
}
async function boot(){
  try{
    const res=await fetch("./data/site-data.json?v=2",{cache:"force-cache"});
    if(!res.ok)throw new Error("data");
    DATA=await res.json();
    cities=(DATA.cities||[]).filter(c=>c.id!=="czechia");
    categories=DATA.categories||[];
    platforms=DATA.platforms||[];
  }catch(e){
    cities=[
      {id:"praha",name:{ru:"Прага"},meta:"Praha"},{id:"brno",name:{ru:"Брно"},meta:"Brno"},{id:"ostrava",name:{ru:"Острава"},meta:"Ostrava"},
      {id:"plzen",name:{ru:"Пльзень"},meta:"Plzeň"},{id:"liberec",name:{ru:"Либерец"},meta:"Liberec"},{id:"olomouc",name:{ru:"Оломоуц"},meta:"Olomouc"}
    ];
    categories=[
      {id:"work",name:{ru:"Работа"},meta:{ru:"вакансии и работодатели"}},{id:"gigs",name:{ru:"Фушки"},meta:{ru:"смены и подработки"}},
      {id:"rent",name:{ru:"Аренда"},meta:{ru:"квартиры и комнаты"}},{id:"market",name:{ru:"Маркет"},meta:{ru:"вещи и объявления"}},
      {id:"auto",name:{ru:"Авто"},meta:{ru:"машины и сервис"}},{id:"services",name:{ru:"Услуги"},meta:{ru:"мастера и перевозки"}}
    ];
    platforms=[
      {id:"telegram",defaultUrl:"https://t.me/czhub24"},{id:"whatsapp",defaultUrl:"https://chat.whatsapp.com/G0YbngLJZs62JZ8QLef0mj"},{id:"viber",defaultUrl:"https://invite.viber.com/?g2=AQBEyu%2BkYLoW5lbe0flu%2BPnAUDrUZUpv64chJAs9SWpAFdDAF2TzTHJG0yqUd2xn"}
    ];
  }
  buildCities();buildCats();save();warmImages();setupEvents();reveals();startCursorSparks();startCosmos();
  track("page_view",{path:location.pathname+location.search,ui:"v2"});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();