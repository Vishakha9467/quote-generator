self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('quote-generator').then((cache) => {
            return cache.addAll([
                '/',
                '/static/css/style.css',
                '/static/js/script.js',
                '/templates/index.html',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});