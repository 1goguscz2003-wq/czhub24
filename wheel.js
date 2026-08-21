(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const extraIcons={documents:'▤',community:'♙',roommates:'♟',moving:'⇄',repairs:'⚒',beauty:'✦',education:'▣',legal:'§',health:'✚',food:'♨',events:'★',sport:'◆','lost-found':'⌖',other:'•••'};
function polar(angle,r){const a=angle*Math.PI/180;return [50+Math.cos(a)*r,50+Math.sin(a)*r]}
function enhanceRow(){
  const row=$('#categoryRow'); if(!row)return;
  const buttons=$$('.catBtn',row); if(!buttons.length)return;
  const angles=[-90,-25,35,145,205,265];
  buttons.slice(0,6).forEach((b,i)=>{const [x,y]=polar(angles[i],34);b.style.setProperty('--wx',x+'%');b.style.setProperty('--wy',y+'%');b.style.setProperty('--delay',(60+i*55)+'ms')});
  const more=buttons.find(b=>b.classList.contains('more'))||buttons[6];
  if(more){more.style.setProperty('--wx','50%');more.style.setProperty('--wy','76%');more.style.setProperty('--delay','390ms');if(!more.dataset.wheelBound){more.dataset.wheelBound='1';const original=more.onclick;more.onclick=function(e){if(original)original.call(this,e);setTimeout(enhanceExtraRing,0)}}}
  requestAnimationFrame(()=>row.classList.add('wheel-reveal'));
}
function closeExtras(){const modal=$('#modal');if(modal?.classList.contains('categoryRingModal')){modal.hidden=true;modal.classList.remove('categoryRingModal')}$('#categoryRow')?.classList.remove('extras-open')}
function alignExtraRing(){
  const card=$('.categoryRingModal .modalCard'), base=$('.categorySection'); if(!card||!base)return;
  const r=base.getBoundingClientRect();
  card.style.left=(r.left+r.width/2)+'px'; card.style.top=(r.top+r.height/2)+'px';
  const size=Math.min(Math.max(r.width*1.72,430),Math.min(innerWidth*.62,innerHeight*.78));
  card.style.width=size+'px'; card.style.height=size+'px';
}
function enhanceExtraRing(){
  const modal=$('#modal'), body=$('#modalBody'); if(!modal||!body)return;
  const extras=$$('[data-extra]',body); if(!extras.length){modal.classList.remove('categoryRingModal');return}
  modal.classList.add('categoryRingModal'); $('#categoryRow')?.classList.add('extras-open'); alignExtraRing();
  const n=extras.length; extras.forEach((b,i)=>{const angle=-90+(360/n)*i;const [x,y]=polar(angle,44);b.style.setProperty('--ex',x+'%');b.style.setProperty('--ey',y+'%');b.style.setProperty('--delay',(i*22)+'ms');if(!b.querySelector('.extraIco')){const ico=document.createElement('span');ico.className='extraIco';ico.textContent=extraIcons[b.dataset.extra]||'◇';b.prepend(ico)}})
}
function makeVortex(){const main=$('#mainArea');if(!main)return null;let v=$('.messengerVortex',main);if(!v){v=document.createElement('div');v.className='messengerVortex';v.innerHTML='<i></i><i></i><i></i><b></b>';main.append(v)}v.classList.remove('run');void v.offsetWidth;v.classList.add('run');return v}
function revealPlatforms(){
  closeExtras(); const app=$('#app'); if(!app?.classList.contains('step-platform'))return;
  const ps=$$('.platform'); ps.forEach(p=>p.classList.remove('storm-in'));
  makeVortex();
  ps.forEach((p,i)=>{p.style.setProperty('--drop-delay',(900+i*950)+'ms');void p.offsetWidth;p.classList.add('storm-in')});
}
function animateCityChoice(){const row=$('#categoryRow');if(row){row.classList.remove('wheel-reveal');requestAnimationFrame(()=>requestAnimationFrame(()=>row.classList.add('wheel-reveal')))}}
function init(){
  enhanceRow();
  $('#cityLayer')?.addEventListener('click',e=>{if(e.target.closest('.cityNode'))setTimeout(animateCityChoice,20)});
  $('#categoryRow')?.addEventListener('click',e=>{const b=e.target.closest('.catBtn');if(b&&!b.classList.contains('more'))closeExtras()});
  const row=$('#categoryRow'); if(row)new MutationObserver(()=>enhanceRow()).observe(row,{childList:true});
  const app=$('#app'); if(app)new MutationObserver(()=>{if(app.classList.contains('step-platform'))setTimeout(revealPlatforms,30)}).observe(app,{attributes:true,attributeFilter:['class']});
  const modal=$('#modal'); if(modal)new MutationObserver(()=>{if(modal.hidden){modal.classList.remove('categoryRingModal');$('#categoryRow')?.classList.remove('extras-open')}else setTimeout(enhanceExtraRing,0)}).observe(modal,{attributes:true,attributeFilter:['hidden']});
  const body=$('#modalBody'); if(body)new MutationObserver(()=>setTimeout(enhanceExtraRing,0)).observe(body,{childList:true,subtree:true});
  addEventListener('resize',()=>{if($('#modal')?.classList.contains('categoryRingModal'))alignExtraRing()},{passive:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();