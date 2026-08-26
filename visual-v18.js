(()=>{
  /* Landmark-first city previews. 900px thumbnails keep hover fast while staying sharp. */
  const landmarks=[
    ["КАРЛОВ МОСТ","https://commons.wikimedia.org/wiki/Special:FilePath/Charles%20Bridge%20Prague.jpg?width=900"],
    ["ЗАМОК ШПИЛЬБЕРК","https://commons.wikimedia.org/wiki/Special:FilePath/Brno%20spilberg%20castle.jpg?width=900"],
    ["DOLNÍ VÍTKOVICE · BOLT TOWER","https://commons.wikimedia.org/wiki/Special:FilePath/Ostrava%2C%20Doln%C3%AD%20oblast%20V%C3%ADtkovice%2C%20Bolt%20Tower.jpg?width=900"],
    ["СОБОР СВ. ВАРФОЛОМЕЯ","https://commons.wikimedia.org/wiki/Special:FilePath/Plzen%20with%20St%20Bartholomew%20Cathedral%201.JPG?width=900"],
    ["БАШНЯ JEŠTĚD","https://commons.wikimedia.org/wiki/Special:FilePath/Je%C5%A1t%C4%9Bd%20tower%202025-12-01%2005.jpg?width=900"],
    ["БЕЛАЯ БАШНЯ · СОБОР СВ. ДУХА","https://commons.wikimedia.org/wiki/Special:FilePath/Hradec%20Kr%C3%A1lov%C3%A9%2C%20de%20Pra%C5%BEsk%C3%BD%20most%20over%20de%20Elbe%20met%20de%20B%C3%ADl%C3%A1%20v%C4%9B%C5%BE%20en%20de%20torens%20van%20katedr%C3%A1ln%C3%AD%20kostel%20svat%C3%A9ho%20Ducha%20%28Dm205706-424%29%20IMG%206786%202018-08-05%2018.48.jpg?width=900"],
    ["ПЕРНШТЕЙНСКАЯ ПЛОЩАДЬ · ЗЕЛЁНЫЕ ВОРОТА","https://commons.wikimedia.org/wiki/Special:FilePath/Pernstejn%20Square%20with%20Green%20Gate%2C%20Pardubice%2C%20Czech%20Republic.jpg?width=900"],
    ["КОЛОННА СВ. ТРОИЦЫ · РАТУША","https://commons.wikimedia.org/wiki/Special:FilePath/Olomouc%20Town%20Hall%20and%20Holy%20Trinity%20Column.jpg?width=900"],
    ["МЛЫНСКАЯ КОЛОННАДА","https://commons.wikimedia.org/wiki/Special:FilePath/Mill%20Colonnade%20in%20Karlovy%20Vary.jpg?width=900"],
    ["ЧЁРНАЯ БАШНЯ","https://commons.wikimedia.org/wiki/Special:FilePath/The%20black%20tower.jpg?width=900"],
    ["VĚTRUŠE","https://commons.wikimedia.org/wiki/Special:FilePath/Vetruse%20Usti%20nad%20Labem.jpg?width=900"],
    ["БАШНЯ BAŤA · BUILDING 21","https://commons.wikimedia.org/wiki/Special:FilePath/Ba%C5%A5a%27s%20Skyscraper%2C%20a.k.a.%20Building%20No.%2021%20in%20Zl%C3%ADn%2C%20Czech%20Republic.jpg?width=900"],
    ["ИСТОРИЧЕСКИЙ ЦЕНТР JIHLAVA","https://commons.wikimedia.org/wiki/Special:FilePath/Jihlava%20-%20panoramio.jpg?width=900"]
  ];

  if(typeof CITIES!=="undefined"){
    landmarks.forEach((x,i)=>{if(CITIES[i]){CITIES[i][4]=x[1];CITIES[i][5]=x[0]}});
  }
  if(typeof CATS!=="undefined"){
    CATS.forEach(c=>{if(typeof c[3]==="string") c[3]=c[3].replace(/w=1400/g,"w=900").replace(/q=80/g,"q=68")});
  }

  const cache=new Map();
  function preload(url){
    if(!url||cache.has(url))return cache.get(url);
    const p=new Promise(resolve=>{
      const im=new Image();im.decoding="async";im.onload=()=>resolve(true);im.onerror=()=>resolve(false);im.src=url;
      if(im.decode)im.decode().then(()=>resolve(true)).catch(()=>{});
    });
    cache.set(url,p);return p;
  }
  const all=[...(typeof CITIES!=="undefined"?CITIES.map(x=>x[4]):[]),...(typeof CATS!=="undefined"?CATS.map(x=>x[3]):[])];
  /* Start preloading immediately after the app script, not on first hover. */
  all.slice(0,6).forEach(preload);
  const later=()=>all.slice(6).forEach(preload);
  if("requestIdleCallback" in window)requestIdleCallback(later,{timeout:1200});else setTimeout(later,180);

  const cityPreview=document.getElementById("cityPreview");
  if(cityPreview&&!cityPreview.querySelector(".previewLandmark")){
    const el=document.createElement("div");el.className="previewLandmark";el.id="previewLandmark";cityPreview.appendChild(el);
  }

  /* Wrap existing preview functions only to guarantee image is warm in cache and landmark label matches. */
  if(typeof focusCity==="function"){
    const oldFocusCity=focusCity;
    focusCity=function(i){
      const c=CITIES[i];
      const preview=document.getElementById("cityPreview");
      if(preview)preview.classList.add("v18Loading");
      preload(c?.[4]).finally(()=>{
        oldFocusCity(i);
        const lm=document.getElementById("previewLandmark");if(lm)lm.textContent=c?.[5]||"";
        if(preview)requestAnimationFrame(()=>preview.classList.remove("v18Loading"));
      });
    }
  }
  if(typeof focusCategory==="function"){
    const oldFocusCategory=focusCategory;
    focusCategory=function(i){
      const c=CATS[i],preview=document.getElementById("catPreview");
      if(preview)preview.classList.add("v18Loading");
      preload(c?.[3]).finally(()=>{
        oldFocusCategory(i);
        if(preview)requestAnimationFrame(()=>preview.classList.remove("v18Loading"));
      });
    }
  }

  /* Warm the currently visible preview once wrappers are installed. */
  setTimeout(()=>{try{focusCity(0);focusCategory(0)}catch(e){}},0);
})();
