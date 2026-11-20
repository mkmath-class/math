/* 이민기T 알림 서비스워커 (Firebase Cloud Messaging) */
importScripts('fb-config.js');
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (L) {
    for (var i = 0; i < L.length; i++) if (L[i].url.indexOf('/math/') >= 0 && 'focus' in L[i]) return L[i].focus();
    return clients.openWindow(url);
  }));
});
if (self.FB_CFG && self.FB_CFG.apiKey) {
  importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
                'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
  firebase.initializeApp(self.FB_CFG);
  firebase.messaging().onBackgroundMessage(function (p) {
    var d = p.data || {};
    return self.registration.showNotification(d.title || '이민기T', {
      body: d.body || '', icon: 'icon-192.png', badge: 'icon-192.png', data: { url: d.url || './' }
    });
  });
}
