import '../scss/app.scss'
import 'normalize.css'
import {useEffect} from 'react'
import { Provider } from 'react-redux'
import {initializeStore} from 'store'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Head from 'next/head'
import {firebaseCloudMessaging} from '../webPush'
const path = require('path')
import {useDispatch} from 'react-redux'
import 'firebase/messaging'
import {setPushToken} from '../components/Push/actions'
import { appWithTranslation } from 'next-i18next'
import 'react-date-picker/dist/DatePicker.css'
import { SWRConfig } from 'swr'
import swrRequest from 'utils/swrRequest'
import {AppProps} from 'next/app'

interface IPageProps {
  namespacesRequired: string[]
}

function Wrapper(props){
  const dispatch = useDispatch()

  useEffect(() => {
    if((window as any)._inited){
      return
    }

    setToken()

    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init()
        if (token) {
          if (token.updated) {
            dispatch(setPushToken({pushToken: token.token}))
          }
        }
      } catch (error) {
      }
    }
  }, [])

  return  (   <props.Component {...props} />)
}
function MyApp({Component, pageProps}: AppProps) {

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
  return (
    <SWRConfig
      value={{
        fetcher: (url) => swrRequest({ url }),
      }}
    >
      <Head>
        <meta name="yandex-verification" content="54be86d1320b5a82" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="msapplication-TileColor" content="#2d89ef"/>
        <meta name="theme-color" content="#ffffff"/>
      </Head>

      <Provider store={store}>
        <Wrapper Component={Component} {...pageProps}/>
      </Provider>
    </SWRConfig>
  )
}

export default appWithTranslation(MyApp)
