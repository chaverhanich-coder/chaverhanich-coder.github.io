self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',function(e){e.respondWith(caches.open('rd2').then(function(c){return c.match(e.request).then(function(r){var f=fetch(e.request).then(function(res){if(e.request.method==='GET'){c.put(e.request,res.clone());}return res;});return r||f;});}));});
