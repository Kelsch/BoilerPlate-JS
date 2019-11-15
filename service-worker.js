// Listen for install event, set callback
self.addEventListener('install', function(event) {
    // Perform some task
    event.waitUntil(
      caches.open('pdinstall-static-v3').then(function(cache) {
        return cache.addAll([
          '/lib/images/icon-192.png',
          '/lib/images/icon-512.png',
          '/lib/style/calendar.css',
          '/lib/style/main.css',
          '/index.html',
          '/'
        ]);
      })
    );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.open('pdinstall-dynamic').then(function(cache) {
//       return cache.match(event.request).then(function (response) {
//         return response || fetch(event.request).then(function(response) {
//           cache.put(event.request, response.clone());
//           return response;
//         });
//       });
//     })
//   );
// });