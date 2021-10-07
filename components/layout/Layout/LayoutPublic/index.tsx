import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import MenuItem from 'components/layout/Layout/components/MenuItem'
import {useTranslation} from 'i18n'
import {default as React, ReactElement, useState} from 'react'
import {IRootState} from 'types'
import Logo from 'components/Logo'


import {useRouter} from 'next/router'
import {logout} from 'components/Auth/actions'
import ModeSelect from 'components/layout/Layout/components/ModeSelect'
import MainSectionButton from 'pages/NewMain/components/Button'
import {signInOpen, signUpOpen} from 'components/Modal/actions'
import Button from 'components/PublicProfile/components/Button'
import LangSelect from 'pages/NewMain/components/Header/components/LangSelect'
import MenuMobile from 'components/svg/MenuMobile'
import MenuMobileClose from 'components/svg/MenuMobileClose'


interface Props {
  children?: ReactElement[] | ReactElement
  title?: ReactElement | string
}

export default function LayoutPublic(props: Props) {
  const {children, title} = props;
  const {route: currentRoute} = useRouter();
  const role = useSelector((state: IRootState) => state.profile.role)
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)

  const {t} = useTranslation('common');
  const dispatch = useDispatch()

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
    <div className={`${styles.root}`}>
      <div  className={styles.header}>
          <div className={styles.logo}>
            <img src={'/img/Main/logo_red.svg'}/>
            <div className={styles.logoTitle}>Masters<span> Pages</span></div>
          </div>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.menuMobile}>
          <LangSelect isAuth={false}/>
          {!isMenuMobileOpen ? <MenuMobile color='#c4c4c4' onClick={handleOpenMobileMenu} className={styles.menuMobileBtn}/> : <MenuMobileClose color='#c4c4c4' onClick={handleCloseMobileMenu}/>}
        </div>
          <div className={styles.actions}>
            <LangSelect isAuth={false}/>
            <div className={styles.actionsButtons}>
              <Button className={styles.actionButton} size={'small'}  onClick={() => dispatch(signInOpen())}>{t('menu.signIn')}</Button>
             <Button className={styles.actionButton} size={'small'} color={'red'} onClick={() => dispatch(signUpOpen())}>{t('menu.signUp')}</Button>
            </div>
          </div>

      </div>
      {isMenuMobileOpen && 
      <div className={styles.dropdownMobile}>
          <div className={styles.actionsMobile}>
          <div className={styles.titleMobile}>
            {title}
          </div>
          <div className={styles.actionsButtons}>
            <Button className={styles.actionButton} size={'small'}  onClick={() => dispatch(signInOpen())}>{t('menu.signIn')}</Button>
             <Button className={styles.actionButton} size={'small'} color={'red'} onClick={() => dispatch(signUpOpen())}>{t('menu.signUp')}</Button>
            </div>
        </div>
      </div>}
      <div className={styles.container}>
        {children}
      </div>
    </div>
  )
}
