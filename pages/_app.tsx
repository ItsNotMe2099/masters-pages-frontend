import '../scss/app.scss'
import 'normalize.css'
import { useEffect } from "react";
import nextI18 from "../i18n";
import {wrapper} from 'store'
import 'slick-carousel/slick/slick.css'
import "slick-carousel/slick/slick-theme.css"
import Head from 'next/head'
import {firebaseCloudMessaging} from "../webPush";

import { useDispatch, useSelector } from 'react-redux'
import 'firebase/messaging'
import firebase from 'firebase/app'
import {setPushToken} from "../components/Push/actions";

interface IPageProps {
  namespacesRequired: string[]
}

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  useEffect(() => {
    setToken()
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => console.log('event for the service worker', event))
    }
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init()
        if (token) {
          if(token.updated){
            dispatch(setPushToken({pushToken: token.token}));
          }
          console.log('FCMTOken', token)
          // not working
          getMessage()
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

  function getMessage() {
    console.log('message functions')
    const messaging = firebase.messaging()
    messaging.onMessage((message) => console.log('foreground', message))
  }

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
        <meta name="yandex-verification" content="9fe3d44c10bbf04a" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}


export default nextI18.appWithTranslation(wrapper.withRedux(MyApp))
