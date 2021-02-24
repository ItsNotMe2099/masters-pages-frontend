import '../scss/app.scss'
import 'normalize.css'
import { useEffect } from "react";
import nextI18 from "../i18n";
import {wrapper} from 'store'
import { Provider } from 'react-redux';
import App from 'next/app'
import 'slick-carousel/slick/slick.css'
import "slick-carousel/slick/slick-theme.css"
import Head from 'next/head'

import withRedux from 'next-redux-wrapper'

import { useDispatch, useSelector } from 'react-redux'
interface IPageProps {
  namespacesRequired: string[]
}

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}


export default nextI18.appWithTranslation(wrapper.withRedux(MyApp))
