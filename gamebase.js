var cx = document.querySelector('canvas').getContext('2d'),frameRate=15,sources=[],toload=0,main,keys=[],mouse={},
//sprite drawing (x, y, source, index)
drawSprite=(x,y,s,i)=>{s=sources[s],!s.image||!s.image.complete?0:cx.drawImage(s.image,(i*s.width)%s.image.width,~~(i*s.width/s.image.width)*s.height,s.width,s.height,~~x,~~y,s.width,s.height)},
//animation - class (source, start, length, speed)
Animation=function(s,i,l,f){f=f||1;this.f=0,this.draw=function(x,y){drawSprite(x,y,s,i+~~this.f),this.f=(this.f+f)%l}},
//source
loadSource=(l,s,h,m)=>{sources.push({source:l,width:s,height:h||s}),m=document.createElement('img'),m.index=sources.length-1,m.onload=m.onerror=()=>{toload--,updateLoader()},m.src=sources[m.index].source,sources[m.index].image=m,toload++;return m.index;},
//other
clear=()=>cx.clearRect(0,0,500,300),
//font
font = loadSource('https://maxpelic.github.io/sprites/font.png', 7),text=(string,x,y)=>{const chars='abcdefghijklmnopqrstuvwxyz0123456789!.?',ox=x;string=string.toString().toLowerCase();for(let i=0;i<string.length;i++){if(string[i]=='\n'){y+=7,x=ox;continue;}drawSprite(x,y,font,chars.indexOf(string[i])),x+=6;}},
//loader
updateLoader=()=>{clear(),cx.strokeStyle='#333',cx.strokeRect(200,145,100,10),cx.fillStyle='#030',cx.fillRect(202,147,96*(1-toload/sources.length),6),text('loading...',220,138)};
//frame setup
((f,n,s,t)=>{n=(i)=>{if(toload>0)return t();if(typeof i=='number'){s||(s=i);if(Math.floor((i-s)*frameRate/1000)<=f)return t();f=Math.floor((i-s)*frameRate/1000);}else f++;f>1000?(f=0,typeof i=='number'?s=i:0):0;main&&main(),t()};(t=window.requestAnimationFrame&&frameRate<=60?(()=>window.requestAnimationFrame(n)):()=>window.setTimeout(n, 1000 / frameRate))(),updateLoader()})(0);
//errors
let ed=document.getElementById('errors'),logError=(t,h,c)=>{const s=ed.scrollTop===ed.scrollHeight-ed.offsetHeight;let e = document.createElement('div');c&&(e.className = c),e.textContent=t,h&&(e.innerHTML+=h),ed.appendChild(e),s&&(ed.scrollTop=ed.scrollHeight);return!0};
window.onerror = (e,s,l,c)=>logError(e,'<br><i>Line ' + l + ', Column ' + c + '</i>', 'red')&&0;
console.warn = m=>logError(m,0,'yellow');
console.log = function(){
	logError([].slice.call(arguments).join(', '));
}
//keys
window.addEventListener('keydown', e=>(keys[e.which||e.keyCode]=1)&&e.preventDefault()&&0),
window.addEventListener('keyup', e=>(keys[e.which||e.keyCode]=undefined)||e.preventDefault()&&0),
//mouse
window.addEventListener('mousemove', e=>{mouse.x = e.clientX, mouse.y = e.clientY;return 0;})