import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import Link from 'next/link'
import LangSelect from 'components/LangSelect'
import MainSectionButton from 'pages/NewMain/components/Button'
import { useSelector, useDispatch } from 'react-redux'
import {signInOpen, signUpOpen} from 'components/Modal/actions'
import {useTranslation} from 'i18n'
import Button from "components/ui/Button";
import { useState } from "react";
import MenuMobile from "components/svg/MenuMobile";
import MenuMobileClose from "components/svg/MenuMobileClose";


interface Props{

}

const MainSectionHeader = (props: Props) => {
 const isProd =  false;
  const dispatch = useDispatch()
  const trans = useTranslation('common');
  const {t} = trans;
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
        <div className={styles.logo}>
          <img src={'/img/Main/logo_red.svg'}/>
          <div className={styles.logoTitle}>Masters<span> Pages</span></div>
        </div>
        <div className={styles.menuMobile}>
          <LangSelect isAuth={false}/>
          {!isMenuMobileOpen ? <MenuMobile color='#c4c4c4' onClick={handleOpenMobileMenu}/> : <MenuMobileClose color='#c4c4c4' onClick={handleCloseMobileMenu}/>}
        </div>
        <div className={styles.actions}>
          <LangSelect isAuth={false}/>
          <div className={styles.actionsButtons}>
            {!isProd && <MainSectionButton size={'small'} outline={true} onClick={() => dispatch(signInOpen())}>{t('auth.signIn.title')}</MainSectionButton>}
            {!isProd && <MainSectionButton size={'small'} onClick={() => dispatch(signUpOpen())}>{t('auth.signUp.title')}</MainSectionButton>}
          </div>
        </div>
      </div>
      {isMenuMobileOpen && 
      <div className={styles.dropdownMobile}>
          <div className={styles.actionsMobile}>
          <div className={styles.actionsButtons}>
            {!isProd && <MainSectionButton size={'small'} outline={true} onClick={() => dispatch(signInOpen())}>{t('auth.signIn.title')}</MainSectionButton>}
            {!isProd && <MainSectionButton size={'small'} onClick={() => dispatch(signUpOpen())}>{t('auth.signUp.title')}</MainSectionButton>}
          </div>
        </div>
      </div>}
    </div>
  )
}
export default MainSectionHeader
