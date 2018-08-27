

//Here,we register a serviceWorker
var StaticCacheName="rest-v1";

if(navigator.serviceWorker){
navigator.serviceWorker.register('/ServiceWorker.js').then(function(){
  console.log('ServiceWorker Registration successful!');
}).catch(function(){
  console.log('ServiceWorker Registration failed!');
});
}


self.addEventListener('install',function(event){
  var dataToCache=[
     '/img/1.jpg',
     '/img/2.jpg',
     '/img/3.jpg',
     '/img/4.jpg',
     '/img/5.jpg',
     '/img/6.jpg',
     '/img/7.jpg',
     '/img/8.jpg',
     '/img/9.jpg',
     '/img/10.jpg',
     '/css/styles.css',
     '/data/restaurants.json',
     '/js/dbhelper.js',
     '/js/main.js',
     '/js/restaurant_info.js',
     '/index.html',
     'restaurant.html'
  ];
  event.waitUntil(
   caches.open(StaticCacheName).then(function(cache){
     return cache.addAll(dataToCache);
   })
 );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('rest-') &&
                 cacheName != StaticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});



self.addEventListener('fetch',function(event){
  event.respondWith(
     caches.match(event.request).then(function(response){
       if(response) return response;
       return fetch(event.request);
     })
  );
});
