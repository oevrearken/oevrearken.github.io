// The app moved (see index.html): this old service worker removes itself.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function () { self.registration.unregister(); });
