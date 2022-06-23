import { signInOpen, signUpOpen } from 'components/Modal/actions'
import PhoneConfirmComponent from 'components/Auth/PhoneConfirm'
import PWRecoveryComponent from 'components/Auth/PWRecovery'
import PWRecoverySucces from 'components/Auth/PWRecovery/Success'
import SignInComponent from 'components/Auth/SignIn'
import SignUpComponent from 'components/Auth/SignUp'

import { useEffect } from 'react'
import { IRootState } from 'types'
import styles from './index.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import Backgrounds from 'components/Backgrounds'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import {getAuthServerSide} from 'utils/auth'
import {setCookie} from 'nookies'
import {CookiesType, RegistrationMode} from 'types/enums'
import { addDays} from 'date-fns'
interface Props {
  user?: any
}

const RegistrationPage = (props: Props) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const key = useSelector((state: IRootState) => state.modal.modalKey)
  useEffect(() => {
    dispatch(signInOpen())
  }, [])

  const router = useRouter()

  const handleAbout = () => {
    cookie.set('signUpMobile', 'no', { expires: 365 * 3 })
    router.push('/')
  }
  return (
    <div className={styles.root}>
      <SignInComponent
        isOpen={key === 'signIn'}
        onClick={handleAbout}
        showAbout
      />
      <SignUpComponent
        isOpen={key === 'signUp'}
        onClick={handleAbout}
        showAbout
      />
      <PhoneConfirmComponent
        isOpen={key === 'phoneConfirm'}
      />
      <PWRecoveryComponent
        isOpen={key === 'pwRecFirst'}/>
      <PWRecoverySucces
        isOpen={key === 'pwRecSuccess'}/>
      <Backgrounds/>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await getAuthServerSide()(ctx as any)

  if((res as any).props.user){
    ctx.res.writeHead(302, { Location: '/me' })
    ctx.res.end()
    return {props: {...res.props}}
  }
  setCookie(ctx, CookiesType.registrationMode, RegistrationMode.User, {expires: addDays(new Date(), 5)})
  return {props: {...res.props}}

}

export default RegistrationPage
