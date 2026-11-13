(()=>{
 const board=document.querySelector('.terrain-spiral');if(!board)return;
 const cards=[...board.querySelectorAll('.terrain-orbit-card')],reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let frame,start=performance.now(),visible=true;
 // Equal distances along the spiral prevent bunching at the inner turn.
 const samples=[{t:0,length:0}];let total=0,previous={x:.28*Math.cos(-Math.PI*.35),y:.28*Math.sin(-Math.PI*.35)};
 for(let j=1;j<=800;j++){const t=j/800,a=-Math.PI*.35+t*Math.PI*4.1,r=.28+.18*t,q={x:r*Math.cos(a),y:r*Math.sin(a)};total+=Math.hypot(q.x-previous.x,q.y-previous.y);samples.push({t,length:total});previous=q;}
 function position(fraction){const target=fraction*total;let j=1;while(j<samples.length-1&&samples[j].length<target)j++;const a=samples[j-1],b=samples[j];return a.t+(b.t-a.t)*(target-a.length)/(b.length-a.length);}
 function point(t,scale=1,spin=0){const a=-Math.PI*.35+t*Math.PI*4.1+spin,r=(.28+.18*t)*board.clientWidth*scale;return{x:Math.cos(a)*r,y:Math.sin(a)*r,a};}
 function draw(now){const elapsed=now-start;cards.forEach((card,i)=>{const t=reduced.matches?1:Math.max(0,Math.min(1,(elapsed-i*15)/700)),e=1-(1-t)**3,p=point(position(i/(cards.length-1)),1,-(1-e)*Math.PI*1.65);card.style.transform=`translate(-50%,-50%) translate(${p.x}px,${p.y}px) rotate(${p.a*180/Math.PI+90}deg) scale(${.65+e*.35})`;card.classList.toggle('is-front',reduced.matches||elapsed>i*15+570)});if(!reduced.matches&&elapsed<cards.length*15+720)frame=requestAnimationFrame(draw);}
 const path=board.querySelector('.terrain-path path');if(path){let d='';for(let j=0;j<=180;j++){const t=j/180,a=-Math.PI*.35+t*Math.PI*4.1,r=28+18*t;d+=(j?'L':'M')+(50+Math.cos(a)*r).toFixed(2)+' '+(50+Math.sin(a)*r).toFixed(2)+' ';}path.setAttribute('d',d);}
 // Start immediately; scrolling only pauses videos, never hides the spiral.
 draw(performance.now());
 function videos(){board.querySelectorAll('video').forEach(v=>{if(visible&&!document.hidden&&!reduced.matches){v.muted=true;v.play().catch(()=>{});}else v.pause();});}
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;videos();},{threshold:.1}).observe(board);
 addEventListener('resize',()=>{cancelAnimationFrame(frame);start=performance.now()-5000;draw(performance.now());},{passive:true});
 document.addEventListener('visibilitychange',videos);
 board.addEventListener('contextmenu',e=>e.preventDefault());board.addEventListener('dragstart',e=>e.preventDefault());
})();
