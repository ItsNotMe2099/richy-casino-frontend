var CACHE_NAME = 'SW'
var toCache = [
]

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js')

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(toCache)
            })
            .then(self.skipWaiting())
    )
})
/*
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        return cache.match(event.request)
                    })
            })
    )
})

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
            .then((keyList) => {
                return Promise.all(keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key)
                    }
                }))
            })
            .then(() => self.clients.claim())
    )
})

 */
