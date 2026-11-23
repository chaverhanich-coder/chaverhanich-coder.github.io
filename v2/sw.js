self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var req=e.request;
  e.respondWith(new Promise(function(res){
    var done=false;
    function fromCache(){caches.match(req).then(function(c){if(done)return;if(c){done=true;res(c);}});}
    var t=setTimeout(fromCache,3000);
    fetch(req).then(function(r){
      if(done)return;done=true;clearTimeout(t);
      try{var cl=r.clone();caches.open('rd2').then(function(c){c.put(req,cl);});}catch(x){}
      res(r);
    }).catch(function(){
      if(done)return;done=true;clearTimeout(t);
      caches.match(req).then(function(c){res(c||Response.error());});
    });
  }));
});
