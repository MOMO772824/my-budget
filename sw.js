const CACHE="my-budget-v8-20260814";
const ASSETS=["./","./index.html","./manifest.json"];
self.addEventListener("install",e=>e.waitUntil((async()=>{await caches.open(CACHE).then(c=>c.addAll(ASSETS));self.skipWaiting();})()));
self.addEventListener("activate",e=>e.waitUntil((async()=>{for(const k of await caches.keys()){if(k!==CACHE)await caches.delete(k)}await self.clients.claim();})()));
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 e.respondWith(caches.match(e.request).then(x=>x||fetch(e.request).then(r=>{
  const c=r.clone(); caches.open(CACHE).then(k=>k.put(e.request,c)); return r;
 })));
});
