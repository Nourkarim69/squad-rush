// Offline cache: serve from cache, refresh in the background.
const VERSION = 'arcade-v5';
const FILES = [
  './', './index.html', './manifest.webmanifest',
  './shared/common.css', './shared/common.js',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png',
  './games/squad-rush.html', './games/hole.html', './games/sort.html', './games/helix.html',
  './games/merge.html', './games/blocks.html', './games/knife.html', './games/stack.html',
  './games/tycoon.html', './games/defense.html'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open(VERSION).then(async cache => {
      const hit = await cache.match(e.request, { ignoreSearch: true });
      const net = fetch(e.request).then(r => {
        if (r && r.ok && new URL(e.request.url).origin === location.origin) cache.put(e.request, r.clone());
        return r;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
