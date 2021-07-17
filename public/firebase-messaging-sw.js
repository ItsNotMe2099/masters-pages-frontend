importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDFh7vqPeYpn910SH57WeofWnMXDc8WJGE',
  authDomain: 'fir-cloud-messaging-5543f.firebaseapp.com',
  databaseURL: 'https://fir-cloud-messaging-5543f.firebaseio.com',
  projectId: 'fir-cloud-messaging-5543f',
  storageBucket: 'fir-cloud-messaging-5543f.appspot.com',
  messagingSenderId: '354347614212',
  appId: '1:354347614212:web:7b474a30c18aa6d2b47551',
  measurementId: 'G-L63HMWWX6W'
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  return;
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  }

  return self.registration.showNotification(notificationTitle, notificationOptions)
})
