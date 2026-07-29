const CACHE_NAME = "daily-success-cache-v23";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css?v=23",
  "./script.js?v=23",
  "./supabase-config.js?v=23",
  "./cloud-sync.js?v=23",
  "./manifest.json",
  "./icon.svg"
];

self.addEventListener("install", function (event) {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request)
      .then(function (networkResponse) {
        return networkResponse;
      })
      .catch(function () {
        return caches.match(event.request);
      })
  );
});