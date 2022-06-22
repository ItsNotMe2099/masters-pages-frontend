import {createContext, useContext, useEffect, useState} from 'react'
import {CookiesType, ModalType, SnackbarType} from 'types/enums'
import ReactModal from 'react-modal'
import {SnackbarData} from 'types/types'
import Cookies from 'js-cookie'
import {Subject} from 'rxjs'
import {IProfile, ProfileRole} from 'data/intefaces/IProfile'
import {IUser} from 'data/intefaces/IUser'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import UserRepository from 'data/repositories/UserRepostory'

interface IState {
  isMobile: boolean
  isDesktop: boolean
  isLogged: boolean
  isNotLogged: boolean
  modal: ModalType | null
  modalArguments: any
  loginState$: Subject<boolean>
  snackbar: SnackbarData | null
  user: IUser | null
  profile: IProfile | null,
  role: ProfileRole | null,
  showModal: (type: ModalType, args?: any) => void
  hideModal: () => void
  showSnackbar: (text: string, type: SnackbarType) => void
  updateTokenFromCookies: () => void
  updateUser: (newUser?: IUser) => void
  updateProfile: (role?: ProfileRole, newUser?: IProfile) => void
  updateRole: (role?: ProfileRole) => void
}

const loginState$ = new Subject<boolean>()

const defaultValue: IState = {
  isMobile: false,
  isLogged: false,
  isNotLogged: true,
  isDesktop: true,
  modal: null,
  modalArguments: null,
  snackbar: null,
  user: null,
  profile: null,
  role: null,
  loginState$: loginState$,
  showModal: (type) => null,
  hideModal: () => null,
  showSnackbar: (text, type) => null,
  updateTokenFromCookies: () => null,
  updateUser: () => null,
  updateProfile: () => null,
  updateRole: () => null,
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  isMobile: boolean
  token?: string
  user?: IUser,
  profile?: IProfile,
  role?: ProfileRole
}

export function AppWrapper(props: Props) {
  const [modal, setModal] = useState<ModalType | null>(null)
  const [modalArguments, setModalArguments] = useState<any>(null)
  const [snackbar, setSnackbar] = useState<SnackbarData | null>(null)
  const [token, setToken] = useState<string | null>(props.token ?? null)
  const [user, setUser] = useState<IUser | null>(props.user)
  const [profile, setProfile] = useState<IProfile | null>(props.profile)
  const [role, setRole] = useState<ProfileRole | null>(props.role )
  useEffect(() => {
    setToken(props.token ?? null)
    if (props.token && !user) {
      updateUser()
      updateProfile();
    }
    if (!props.token && user) {
      setUser(null)
    }
  }, [props.token])

  /** update user data from the server or just set them if passed to parameter */
  const updateUser = async (newUser?: IUser) => {
    if (newUser) {
      setUser(newUser)
      return newUser;
    } else {
      const data = await UserRepository.fetchUser()
      if (data) {
        setUser(data)
      }
      return data;
    }
  }

  /** update profile data from the server or just set them if passed to parameter */
  const updateProfile = async (newRole?: ProfileRole, newProfile?: IProfile) => {
    if (newProfile) {
      setProfile(newProfile)
    } else {
      const data = await ProfileRepository.fetchProfile(newRole || role)
      if (data) {
        setProfile(data)
      }
    }
  }


  /** update profile data from the server or just set them if passed to parameter */
  const updateRole = async (role: ProfileRole) => {
    console.log("updateRole", role);
    setRole(role);
    Cookies.set(CookiesType.profileRole, role, {expires: 365})

    updateProfile(role);
  }

  const value: IState = {
    ...defaultValue,
    isLogged: !!token,
    isNotLogged: !token,
    isMobile: props.isMobile,
    isDesktop: !props.isMobile,
    modal,
    modalArguments,
    snackbar,
    user,
    profile,
    role,
    showModal: (type, args?: any) => {
      ReactModal.setAppElement('body')
      setModalArguments(args)
      setModal(type)
    },
    showSnackbar: (text, type: SnackbarType) => {
      setSnackbar({text, type})
      setTimeout(() => {
        setSnackbar(null)
      }, 2000)
    },
    hideModal: () => {
      setModal(null)
    },
    updateTokenFromCookies: async () => {
      const oldToken = token
      const newToken = Cookies.get(CookiesType.accessToken) ?? null
      setToken(newToken)
      if (!oldToken && newToken) {
        loginState$.next(true)
        const newUser = await updateUser()
        const newRole = newUser?.profiles.find(i => i.role === role) ? role : newUser?.profiles[0]?.role
        if (newRole) {
          await updateRole(newRole);
        }

      }
      if (oldToken && !newToken) {
        loginState$.next(false)
      }
    },
    updateUser,
    updateProfile,
    updateRole,
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}