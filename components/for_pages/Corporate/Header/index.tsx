import styles from 'components/for_pages/Corporate/Header/index.module.scss'
import Link from 'next/link'
import LangSelect from 'components/LangSelect'
import MainSectionButton from 'components/for_pages/Corporate/Button'
import { useDispatch } from 'react-redux'
import {signInOpen, signUpOpen} from 'components/Modal/actions'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import MenuMobile from 'components/svg/MenuMobile'
import MenuMobileClose from 'components/svg/MenuMobileClose'
import { useRouter } from 'next/router'
import {useAppContext} from "context/state";
import {useAuthContext} from "context/auth_state";


interface Props{
  isRegistration?: boolean
}

const MainSectionHeader = (props: Props) => {
 const isProd =  false
  const authContext = useAuthContext()
  const appContext = useAppContext()
  const dispatch = useDispatch()
  const trans = useTranslation('common')
  const {t} = trans
  const [isMenuMobileOpen, setMenuMobileOpen] = useState(false)
  const router = useRouter()
  const handleOpenMobileMenu = () => {
    if (process.browser) {
      document.body.classList.add('modal-open')
    }

    setMenuMobileOpen(true)
  }

  const handleCloseMobileMenu = () => {
    if (process.browser) {
      document.body.classList.remove('modal-open')
    }
    setMenuMobileOpen(false)
  }

  const handleClick = (href?: string) => {
    document.body.classList.remove('modal-open')
    href && router.push(href)
  }

  return (
    <div  className={styles.root}>
      <div  className={styles.container}>
      <div className={styles.left}>
      <Link href='/'>
        <a className={styles.logo}>
          <img src={'/img/Main/logo_red.svg'}/>
          <div className={styles.logoTitle}>Masters<span> Pages</span></div>
        </a>
      </Link>
      {!props.isRegistration ?
      <div className={styles.btns}>
        <MainSectionButton size={'small'} color='outlineGreen' href='/'>{t('newMainVolunteer.forIndividuals')}</MainSectionButton>
      </div> : null}
      </div>
        <div className={styles.menuMobile}>
          <LangSelect isAuth={false}/>
          {!props.isRegistration ? (!isMenuMobileOpen ? <MenuMobile color='#c4c4c4' onClick={handleOpenMobileMenu}/> : <MenuMobileClose color='#c4c4c4' onClick={handleCloseMobileMenu}/>) : null}
        </div>
        <div className={styles.actions}>
          {props.isRegistration && appContext.isLogged && <div className={styles.actionsButtons}>  <MainSectionButton className={styles.guest} size={'small'} color='outlineRed' onClick={() => authContext.logOut()}>Logout</MainSectionButton>
          </div>}
          <LangSelect isAuth={false}/>
          {!props.isRegistration &&
          <div className={styles.actionsButtons}>
            <MainSectionButton className={styles.guest} size={'small'} color='outlineRed' href='/FindCompanies'>{t('newMainVolunteer.guestAccess')}</MainSectionButton>
            <MainSectionButton size={'small'} color='outlineRed' onClick={() => dispatch(signInOpen())}>{t('auth.signIn.title')}</MainSectionButton>
            <MainSectionButton size={'small'} onClick={() => handleClick('/registration/corporate')}>{t('auth.signUp.title')}</MainSectionButton>
          </div> }
        </div>
      </div>
      {isMenuMobileOpen &&
      <div className={styles.dropdownMobile}>
          <div className={styles.actionsMobile}>
          <div className={styles.actionsButtons}>
            <MainSectionButton size={'small'} color='outlineGreen' onClick={() => handleClick('/')}>{t('newMainVolunteer.forIndividuals')}</MainSectionButton>
            <MainSectionButton size={'small'} color='outlineRed' onClick={() => handleClick('/FindCompanies')}>{t('newMainVolunteer.guestAccess')}</MainSectionButton>
            <MainSectionButton size={'small'} color='outlineRed' onClick={() => dispatch(signInOpen())}>{t('auth.signIn.title')}</MainSectionButton>
            <MainSectionButton size={'small'} onClick={() => handleClick('/registration/corporate')}>{t('auth.signUp.title')}</MainSectionButton>
          </div>
        </div>
      </div>}
    </div>
  )
}
export default MainSectionHeader
