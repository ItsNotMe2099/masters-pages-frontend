import '../scss/app.scss'
import 'normalize.css'
import { Provider } from 'react-redux'
import {store} from 'store'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'firebase/messaging'
import { appWithTranslation } from 'next-i18next'
import 'react-date-picker/dist/DatePicker.css'
import {AppProps, AppContext} from 'next/app'
import App from 'next/app'
import {AppWrapper} from 'context/state'
import {AuthWrapper} from 'context/auth_state'
import { getSelectorsByUserAgent } from 'react-device-detect'
import Head from 'next/head'

interface IPageProps {
  namespacesRequired: string[]
}


function MyApp({Component, pageProps}: AppProps) {


  return (
    <Provider store={store}>
    <AppWrapper isMobile={pageProps.isMobile} token={pageProps.token} user={pageProps.user} profile={pageProps.currentProfile} role={pageProps.mode}>
      <AuthWrapper>
        <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/> 
        </Head>
        <Component {...pageProps} />
      </AuthWrapper>
    </AppWrapper>
    </Provider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const props = await App.getInitialProps(appContext)
  const ua = appContext.ctx.req ? appContext.ctx.req?.headers['user-agent'] : navigator.userAgent

  if (ua) {
    const { isMobile } = getSelectorsByUserAgent(ua)
    props.pageProps.isMobile = isMobile
  }
  else {
    props.pageProps.isMobile = false
  }
  return props
}

export default appWithTranslation(MyApp)
