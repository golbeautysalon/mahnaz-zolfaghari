const CACHE="mahnaz-zolfaghari-v3-cover-fixed";const ASSETS=["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./images/gol-cube.gif", "./images/cover.jpg", "./images/page01.jpg", "./images/page02.jpg", "./images/page03.jpg", "./images/page04.jpg", "./images/page05.jpg", "./images/page06.jpg", "./images/page07.jpg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x))))));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const cp=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return resp;}))));
