(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const mainPositions=[[-90,37],[-30,37],[30,37],[90,37],[150,37],[210,37]];
function polar(angle,r){const a=angle*Math.PI/180;return [50+Math.cos(a)*r,50+Math.sin(a)*r]}
function enhanceRow(){
  const row=$('#categoryRow'); if(!row)return;
  const buttons=$$('.catBtn',row); if(!buttons.length)return;
  buttons.slice(0,6).forEach((b,i)=>{const [x,y]=polar(mainPositions[i][0],mainPositions[i][1]);b.style.setProperty('--wx',x+'%');b.style.setProperty('--wy',y+'%');b.style.setProperty('--delay',(70+i*55)+'ms')});
  const more=buttons.find(b=>b.classList.contains('more'))||buttons[6];
  if(more){more.style.setProperty('--wx','50%');more.style.setProperty('--wy','75%');more.style.setProperty('--delay','390ms');
    if(!more.dataset.wheelBound){more.dataset.wheelBound='1';const original=more.onclick;more.onclick=function(e){if(original)original.call(this,e);setTimeout(enhanceExtraRing,0)}}
  }
  requestAnimationFrame(()=>row.classList.add('wheel-reveal'));
}
function enhanceExtraRing(){
  const modal=$('#modal'), body=$('#modalBody'); if(!modal||!body)return;
  const extras=$$('[data-extra]',body); if(!extras.length){modal.classList.remove('categoryRingModal');return}
  modal.classList.add('categoryRingModal');
  const n=extras.length, radius=40;
  extras.forEach((b,i)=>{const angle=-90+(360/n)*i;const [x,y]=polar(angle,radius);b.style.setProperty('--ex',x+'%');b.style.setProperty('--ey',y+'%');b.style.setProperty('--delay',(i*24)+'ms')});
}
function animateCityChoice(){const row=$('#categoryRow');if(row){row.classList.remove('wheel-reveal');requestAnimationFrame(()=>requestAnimationFrame(()=>row.classList.add('wheel-reveal')))}}
function init(){
  enhanceRow();
  $('#cityLayer')?.addEventListener('click',e=>{if(e.target.closest('.cityNode'))setTimeout(animateCityChoice,20)});
  const row=$('#categoryRow'); if(row)new MutationObserver(()=>enhanceRow()).observe(row,{childList:true});
  const modal=$('#modal'); if(modal)new MutationObserver(()=>{if(modal.hidden)modal.classList.remove('categoryRingModal');else setTimeout(enhanceExtraRing,0)}).observe(modal,{attributes:true,attributeFilter:['hidden']});
  const body=$('#modalBody'); if(body)new MutationObserver(()=>setTimeout(enhanceExtraRing,0)).observe(body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
