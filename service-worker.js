/* global self, caches, fetch */
/* eslint-disable no-restricted-globals */

const CACHE = 'cache-f3a3157';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./petrolejove_lampy_001.html","./petrolejove_lampy_002.html","./petrolejove_lampy_007.html","./petrolejove_lampy_008.html","./petrolejove_lampy_009.html","./petrolejove_lampy_010.html","./petrolejove_lampy_011.html","./petrolejove_lampy_012.html","./petrolejove_lampy_013.html","./petrolejove_lampy_014.html","./petrolejove_lampy_015.html","./petrolejove_lampy_016.html","./petrolejove_lampy_017.html","./petrolejove_lampy_018.html","./petrolejove_lampy_019.html","./petrolejove_lampy_020.html","./petrolejove_lampy_021.html","./petrolejove_lampy_022.html","./petrolejove_lampy_023.html","./petrolejove_lampy_024.html","./petrolejove_lampy_025.html","./petrolejove_lampy_026.html","./petrolejove_lampy_027.html","./petrolejove_lampy_028.html","./petrolejove_lampy_029.html","./petrolejove_lampy_030.html","./petrolejove_lampy_031.html","./petrolejove_lampy_032.html","./petrolejove_lampy_033.html","./petrolejove_lampy_034.html","./petrolejove_lampy_035.html","./petrolejove_lampy_036.html","./petrolejove_lampy_037.html","./petrolejove_lampy_038.html","./petrolejove_lampy_039.html","./petrolejove_lampy_040.html","./petrolejove_lampy_041.html","./petrolejove_lampy_042.html","./petrolejove_lampy_043.html","./petrolejove_lampy_044.html","./petrolejove_lampy_045.html","./petrolejove_lampy_046.html","./petrolejove_lampy_047.html","./petrolejove_lampy_048.html","./petrolejove_lampy_049.html","./petrolejove_lampy_050.html","./petrolejove_lampy_051.html","./petrolejove_lampy_052.html","./petrolejove_lampy_053.html","./petrolejove_lampy_054.html","./petrolejove_lampy_055.html","./petrolejove_lampy_056.html","./petrolejove_lampy_057.html","./petrolejove_lampy_058.html","./petrolejove_lampy_059.html","./petrolejove_lampy_060.html","./petrolejove_lampy_061.html","./petrolejove_lampy_062.html","./petrolejove_lampy_063.html","./petrolejove_lampy_064.html","./petrolejove_lampy_065.html","./petrolejove_lampy_066.html","./petrolejove_lampy_067.html","./petrolejove_lampy_068.html","./petrolejove_lampy_069.html","./petrolejove_lampy_070.html","./petrolejove_lampy_071.html","./petrolejove_lampy_072.html","./resources.html","./resources/image001.jpg","./resources/image002.jpg","./resources/index.xml","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
