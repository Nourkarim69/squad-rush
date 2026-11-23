// Shared helpers for every game: save, coins, top bar, canvas sizing, end-of-game panel.
(function(){
  const K='arcade.';
  function get(k,d){try{const v=localStorage.getItem(K+k);return v==null?d:JSON.parse(v);}catch(e){return d;}}
  function set(k,v){try{localStorage.setItem(K+k,JSON.stringify(v));}catch(e){}}
  const MENU='../index.html';
  const A=window.Arcade={
    get,set,MENU,
    coins(){return get('coins',0);},
    addCoins(n){n=Math.max(0,Math.round(n));set('coins',A.coins()+n);A.refresh();return n;},
    best(id,s){const b=get('best.'+id,0);if(s>b){set('best.'+id,s);return s;}return b;},
    vibrate(ms){try{if(navigator.vibrate)navigator.vibrate(ms);}catch(e){}},
    bar(title){
      const b=document.createElement('div');b.className='topbar';
      b.innerHTML='<a class="ib" href="'+MENU+'" aria-label="Retour au menu">‹</a><div class="t"></div><div class="c" id="arcCoins"></div>';
      b.querySelector('.t').textContent=title;
      document.body.prepend(b);A.refresh();return b;
    },
    barButton(label,onClick,aria){
      const b=document.querySelector('.topbar');const bt=document.createElement('button');
      bt.className='ib';bt.textContent=label;if(aria)bt.setAttribute('aria-label',aria);bt.onclick=onClick;
      b.insertBefore(bt,b.querySelector('.c'));return bt;
    },
    refresh(){const el=document.getElementById('arcCoins');if(el)el.textContent='● '+A.coins();},
    canvas(cv,cb){
      const ctx=cv.getContext('2d');const o={ctx,W:0,H:0,dpr:1};
      let lastW=0,lastH=0;
      function r(fire){
        const d=Math.min(window.devicePixelRatio||1,2);const b=cv.getBoundingClientRect();
        if(fire&&Math.abs(b.width-lastW)<1&&Math.abs(b.height-lastH)<1)return;
        lastW=b.width;lastH=b.height;
        o.W=b.width;o.H=b.height;o.dpr=d;
        cv.width=Math.max(1,Math.round(b.width*d));cv.height=Math.max(1,Math.round(b.height*d));
        ctx.setTransform(d,0,0,d,0,0);if(fire&&cb)cb(o);
      }
      addEventListener('resize',()=>r(true));r(false);return o;
    },
    panel(o){
      let el=document.getElementById('arcOv');
      if(!el){el=document.createElement('div');el.id='arcOv';el.className='ov';document.body.appendChild(el);}
      el.innerHTML='';
      const h=document.createElement('h2');h.textContent=o.title;el.appendChild(h);
      if(o.gain!=null){const g=document.createElement('div');g.className='gain';g.textContent='+'+o.gain+' ●';el.appendChild(g);}
      if(o.text){const p=document.createElement('p');p.textContent=o.text;el.appendChild(p);}
      (o.buttons||[]).forEach((b,i)=>{
        const bt=document.createElement('button');bt.className='btn'+(i?' ghost':'');bt.textContent=b.label;
        bt.onclick=()=>{el.hidden=true;if(b.onClick)b.onClick();};el.appendChild(bt);
      });
      el.hidden=false;
    },
    hidePanel(){const el=document.getElementById('arcOv');if(el)el.hidden=true;},
    toMenu(){location.href=MENU;},
    loop(fn){let last=performance.now();function f(now){const dt=Math.min(0.05,(now-last)/1000);last=now;fn(dt,now/1000);requestAnimationFrame(f);}requestAnimationFrame(f);}
  };
})();
