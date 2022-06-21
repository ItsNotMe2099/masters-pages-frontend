import '../scss/app.scss'
import 'normalize.css'
import { Provider } from 'react-redux'
import {store} from 'store'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'firebase/messaging'
import { appWithTranslation } from 'next-i18next'
import 'react-date-picker/dist/DatePicker.css'
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
