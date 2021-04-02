import '../scss/app.scss'
import 'normalize.css'
import {useEffect} from "react";
import nextI18 from "../i18n";
import {wrapper} from 'store'
import 'slick-carousel/slick/slick.css'
import "slick-carousel/slick/slick-theme.css"
import Head from 'next/head'
import {firebaseCloudMessaging} from "../webPush";

import {useDispatch, useSelector} from 'react-redux'
import 'firebase/messaging'
import firebase from 'firebase/app'
import {setPushToken} from "../components/Push/actions";

interface IPageProps {
  namespacesRequired: string[]
}

function MyApp({Component, pageProps}) {
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
          if (token.updated) {
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
        <meta name="viewport" content="width=1020, user-scalable=yes"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d55b5b"/>
        <meta name="msapplication-TileColor" content="#2d89ef"/>
        <meta name="theme-color" content="#ffffff"/>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=[Tracking ID]"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(75081823, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
        `,
          }}
        />
        <noscript dangerouslySetInnerHTML={{
          __html: `<div><img src="https://mc.yandex.ru/watch/75081823" style="position:absolute; left:-9999px;" alt="" /></div>`
        }}/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}


export default nextI18.appWithTranslation(wrapper.withRedux(MyApp))
