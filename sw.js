const CACHE_NAME = 'plan-de-centro-v1.0.0';
const urlsToCache = [
  '/PlanDeCentro/',
  '/PlanDeCentro/index.html',
  '/PlanDeCentro/manifest.json',
  // Agrega aquí otros recursos si los tienes (CSS, JS, imágenes)
];

// Instalación
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación y limpieza de cachés antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia: Cache First, luego Network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve la respuesta cacheada o busca en la red
        return response || fetch(event.request);
      }
    )
  );
});