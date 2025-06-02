import React, { useEffect } from 'react';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_REACT_APP_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID,
};

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registrado:', registration);

          if (registration.active) {
            registration.active.postMessage({
              type: 'SET_CONFIG',
              config: firebaseConfig,
            });
          }
        })
        .catch((error) => {
          console.error('Error registrando el Service Worker:', error);
        });
    }
  }, []);

  return (
    <div>
      <h1>Mi app con Firebase Messaging y SW 222233333</h1>
    </div>
  );
}

export default App;
