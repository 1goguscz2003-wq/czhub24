(()=>{
  const layer=document.createElement('div');layer.className='v17Starspace';document.body.prepend(layer);
  const o1=document.createElement('div');o1.className='v17OrbitLine';document.body.appendChild(o1);
  const o2=document.createElement('div');o2.className='v17OrbitLine o2';document.body.appendChild(o2);
  for(let i=0;i<26;i++){
    const s=document.createElement('i');s.className='v17CrossStar';
    s.style.left=(3+Math.random()*94)+'%';s.style.top=(4+Math.random()*90)+'%';
    s.style.setProperty('--ray',(18+Math.random()*34)+'px');s.style.setProperty('--dur',(2.8+Math.random()*5.4)+'s');
    s.style.animationDelay=(-Math.random()*6)+'s';layer.appendChild(s);
  }
  let last=0,px=innerWidth*.5,py=innerHeight*.5;
  document.addEventListener('pointermove',e=>{
    const now=performance.now();
    const dist=Math.hypot(e.clientX-px,e.clientY-py);
    if(now-last>34&&dist>5){
      last=now;
      const st=document.createElement('i');st.className='v17MouseStar';
      st.style.left=e.clientX+'px';st.style.top=e.clientY+'px';
      st.style.setProperty('--r',(11+Math.random()*15)+'px');
      st.style.setProperty('--mx',(-16+Math.random()*32)+'px');
      st.style.setProperty('--my',(8+Math.random()*24)+'px');
      document.body.appendChild(st);setTimeout(()=>st.remove(),850);
      if(dist<90&&Math.random()>.42){
        const line=document.createElement('i');line.className='v17MouseLine';
        const ang=Math.atan2(e.clientY-py,e.clientX-px)*180/Math.PI;
        line.style.left=px+'px';line.style.top=py+'px';line.style.width=dist+'px';line.style.transform=`rotate(${ang}deg)`;
        document.body.appendChild(line);setTimeout(()=>line.remove(),450);
      }
      px=e.clientX;py=e.clientY;
    }
  },{passive:true});

  // Slight parallax: the starspace lags behind page movement while the UI stays stable.
  let ticking=false;
  addEventListener('scroll',()=>{
    if(ticking)return;ticking=true;
    requestAnimationFrame(()=>{layer.style.transform=`translate3d(0,${scrollY*.018}px,0)`;ticking=false});
  },{passive:true});
})();
