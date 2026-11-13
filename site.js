(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var b=$('#burger'),m=$('#menu');
function zamknij(){m.classList.remove('otw');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Otwórz menu');document.body.style.overflow=''}
b.addEventListener('click',function(){var o=!m.classList.contains('otw');m.classList.toggle('otw',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');document.body.style.overflow=o?'hidden':''});
$$('a',m).forEach(function(a){a.addEventListener('click',zamknij)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij()});
var linki=$$('a[href^="#"]',m);
if('IntersectionObserver' in window){
 var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){linki.forEach(function(a){a.toggleAttribute('aria-current',a.getAttribute('href')==='#'+x.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
 ['hero','kroki','uslugi','nieruchomosci','opinie','kontakt'].forEach(function(id){var el=document.getElementById(id);if(el)io.observe(el)});
 var mob=$('#mob'),hero=$('#hero');
 new IntersectionObserver(function(en){var poza=!en[0].isIntersecting;mob.classList.toggle('widac',poza);if(poza&&document.documentElement.classList.contains('ck'))$('#cookies').hidden=false},{threshold:0}).observe(hero);
}
$('#rok').textContent=new Date().getFullYear();
// opinie: przesuwanie palcem, myszą i strzałkami
var tor=$('#op-tor');
function krok(){var f=tor.firstElementChild;return f?f.getBoundingClientRect().width+(parseFloat(getComputedStyle(tor).columnGap)||0):tor.clientWidth}
$$('.op-str button').forEach(function(bt){bt.addEventListener('click',function(){tor.scrollBy({left:krok()*(+bt.dataset.p),behavior:'smooth'})})});
tor.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();tor.scrollBy({left:krok(),behavior:'smooth'})}if(e.key==='ArrowLeft'){e.preventDefault();tor.scrollBy({left:-krok(),behavior:'smooth'})}});
var x0=0,s0=0,ciag=false;
tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;ciag=true;x0=e.clientX;s0=tor.scrollLeft;tor.classList.add('ciag');tor.setPointerCapture(e.pointerId)});
tor.addEventListener('pointermove',function(e){if(ciag)tor.scrollLeft=s0-(e.clientX-x0)});
function stop(e){if(!ciag)return;ciag=false;var k=krok(),dx=e.clientX-x0,n=Math.round(s0/k)+(dx<-40?1:dx>40?-1:0);tor.classList.remove('ciag');tor.scrollTo({left:Math.max(0,n)*k,behavior:'smooth'})}
tor.addEventListener('pointerup',stop);tor.addEventListener('pointercancel',stop);
// formularz pokazowy
$('#zapytanie').addEventListener('submit',function(e){e.preventDefault();$('#info-form').textContent='To podgląd strony: formularz nie wysyła jeszcze wiadomości.'});
// mapa i zgody
function mapa(){var el=$('#mapa');if(el.dataset.ok)return;el.dataset.ok=1;el.insertAdjacentHTML('beforeend','<iframe title="Mapa dojazdu: Avenida Escandinavia 3, Gran Alacant" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Avenida+Escandinavia+3,+03130+Gran+Alacant&z=15&output=embed"></iframe>')}
$('#pokaz-mape').addEventListener('click',mapa);
var zg=null;try{zg=localStorage.getItem('cs-zgoda')}catch(e){}
if(zg==='1'&&'IntersectionObserver' in window){new IntersectionObserver(function(en,o){if(en[0].isIntersecting){mapa();o.disconnect()}},{rootMargin:'300px'}).observe($('#mapa'))}
$$('#cookies button').forEach(function(bt){bt.addEventListener('click',function(){try{localStorage.setItem('cs-zgoda',bt.dataset.c)}catch(e){}$('#cookies').hidden=true;document.documentElement.classList.remove('ck');if(bt.dataset.c==='1')mapa()})});
})();
