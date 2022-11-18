import {createContext, useContext, useState} from 'react'
import {useAppContext} from 'context/state'
import {CookiesType, SnackbarType} from 'types/enums'
import useInterval from 'use-interval'
import Cookies from 'js-cookie'
import {AuthLoginFormData, AuthRegisterFormData, IPhoneConfirmResponse} from 'data/intefaces/IAuth'
import AuthRepository from 'data/repositories/AuthRepository'
import {useDispatch} from 'react-redux'
import {modalClose, phoneConfirmOpen} from 'components/Modal/actions'
import Router, {useRouter} from 'next/router'
import {reachGoal} from 'utils/ymetrika'

interface IState {
  error: string | null
  loginSpinner: boolean
  signUpSpinner: boolean
  againSpinner: boolean
  confirmSpinner: boolean
  codeRes: IPhoneConfirmResponse | null
  signUpFormData: AuthRegisterFormData | null
  remainSec: number
  isOk: boolean
  setSignUpFormData: (value: AuthRegisterFormData) => void
  signUp: (values: AuthRegisterFormData) => void
  login: (values: AuthLoginFormData) => void
  sendCodeAgain: () => void
  confirmCode: (code: string) => Promise<boolean>
  setSending: (value: boolean) => void
  setSendingAgain: (value: boolean) => void
  logOut: () => void
  clear: () => void
}

const defaultValue: IState = {
  error: null,
  loginSpinner: false,
  signUpSpinner: false,
  confirmSpinner: false,
  againSpinner: false,
  confirmCode: async (code: string) => false,
  setSending: (value: boolean) => null,
  codeRes: null,
  signUpFormData: null,
  setSignUpFormData: (values) => null,
  signUp: (values) => null,
  login: (values) => null,
  remainSec: 0,
  isOk: false,
  sendCodeAgain: () => null,
  setSendingAgain: (value) => null,
  logOut: () => null,
  clear: () => null,
}

const AuthContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function AuthWrapper(props: Props) {
  const appContext = useAppContext()
  const dispatch = useDispatch();
  const router = useRouter();
  const [signUpSpinner, setSignUpSpinner] = useState(false)
  const [confirmSpinner, setConfirmSpinner] = useState(false)
  const [againSpinner, setAgainSpinner] = useState(false)
  const [loginSpinner, setLoginSpinner] = useState(false)
  const [signUpFormData, setSignUpFormData] = useState<AuthRegisterFormData | null>(null)
  const [codeRes, setCodRes] = useState<IPhoneConfirmResponse | null>(null)
  const [remainSec, setRemainSec] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isOk, setIsOk] = useState<boolean>(false)


  useInterval(() => {
    if (remainSec > 0) {
      setRemainSec(remainSec - 1)
    }
  }, 1000)
  const setToken = (token: string) => {
    Cookies.set(CookiesType.accessToken, token, {expires: 365})

  }
   const afterAuthRedirect = () => {
    if((router.query.redirect as string) ){
      window.location.href = (Router.query.redirect as string) ;
    }else{
     router.push('/me')
    }
  }
  //Login
  const login = async (values: AuthLoginFormData) => {
    setError(null);
    setLoginSpinner(true)

    try {
      const res = await AuthRepository.login(values)
      reachGoal('auth:login:login')
      setToken(res.accessToken);
      setConfirmSpinner(false)
      dispatch(modalClose());
      await appContext.updateTokenFromCookies()
      afterAuthRedirect();
    }catch (e){
      setError(e);
    }
    setLoginSpinner(false)

  }
  // Sign up step 1
  const passwordForgot = async (values: AuthRegisterFormData) => {
    setError(null);
    setSignUpSpinner(true)
    setSignUpFormData(values)
    const isOk = await sendCodeToEmail(values.email)
    reachGoal('auth:signup:phone')
    setSignUpSpinner(false)
    if (isOk) {
      dispatch(phoneConfirmOpen())
    }
  }

  // Sign up step 1
  const signUp = async (values: AuthRegisterFormData) => {
    setError(null);
    setSignUpSpinner(true)
    setSignUpFormData(values)
    const isOk = await sendCodeToEmail(values.email)
    reachGoal('auth:signup:phone')
    setSignUpSpinner(false)
    if (isOk) {
      //dispatch(phoneConfirmOpen())
      setIsOk(true)
    }
  }
// Sign up step 2
  const confirmCode = async (code: string): Promise<boolean> => {
    setError(null);
    setConfirmSpinner(true)
    try {
      const resConfirm = await AuthRepository.phoneConfirmation({code, email: signUpFormData?.email});
      console.log("resConfirm", resConfirm)
      const accessToken = resConfirm.accessToken

      if (!accessToken) {
        appContext.showSnackbar('Token error', SnackbarType.error)
        setConfirmSpinner(false)
        return false
      }
      reachGoal('auth:phone:confirmed')
      console.log("PhoneConfirmed");
      setToken(resConfirm.accessToken);
      setConfirmSpinner(false)
      dispatch(modalClose());
      appContext.updateTokenFromCookies()
      console.log("Redirect");
      await router.push('/registration');
    }catch (e){
      setConfirmSpinner(false)
      setError(e);
      return false;
    }
    return true
  }

  const sendCodeToEmail = async (email: string): Promise<boolean> => {
    try {
      setError(null);
      const res = await AuthRepository.register({email})

      setCodRes(res)
      setRemainSec(res.codeCanRetryIn ?? 0)
    }catch (e){
      appContext.showSnackbar(e, SnackbarType.error)
      setError(e);
      return false
    }


    return true
  }

  const sendCodeAgain = async () => {
    setAgainSpinner(true)
    if (signUpFormData?.email) {
      await sendCodeToEmail(signUpFormData?.email)
    }
    appContext.showSnackbar('code sent', SnackbarType.success)
    setAgainSpinner(false)
  }

  const logOut = () => {
    Cookies.remove(CookiesType.accessToken)
    Cookies.remove(CookiesType.profileRole);
    appContext.updateTokenFromCookies()
    router.replace('/')

  }

  const clear = () => {
    setError(null);
    setSignUpFormData(null)
    setCodRes(null)
  }

  const value: IState = {
    ...defaultValue,
    error,
    confirmCode,
    loginSpinner,
    signUpSpinner,
    codeRes,
    signUp,
    login,
    signUpFormData,
    remainSec,
    sendCodeAgain,
    againSpinner,
    confirmSpinner,
    logOut,
    clear,
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
