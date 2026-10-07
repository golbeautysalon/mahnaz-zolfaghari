const CACHE='mahnaz-zolfaghari-v5-auto-update';
const ASSETS=['./manifest.webmanifest','./icon-192.png','./icon-512.png','./images/gol-cube.gif','./images/cover.jpg','./images/page01.jpg','./images/page02.jpg','./images/page03.jpg','./images/page04.jpg','./images/page05.jpg','./images/page06.jpg','./images/page07.jpg'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).catch(()=>{}));});
self.addEventListener('activate',event=>{event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()]));});
self.addEventListener('fetch',event=>{
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{const copy=response.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));return response;}).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(fetch(event.request).then(response=>{if(response && response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));}return response;}).catch(()=>caches.match(event.request)));
});
