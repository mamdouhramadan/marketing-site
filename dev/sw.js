const cacheName = 'Trufla Task';
const staticAssets = [
  './',
  './index.html',
  './about.html',
  './contact.html',
  './css/main.css',
  './css/libs.css',
  './css/tailwind.css',
  './js/main-min.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(staticAssets).catch(function () {
        // If any asset fails (e.g. 404 on GitHub Pages), still activate the SW
      });
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (e) {
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  var url = new URL(req.url);

  if (url.origin !== location.origin) {
    return;
  }

  e.respondWith(
    cacheFirst(req).catch(function () {
      return new Response('', { status: 404, statusText: 'Not Found' });
    })
  );
});

function cacheFirst(req) {
  return caches.open(cacheName).then(function (cache) {
    return cache.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          cache.put(req, res.clone());
        }
        return res;
      });
    });
  });
}
