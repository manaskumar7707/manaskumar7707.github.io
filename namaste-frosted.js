
(()=>{
 const root=document.getElementById('namaste-frosted-preview'),word=root.querySelector('h1'),canvas=root.querySelector('canvas'),ctx=canvas.getContext('2d');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const splash=new Image();let started=0,raf=0,w=0,h=0,dpr=1;
 function resize(){const r=word.getBoundingClientRect();w=r.width;h=r.height;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);if(splash.complete&&splash.naturalWidth)draw(performance.now());}
 function draw(now){
  const elapsed=Math.max(0,(now-started)/1000),t=reduced.matches?6:elapsed;
  const cs=getComputedStyle(word);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
  ctx.globalCompositeOperation='source-over';
  const enter=reduced.matches?1:Math.min(1,Math.max(0,(elapsed-1.1)/2.4));
  ctx.globalAlpha=enter*enter*(3-2*enter)*(.79+.17*Math.sin(t*.43));
  ctx.save();ctx.translate(w*(.5+.34*Math.sin(t*.26)),h*(.5+.34*Math.cos(t*.32)));
  ctx.rotate(t*2*Math.PI/45.833333);const size=w*(1.42+.18*Math.sin(t*.19));
  ctx.drawImage(splash,-size/2,-size*.4,size,size*.8);ctx.restore();
  ctx.globalCompositeOperation='destination-in';ctx.globalAlpha=1;
  ctx.font=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;ctx.textBaseline='alphabetic';ctx.fillStyle='#fff';
  const m=ctx.measureText('namaste'),fs=parseFloat(cs.fontSize),line=parseFloat(cs.lineHeight),ascent=m.fontBoundingBoxAscent||fs*.905,descent=m.fontBoundingBoxDescent||fs*.212;
  const baseline=(line-ascent-descent)/2+ascent;let x=0;const tracking=parseFloat(cs.letterSpacing)||0;
  for(const letter of 'namaste'){ctx.fillText(letter,x,baseline);x+=ctx.measureText(letter).width+tracking;}
  ctx.globalCompositeOperation='source-over';
 }
 function loop(now){draw(now);if(!reduced.matches&&!document.hidden)raf=requestAnimationFrame(loop);}
 function start(){cancelAnimationFrame(raf);if(splash.naturalWidth){draw(performance.now());if(!reduced.matches&&!document.hidden)raf=requestAnimationFrame(loop);}}
 splash.onload=()=>{started=performance.now();resize();start()};splash.src='./watercolor.png';new ResizeObserver(resize).observe(word);
 reduced.addEventListener('change',start);document.addEventListener('visibilitychange',start);
 let x=0,y=0,tx=0,ty=0,frame=0,last=0;
 function paint(now){const dt=last?Math.min(now-last,40):16;last=now;const ease=reduced.matches?1:1-Math.exp(-dt/65);x+=(tx-x)*ease;y+=(ty-y)*ease;word.style.setProperty('--x',x+'px');word.style.setProperty('--y',y+'px');if(Math.abs(tx-x)+Math.abs(ty-y)>.2){frame=requestAnimationFrame(paint)}else{frame=0;last=0}}
 function move(e){const r=word.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top;if(!word.classList.contains('hovering')){x=tx;y=ty}word.classList.add('hovering');if(!frame)frame=requestAnimationFrame(paint)}
 function leave(){word.classList.remove('hovering');cancelAnimationFrame(frame);frame=0;last=0}
 word.addEventListener('pointerenter',move);word.addEventListener('pointermove',move);word.addEventListener('pointerleave',leave);word.addEventListener('pointercancel',leave);window.addEventListener('blur',leave);
})();
