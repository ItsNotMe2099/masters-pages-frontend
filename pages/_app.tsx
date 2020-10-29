import '../scss/app.scss'
import 'normalize.css'
import nextI18 from "../i18n";
import {store} from 'store'
import { Provider } from 'react-redux';
import App from 'next/app'
import 'slick-carousel/slick/slick.css'
import "slick-carousel/slick/slick-theme.css"


interface IPageProps {
  namespacesRequired: string[]
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps: IPageProps = {
    namespacesRequired: [],
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  pageProps.namespacesRequired = ['common']

  return { pageProps }
}

export default nextI18.appWithTranslation(MyApp)
