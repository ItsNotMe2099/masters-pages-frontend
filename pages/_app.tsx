import '../scss/app.scss'
import 'normalize.css'
import { useEffect } from "react";
import nextI18 from "../i18n";
import {store} from 'store'
import { Provider } from 'react-redux';
import App from 'next/app'
import 'slick-carousel/slick/slick.css'
import "slick-carousel/slick/slick-theme.css"
import Head from 'next/head'


import { useDispatch, useSelector } from 'react-redux'
interface IPageProps {
  namespacesRequired: string[]
}

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx, ...rest }) => {
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
