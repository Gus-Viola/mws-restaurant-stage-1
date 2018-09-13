const date = new Date();
let timestamp = date.getTime();
let persistantCacheName = 'restaurant-reviews-cache' + timestamp.toString();

//Gus Viola: code inspired by the Wittr Udacity project
self.addEventListener('install', event => {

  const cacheableURLs = [
    '/',
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js'
  ];

  event.waitUntil(
    caches.open(persistantCacheName)
    .then(cache => {
      return cache.addAll(cacheableURLs);
    }) //then
  ); //waitUntil
}); //addEventListener



self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      return response || fetch(event.request);
    })
    .catch(error => console.log(error, event.request))
  ); //respondWith
}); //addEventListener


self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(allCacheNames => {
      return Promise.all(
        allCacheNames.filter(cacheName => {
          return cacheName.startsWith('restaurant-reviews-cache') &&
            cacheName != persistantCacheName;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      ); //Promise.all
    }) //then
    // self.clients.claim()
  ); //waitUntil
}); //addEventListener
