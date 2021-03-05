import 'firebase/messaging'
import firebase from 'firebase/app'
import localforage from 'localforage'

const firebaseCloudMessaging = {
  init: async  () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBZhENNFzCSyFZi7LpeTSfk0K7MNtE4B80",
        authDomain: "masterspages-178c2.firebaseapp.com",
        projectId: "masterspages-178c2",
        storageBucket: "masterspages-178c2.appspot.com",
        messagingSenderId: "714729780771",
        appId: "1:714729780771:web:e86ccdf3c3bccc95942396",
        measurementId: "G-NTF5WWB6HE"
      })

      try {
        const messaging = firebase.messaging()
        const tokenInLocalForage = window.localStorage.getItem('push_token')
        console.log("TokenInStorage", tokenInLocalForage)
        if (tokenInLocalForage !== null) {
          return {token: tokenInLocalForage}
        }
        const status = await Notification.requestPermission()
        if (status && status === 'granted') {
          const fcm_token = await messaging.getToken({
            vapidKey: 'BG_JD4UHfDkDybN9Z9PMi0zVUrMoVySrc3LqEctLETFwdSCYGh7pvLz73r2DjTljQQcFV2I7VgC1H9SDIWOLsuM'
          })
          if (fcm_token) {
            console.log('fcm token', fcm_token)
            return {token: fcm_token, updated: true}
          }
        }
      } catch (error) {
        console.error(error)
        return null
      }
    }
  }
}
export { firebaseCloudMessaging }
