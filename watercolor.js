(()=>{
 const word=document.querySelector('.name-stage h1');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let x=0,y=0,tx=0,ty=0,frame=0,last=0,paused=false;
 function paint(now){const dt=last?Math.min(now-last,40):16;last=now;const ease=reduced.matches?1:1-Math.exp(-dt/65);x+=(tx-x)*ease;y+=(ty-y)*ease;word.style.setProperty('--x',x+'px');word.style.setProperty('--y',y+'px');if(Math.abs(tx-x)+Math.abs(ty-y)>.2){frame=requestAnimationFrame(paint);}else{frame=0;last=0;}}
 function move(e){if(paused)return;const r=word.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top;if(!word.classList.contains('hovering')){x=tx;y=ty;}word.classList.add('hovering');if(!frame)frame=requestAnimationFrame(paint);}
 function leave(){word.classList.remove('hovering');cancelAnimationFrame(frame);frame=0;last=0;}
 word.addEventListener('pointerenter',move);word.addEventListener('pointermove',move);word.addEventListener('pointerleave',leave);word.addEventListener('pointercancel',leave);window.addEventListener('blur',leave);
})();
