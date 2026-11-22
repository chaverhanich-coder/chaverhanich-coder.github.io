self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',function(e){
  e.respondWith(
    fetch(e.request).then(function(res){
      if(e.request.method==='GET'){var cl=res.clone();caches.open('rd2').then(function(c){c.put(e.request,cl);});}
      return res;
    }).catch(function(){
      return caches.match(e.request);
    })
  );
});
