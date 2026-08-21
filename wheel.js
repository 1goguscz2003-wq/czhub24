(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const MAIN_GROUP='https://t.me/czhub24';
const MAIN_IDS=['work','gigs','rent','market','auto','services'];
const MAIN_ANGLES=[-90,-30,30,90,150,210];
const extraIcons={documents:'▤',community:'♙',roommates:'♟',moving:'⇄',repairs:'⚒',beauty:'✦',education:'▣',legal:'§',health:'✚',food:'♨',events:'★',sport:'◆','lost-found':'⌖',other:'•••'};

function langPair(){
  const lang=(document.documentElement.lang||'ru').toLowerCase();
  if(lang.startsWith('cs')||lang.startsWith('cz')) return ['CELÉ ČESKO','HLAVNÍ SKUPINA'];
  if(lang.startsWith('uk')||lang.startsWith('ua')) return ['ВСЯ ЧЕХІЯ','ОСНОВНА ГРУПА'];
  return ['ВСЯ ЧЕХИЯ','ОСНОВНАЯ ГРУППА'];
}

function ensureCenterHub(){
  const row=$('#categoryRow'); if(!row) return null;
  let hub=$('.czCenterHub',row);
  if(!hub){
    hub=document.createElement('button');
    hub.type='button';
    hub.className='czCenterHub';
    hub.addEventListener('click',()=>window.open(MAIN_GROUP,'_blank','noopener,noreferrer'));
    row.appendChild(hub);
  }
  const [title,sub]=langPair();
  hub.innerHTML=`<span class="hubMap">✦</span><b>${title}</b><small>${sub}</small>`;
  return hub;
}

function placeMainWheel(){
  const row=$('#categoryRow'); if(!row) return;
  const buttons=$$('.catBtn',row); if(buttons.length<7) return;
  ensureCenterHub();
  const rect=row.getBoundingClientRect();
  const size=Math.min(rect.width,rect.height);
  if(size<10) return;
  const radius=size*0.365;
  const byId=Object.fromEntries(buttons.map(b=>[b.dataset.category,b]));

  MAIN_IDS.forEach((id,i)=>{
    const b=byId[id]; if(!b) return;
    const a=MAIN_ANGLES[i]*Math.PI/180;
    const x=rect.width/2 + Math.cos(a)*radius;
    const y=rect.height/2 + Math.sin(a)*radius;
    b.style.left=`${x}px`;
    b.style.top=`${y}px`;
    b.style.setProperty('--delay',`${70+i*55}ms`);
  });

  const more=byId.more || buttons.find(b=>b.classList.contains('more'));
  if(more){
    more.style.left=`${rect.width/2}px`;
    more.style.top=`${rect.height/2 + radius*0.62}px`;
    more.style.setProperty('--delay','430ms');
    if(!more.dataset.wheelBound){
      more.dataset.wheelBound='1';
      const original=more.onclick;
      more.onclick=function(e){
        if(original) original.call(this,e);
        setTimeout(enhanceExtraRing,20);
      };
    }
  }
  requestAnimationFrame(()=>row.classList.add('wheel-reveal'));
}

function closeExtras(){
  const modal=$('#modal');
  if(modal?.classList.contains('categoryRingModal')){
    modal.hidden=true;
    modal.classList.remove('categoryRingModal');
  }
  $('#categoryRow')?.classList.remove('extras-open');
}

function alignExtraRing(){
  const card=$('.categoryRingModal .modalCard');
  const row=$('#categoryRow');
  if(!card||!row) return;
  const r=row.getBoundingClientRect();
  const centerX=r.left+r.width/2;
  const centerY=r.top+r.height/2;
  const maxByViewport=Math.min(innerWidth*0.60,innerHeight*0.82);
  const size=Math.min(r.width*1.50,maxByViewport);
  card.style.left=`${centerX}px`;
  card.style.top=`${centerY}px`;
  card.style.width=`${size}px`;
  card.style.height=`${size}px`;
}

function enhanceExtraRing(){
  const modal=$('#modal'),body=$('#modalBody');
  if(!modal||!body||modal.hidden) return;
  const extras=$$('[data-extra]',body);
  if(!extras.length) return;
  modal.classList.add('categoryRingModal');
  $('#categoryRow')?.classList.add('extras-open');
  alignExtraRing();
  const card=$('.categoryRingModal .modalCard');
  const rect=card?.getBoundingClientRect();
  if(!rect?.width) return;
  const radius=rect.width*0.445;
  extras.forEach((b,i)=>{
    const a=(-90+(360/extras.length)*i)*Math.PI/180;
    b.style.left=`${rect.width/2 + Math.cos(a)*radius}px`;
    b.style.top=`${rect.height/2 + Math.sin(a)*radius}px`;
    b.style.setProperty('--delay',`${i*28}ms`);
    if(!b.querySelector('.extraIco')){
      const icon=document.createElement('span');
      icon.className='extraIco';
      icon.textContent=extraIcons[b.dataset.extra]||'◇';
      b.prepend(icon);
    }
  });
}

const brandSvg={
  telegram:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.8 3.2 18.7 19c-.2 1.1-.8 1.4-1.7.9l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.4-4.8 8.7-7.9c.4-.3-.1-.5-.6-.2L6.8 13 2.1 11.5c-1-.3-1-1 .2-1.5L20.5 3c.8-.3 1.6.2 1.3.2Z"/></svg>',
  whatsapp:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1a11 11 0 0 0-9.5 16.5L1 23l5.7-1.5A11 11 0 1 0 12 1Zm5.8 15.2c-.2.6-1.3 1.2-1.8 1.3-.5.1-1.2.2-3.7-.8-3.1-1.3-5.1-4.4-5.3-4.6-.1-.2-1.2-1.6-1.2-3.1 0-1.5.8-2.2 1.1-2.5.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 1.9c.1.3.1.5 0 .7l-.5.8c-.2.2-.4.5-.2.8.2.3.8 1.4 1.8 2.2 1.2 1.1 2.2 1.4 2.5 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.5-.2.8-.1l2 .9c.3.1.5.2.6.3.1.2.1.8-.1 1.8Z"/></svg>',
  viber:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1C5.6 1 1.8 3.7 1.5 9.5c-.2 4.6.6 7.8 4.4 9.4v3.4c0 .5.6.8 1 .5l3.6-3h1.6c6.4 0 10.1-2.7 10.4-8.5C22.8 5.3 18.5 1 12 1Zm5 14.7c-.4.8-1.2 1.5-2.1 1.4-1.2-.1-3.4-1.2-5.2-2.8-1.7-1.5-3.3-3.8-3.6-5.3-.2-1 .5-1.8 1.3-2.2.4-.2.7-.1 1 .3l1.1 2c.2.4.1.7-.2 1l-.6.7c.5 1.2 2.3 3 3.6 3.5l.7-.7c.3-.3.6-.4 1-.2l2 .9c.5.2 1.1.7 1 1.4Z"/></svg>'
};

function installBrandIcons(){
  $$('[data-platform]').forEach(btn=>{
    const type=btn.dataset.platform;
    const icon=btn.querySelector('span');
    if(icon&&brandSvg[type]){
      icon.classList.add('brandIcon');
      icon.innerHTML=brandSvg[type];
    }
  });
}

function installMessengerStages(){
  const row=$('.platformRow');
  if(!row||row.dataset.staged) return;
  row.dataset.staged='1';
  const buttons=$$('.platform',row);
  buttons.forEach((button,i)=>{
    const stage=document.createElement('div');
    stage.className='messengerStage';
    stage.dataset.stage=String(i+1);
    stage.innerHTML='<div class="stageVortex"><span class="vortexArm a1"></span><span class="vortexArm a2"></span><span class="vortexArm a3"></span><span class="vortexCore"></span></div>';
    row.insertBefore(stage,button);
    stage.appendChild(button);
  });
}

function revealPlatforms(){
  closeExtras();
  installMessengerStages();
  $$('.messengerStage').forEach((stage,i)=>{
    stage.classList.remove('run');
    stage.style.setProperty('--show-at',`${i+1}s`);
    void stage.offsetWidth;
    stage.classList.add('run');
  });
}

function init(){
  installBrandIcons();
  installMessengerStages();
  placeMainWheel();

  $('#cityLayer')?.addEventListener('click',e=>{
    if(!e.target.closest('.cityNode')) return;
    const row=$('#categoryRow');
    row?.classList.remove('wheel-reveal');
    setTimeout(placeMainWheel,40);
  });

  $('#categoryRow')?.addEventListener('click',e=>{
    const button=e.target.closest('.catBtn');
    if(button&&!button.classList.contains('more')) closeExtras();
  });

  const row=$('#categoryRow');
  if(row) new MutationObserver(()=>placeMainWheel()).observe(row,{childList:true});

  const app=$('#app');
  if(app) new MutationObserver(()=>{
    if(app.classList.contains('step-platform')) setTimeout(revealPlatforms,30);
  }).observe(app,{attributes:true,attributeFilter:['class']});

  const modal=$('#modal');
  if(modal) new MutationObserver(()=>{
    if(modal.hidden){
      modal.classList.remove('categoryRingModal');
      $('#categoryRow')?.classList.remove('extras-open');
    } else setTimeout(enhanceExtraRing,20);
  }).observe(modal,{attributes:true,attributeFilter:['hidden']});

  const body=$('#modalBody');
  if(body) new MutationObserver(()=>setTimeout(enhanceExtraRing,20)).observe(body,{childList:true,subtree:true});

  addEventListener('resize',()=>{
    placeMainWheel();
    if($('#modal')?.classList.contains('categoryRingModal')) enhanceExtraRing();
  },{passive:true});
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();