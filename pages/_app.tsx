import '../scss/app.scss'
import 'normalize.css'
import {useEffect} from "react";
import { Provider } from 'react-redux'
import {initializeStore, useStore} from 'store'
import 'slick-carousel/slick/slick.css'
import "slick-carousel/slick/slick-theme.css"
import Head from 'next/head'
import {firebaseCloudMessaging} from "../webPush";
const path = require('path');
import {useDispatch, useSelector} from 'react-redux'
import 'firebase/messaging'
import firebase from 'firebase/app'
import {setPushToken} from "../components/Push/actions";
import {appWithTranslation} from 'i18n'
import 'react-date-picker/dist/DatePicker.css'
import {changeRoleNative, fetchProfileSuccess} from 'components/Profile/actions'
import { SWRConfig } from 'swr';
import swrRequest from 'utils/swrRequest';

interface IPageProps {
  namespacesRequired: string[]
}

function Wrapper(props){
  const dispatch = useDispatch();

  useEffect(() => {
    if((window as any)._inited){
      return;
    }

    setToken()

    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init()
        if (token) {
          if (token.updated) {
            dispatch(setPushToken({pushToken: token.token}));
          }
        }
      } catch (error) {
      }
    }
  }, [])

  return  (   <props.Component {...props} />);
}
function MyApp({Component, pageProps}) {

  const store = initializeStore({
    profile: {
        currentProfile: pageProps.currentProfile,
      role: pageProps.mode,
      roleTemp: pageProps.mode,
      formIsSuccess: false,
      formError: '',
      formErrorByKey: {},
      lastFormKey: null,
      formLoading: false,
      loading: false,
      isCompleted: false,
      avatarLoading: false,
      avatarFormError: null,
      showForms: [],
      currentSkill: null
    }
  })
  console.log("SetStore", pageProps.mode);
  return (
    <SWRConfig
      value={{
        fetcher: (url) => swrRequest({ url }),
      }}
    >
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
        <meta name="yandex-verification" content="54be86d1320b5a82" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1285136815270257');
fbq('track', 'PageView');
`,
          }}
        />
        <noscript dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none"
                           src="https://www.facebook.com/tr?id=1285136815270257&ev=PageView&noscript=1"
            />`
        }}/>
      </Head>

      <Provider store={store}>
     <Wrapper Component={Component} {...pageProps}/>
      </Provider>
    </SWRConfig>
  )
}

const domainLocaleMap = {
  'masterspages.com': 'en',
  'masterspages.ru': 'ru',
  // other domains
};


export default appWithTranslation(MyApp)
