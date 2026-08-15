/* G2tM — service worker: que la app abra sin internet.
   Si cambiás cualquier archivo del juego, subí el número de CACHE. */

const CACHE = 'g2tm-v3';
const ASSETS = [
  './',
  'index.html',
  'css/styles.css',
  'js/art.js',
  'js/juez.js',
  'js/content.js',
  'js/game.js',
  'icon.svg',
  'icon-app.svg',
  'icon-180.png',
  'icon-192.png',
  'icon-512.png',
  'manifest.webmanifest'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Responde de una con lo guardado y en paralelo busca la versión nueva:
   se abre instantáneo y offline, y la próxima vez ya está actualizado. */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request).then(hit => {
      const red = fetch(e.request).then(res => {
        if (res && res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => hit);
      return hit || red;
    })
  );
});
