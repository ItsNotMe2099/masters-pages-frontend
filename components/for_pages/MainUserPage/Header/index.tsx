import styles from 'components/for_pages/MainUserPage/Header/index.module.scss'
import Link from 'next/link'
import LangSelect from 'components/LangSelect'
import MainSectionButton from 'components/for_pages/Corporate/Button'
import { useDispatch } from 'react-redux'
import {signInOpen, signUpOpen} from 'components/Modal/actions'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import MenuMobile from 'components/svg/MenuMobile'
import MenuMobileClose from 'components/svg/MenuMobileClose'


interface Props{

}

const MainSectionHeader = (props: Props) => {
 const isProd =  false
  const dispatch = useDispatch()
  const trans = useTranslation('common')
  const {t} = trans
  const [isMenuMobileOpen, setMenuMobileOpen] = useState(false)
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
      <MainSectionButton size={'small'} color='yellow' href='/corporate' className={styles.org}>{t('newMainVolunteer.forOrganization')}</MainSectionButton>
      </div>
        <div className={styles.menuMobile}>
          <LangSelect isAuth={false}/>
          {!isMenuMobileOpen ? <MenuMobile color='#c4c4c4' onClick={handleOpenMobileMenu}/> : <MenuMobileClose color='#c4c4c4' onClick={handleCloseMobileMenu}/>}
        </div>
        <div className={styles.actions}>
          <LangSelect isAuth={false}/>
          <div className={styles.actionsButtons}>
            <MainSectionButton className={styles.guest} size={'small'} color='outlineRed' href='/guestpage'>{t('newMainVolunteer.guestAccess')}</MainSectionButton>
            <MainSectionButton size={'small'} color='outlineRed' onClick={() => dispatch(signInOpen())}>{t('auth.signIn.title')}</MainSectionButton>
            <MainSectionButton size={'small'} onClick={() => dispatch(signUpOpen())}>{t('auth.signUp.title')}</MainSectionButton>
          </div>
        </div>
      </div>
      {isMenuMobileOpen &&
      <div className={styles.dropdownMobile}>
          <div className={styles.actionsMobile}>
          <div className={styles.actionsButtons}>
            <MainSectionButton size={'small'} color='yellow' href='/corporate'>{t('newMainVolunteer.forOrganization')}</MainSectionButton>
            <MainSectionButton className={styles.guest} size={'small'} color='outlineRed' href='/guestpage'>{t('newMainVolunteer.guestAccess')}</MainSectionButton>
            {!isProd && <MainSectionButton size={'small'} outline={true} onClick={() => dispatch(signInOpen())}>{t('auth.signIn.title')}</MainSectionButton>}
            {!isProd && <MainSectionButton size={'small'} onClick={() => dispatch(signUpOpen())}>{t('auth.signUp.title')}</MainSectionButton>}
          </div>
        </div>
      </div>}
    </div>
  )
}
export default MainSectionHeader
