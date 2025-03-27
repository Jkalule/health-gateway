const CACHE_NAME = 'health-gateway-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/js/main.bundle.js',
  '/static/css/main.bundle.css',
  '/manifest.json',
  '/favicon.ico',
  '/offline.html'
];

const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== DYNAMIC_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Helper function to determine cache strategy based on request
const getCacheStrategy = (request) => {
  const url = new URL(request.url);
  
  // API requests - Network first
  if (url.pathname.startsWith('/api/')) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }
  
  // Image requests - Cache first
  if (request.destination === 'image') {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }
  
  // HTML requests - Network first
  if (request.mode === 'navigate') {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }
  
  // Other static assets - Stale while revalidate
  return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
};

// Fetch event - handle different caching strategies
self.addEventListener('fetch', (event) => {
  const strategy = getCacheStrategy(event.request);
  
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      event.respondWith(
        caches.match(event.request)
          .then((response) => {
            return response || fetch(event.request).then((fetchResponse) => {
              return caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
              });
            });
          })
          .catch(() => {
            // Return default offline image if it's an image request
            if (event.request.destination === 'image') {
              return caches.match('/images/offline.png');
            }
            return caches.match('/offline.html');
          })
      );
      break;

    case CACHE_STRATEGIES.NETWORK_FIRST:
      event.respondWith(
        fetch(event.request)
          .then((response) => {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(event.request, responseClone);
            });
            return response;
          })
          .catch(() => {
            return caches.match(event.request).then((cacheResponse) => {
              return cacheResponse || caches.match('/offline.html');
            });
          })
      );
      break;

    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      event.respondWith(
        caches.match(event.request).then((cacheResponse) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
            return networkResponse;
          });
          return cacheResponse || fetchPromise;
        })
      );
      break;
  }
});
