import {parseCookies} from 'nookies'
import {CookiesType, RegistrationMode} from 'types/enums'

const Home = (props) => {
  return null
}
export const getServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx)
  switch (cookies[CookiesType.registrationMode]){
    case RegistrationMode.Corporate:
      return {
        redirect: {
          destination: '/registration/corporate',
          permanent: false,
        },
      }
    case RegistrationMode.User:
    default:
      return {
        redirect: {
          destination: '/registration/user',
          permanent: false,
        },
      }
  }

}
export default Home
