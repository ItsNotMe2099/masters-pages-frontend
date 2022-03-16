import '../scss/app.scss'
import 'normalize.css'
import {useEffect} from 'react'
import { Provider } from 'react-redux'
import {store} from 'store'
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
import {AppWrapper} from 'context/state'
import {AuthWrapper} from 'context/auth_state'

interface IPageProps {
  namespacesRequired: string[]
}

function MyApp({Component, pageProps}: AppProps) {

  return (
    <Provider store={store}>
    <AppWrapper isMobile={pageProps.isMobile} token={pageProps.token} user={pageProps.user} profile={pageProps.currentProfile} role={pageProps.mode}>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </AppWrapper>
    </Provider>
  )
}

export default appWithTranslation(MyApp)
