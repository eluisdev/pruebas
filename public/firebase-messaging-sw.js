// /* eslint-env serviceworker */

// importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// let firebaseConfig = null;

// self.addEventListener('message', (event) => {
//   if (event.data && event.data.type === 'SET_CONFIG') {
//     console.log('Config recibida en SW:', event.data.config);
//     firebaseConfig = event.data.config;
    
//     if (!firebase.apps.length && firebaseConfig) {
//       firebase.initializeApp(firebaseConfig);
//       console.log('Firebase inicializado en SW');

//       const messaging = firebase.messaging();

//       messaging.onBackgroundMessage((payload) => {
//         console.log('Mensaje recibido en segundo plano:', payload);

//         const { title, body, icon, click_action } = payload.notification || {};

//         const options = {
//           body,
//           icon: icon || '/icon_192x192.png',
//           data: { url: click_action || '/' },
//           requireInteraction: true,
//         };

//         self.registration.showNotification(title, options);
//       });
//     }
//   }
// });

// self.addEventListener('install', event => {
//   self.skipWaiting();
// });

// self.addEventListener('activate', event => {
//   event.waitUntil(self.clients.claim());
// });

// self.addEventListener('notificationclick', event => {
//   event.notification.close();
//   const url = event.notification.data?.url || '/';
//   event.waitUntil(
//     clients.matchAll({ type: 'window' }).then(windowClients => {
//       const client = windowClients.find(c => c.url === url);
//       if (client) return client.focus();
//       return clients.openWindow(url);
//     })
//   );
// });



const messaging = firebase.messaging();


self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  return self.clients.claim();
});


messaging.onBackgroundMessage((payload) => {

  try {
    if (!payload) {
      throw new Error('Payload indefinido');
    }

    const { data } = payload
    const { title, body, image, url } = data
    const icon = payload.data.icon || '/icon_192x192.png';

    if (!self.registration) {
      throw new Error('self.registration no está disponible');
    }

    if (Notification.permission !== 'granted') {
      throw new Error('Permisos de notificación no concedidos: ' + Notification.permission);
    }

    const notificationOptions = {
      body: body,
      icon: icon,
      tag: 'notification-' + Date.now(),
      vibrate: [100, 50, 100],
      data: { ...(payload.data || {}), url },
      renotify: true,
      requireInteraction: true,
      silent: false
    };

    try {
      const notificationResult = self.registration.showNotification(title, notificationOptions);

      // Verificar si el resultado es una promesa y manejarla
      if (notificationResult && typeof notificationResult.then === 'function') {
        notificationResult
          .then(() => console.log('Notificación mostrada exitosamente (promise)'))
          .catch(error => console.error('Error al mostrar la notificación (promise):', error));
      } else {
        console.log('Notificación lanzada (no promise)');
      }
    } catch (showError) {
      console.error('Error al ejecutar showNotification:', showError);
    }

  } catch (error) {
    console.error('Error al procesar la notificación en segundo plano:', error);
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      const matchingClient = windowClients.find(wc => wc.url === url);

      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(url);
      }
    })
  );
});

// Evento adicional para depuración
self.addEventListener('message', event => {
  console.log('Service Worker recibió mensaje:', event.data);
});