// ================================================================
// service-worker.js - PWA Offline-First Engine & Intelligent Caching
// شركة نجوم دلتا للتجارة (Delta Stars Trading Co.)
// ================================================================

const CACHE_VERSION = 'v14-delta-stars-icons-fixed';
const CACHE_STATIC_NAME = `delta-stars-static-${CACHE_VERSION}`;
const CACHE_DYNAMIC_NAME = `delta-stars-dynamic-${CACHE_VERSION}`;
const CACHE_IMAGES_NAME = `delta-stars-images-${CACHE_VERSION}`;
const CACHE_API_NAME = `delta-stars-api-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/official_logo.png',
  '/icon-192.png',
  '/icon-512.png',
  '/favicon.svg',
  '/version.json'
];

// Install: Pre-cache critical app shell only (no stale HTML)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      console.log('📦 [SW] Pre-caching app shell...');
      return Promise.allSettled(
        PRECACHE_URLS.map((url) => cache.add(url))
      );
    })
  );
  self.skipWaiting();
});

// Activate: Delete ALL old caches aggressively
self.addEventListener('activate', (event) => {
  const currentCaches = [
    CACHE_STATIC_NAME,
    CACHE_DYNAMIC_NAME,
    CACHE_IMAGES_NAME,
    CACHE_API_NAME
  ];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !currentCaches.includes(name))
          .map((name) => {
            console.log('🗑️ [SW] Removing obsolete cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

// Message handling for instant SW updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Main Fetch Strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1. Navigation Requests: Network-First (never serve stale HTML)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            // Cache a fresh copy but always serve network version first
            const responseClone = networkResponse.clone();
            caches.open(CACHE_STATIC_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // Only use cache as absolute last resort (never offline.html for SPA)
          return caches.match('/index.html');
        })
    );
    return;
  }

  // 2. JS/CSS assets: Cache-First with background update (assets are hashed, so cache is safe)
  if (url.pathname.includes('/assets/') || request.destination === 'script' || request.destination === 'style') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_DYNAMIC_NAME).then((cache) => cache.put(request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. Images: Cache-First with stale-while-revalidate
  const isImage = 
    request.destination === 'image' ||
    url.pathname.match(/\.(png|jpg|jpeg|svg|webp|gif|ico)$/i) ||
    url.hostname.includes('unsplash.com') ||
    url.hostname.includes('lh3.googleusercontent.com');

  if (isImage) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_IMAGES_NAME).then((cache) => cache.put(request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 4. API: Network-First with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_API_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return new Response(
              JSON.stringify({ offline: true, message: 'محتوى مخزن مؤقتاً أثناء انقطاع الاتصال' }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          });
        })
    );
    return;
  }

  // 5. Everything else (fonts, etc.): Network-First
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_DYNAMIC_NAME).then((cache) => cache.put(request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
  }
});
