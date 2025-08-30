// public/app.js


export async function fetchProducts(){
const r = await fetch('/api/products');
if(!r.ok) throw new Error('No se pudieron cargar los productos');
return r.json();
}


export function currency(v){
return new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'USD' }).format(v);
}


export function qs(sel, ctx=document){ return ctx.querySelector(sel); }
export function qsa(sel, ctx=document){ return Array.from(ctx.querySelectorAll(sel)); }


export function param(name){
const url = new URL(location.href);
return url.searchParams.get(name);
}


export function setActive(viewId){
qsa('.view').forEach(v => v.classList.remove('active'));
const el = qs(`#${viewId}`);
if(el) el.classList.add('active');
}


export function showToast(msg){
let t = qs('#toast');
if(!t){
t = document.createElement('div');
t.id = 'toast';
t.style.position = 'fixed'; t.style.left = '50%'; t.style.transform='translateX(-50%)';
t.style.bottom = '22px'; t.style.zIndex = '50'; t.style.background='var(--card)';
t.style.border='1px solid var(--border)'; t.style.color='var(--text)';
t.style.padding='12px 16px'; t.style.borderRadius='12px';
document.body.appendChild(t);
}
t.textContent = msg; t.style.display='block';
clearTimeout(showToast._t);
showToast._t = setTimeout(()=> t.style.display='none', 2000);
}


// Try-On (llama al backend Node que proxy a GlamAI)
export async function tryOn({ mask_type='overall', media_url, garment_url }){
const r = await fetch('/api/tryon', {
method: 'POST',
headers: { 'content-type': 'application/json' },
body: JSON.stringify({ mask_type, media_url, garment_url })
});
const data = await r.json();
if(!r.ok) throw new Error(data?.error || 'Fallo en try-on');
return data; // la API de GlamAI responde con JSON (p.e. URL resultante)
}