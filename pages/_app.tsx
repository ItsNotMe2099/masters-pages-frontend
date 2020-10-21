import '../scss/app.scss'
import 'normalize.css'
import {store} from 'store'
import { Provider } from 'react-redux';
import 'slick-carousel/slick/slick.css'
import "slick-carousel/slick/slick-theme.css"

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
