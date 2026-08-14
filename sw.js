const CACHE="my-budget-v7-budget-fix";
const ASSETS=["./","./index.html","./manifest.json"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 e.respondWith(caches.match(e.request).then(x=>x||fetch(e.request).then(r=>{
  const c=r.clone(); caches.open(CACHE).then(k=>k.put(e.request,c)); return r;
 })));
});
