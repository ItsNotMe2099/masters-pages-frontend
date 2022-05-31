import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import { useTranslation } from 'next-i18next'
import {default as React, ReactElement, useState} from 'react'
import {IRootState} from 'types'


import {useRouter} from 'next/router'
import {signInOpen, signUpOpen} from 'components/Modal/actions'
import Button from 'components/PublicProfile/components/Button'
import LangSelect from 'components/LangSelect'
import MenuMobile from 'components/svg/MenuMobile'
import MenuMobileClose from 'components/svg/MenuMobileClose'
import Link from 'next/link'


interface Props {
  children?: ReactElement[] | ReactElement
  title?: ReactElement | string
}

export default function LayoutPublic(props: Props) {
  const {children, title} = props
  const {route: currentRoute} = useRouter()

  const {t} = useTranslation('common')
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
        <Link href='/'>
          <a className={styles.logo}>
            <img src={'/img/Main/logo_red.svg'}/>
            <div className={styles.logoTitle}>Masters<span> Pages</span></div>
          </a>
          </Link>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.menuMobile}>
          <LangSelect isAuth={false}/>
          {!isMenuMobileOpen ? <MenuMobile color='#c4c4c4' onClick={handleOpenMobileMenu}/> : <MenuMobileClose color='#c4c4c4' onClick={handleCloseMobileMenu}/>}
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
