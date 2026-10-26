/*
 * Service worker for the Køkken launcher: shows push notifications sent by the app
 * (Apps Script → Push.gs) and opens the app when one is tapped.
 */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('push', function (e) {
  var msg = { title: 'Køkken', body: 'Du har en ny påmindelse.' };
  try { if (e.data) msg = e.data.json(); } catch (err) {}
  e.waitUntil(self.registration.showNotification(msg.title || 'Køkken', {
    body: msg.body || '',
    tag: msg.tag || undefined,
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    data: { url: msg.url || './' }
  }));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) if ('focus' in list[i]) return list[i].focus();
    return self.clients.openWindow(url);
  }));
});
