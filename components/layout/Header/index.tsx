import { LangSelect } from "components/layout/Header/components/LangSelect";
import ModeSelect from "components/layout/Header/components/ModeSelect";
import ProfileSelect from "components/layout/Header/components/ProfileSelect";
import Modals from "components/layout/Modals";
import MenuMobile from "components/svg/MenuMobile";
import MenuMobileClose from "components/svg/MenuMobileClose";
import Socials from "components/ui/Socials";
import {useTranslation, withTranslation} from "i18n";
import styles from './index.module.scss'
import Link from 'next/link'
import { default as React, useState } from 'react'
import Logo from 'components/Logo'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import {
  signInOpen,
  signUpOpen,
} from 'components/Modal/actions'


interface Props {

}

const Header = (props) => {
  const { t } = useTranslation('common');
  const isRegistrationCompleted = props.user?.isRegistrationCompleted;
  const [isMenuMobileOpen, setMenuMobileOpen] = useState(false);
  const role = useSelector((state: IRootState) => state.profile.role)
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)

  const handleOpenMobileMenu = () => {
    if (process.browser) {
      document.body.classList.add('modal-open');
    }

    setMenuMobileOpen(true);}
  const handleCloseMobileMenu = () => {
    if (process.browser) {
      document.body.classList.remove('modal-open');
    }
    setMenuMobileOpen(false);
  }
  const [isAuth, setAuth] = useState(props.user ? true : false)
  const dispatch = useDispatch()

  const getRoleName = (role) => {
      switch (role) {
        case 'master':
          return 'Master mode';
        case 'volunteer':
          return 'Volunteer mode';
        default:
          return 'Client mode';
      }
  }
  const renderMenu = (isMobile) => {

    return      (<ul className={isMobile ? styles.menuMobile : styles.menu}>
      <li className={styles.active}><Link href="/">{t('menu.home')}</Link></li>
      <li><Link href="/CreateTaskPage">{t('menu.createTask')}</Link></li>
      <li><Link href="/SearchTaskPage">{t('menu.findTask')}</Link></li>
      <li><Link href="/SearchMasterPage">{t('menu.masters')}</Link></li>
      <li><Link href="/SearchVolunteerPage">{t('menu.volunteers')}</Link></li>
      <li><Link href="/">{t('menu.faq')}</Link></li>

    </ul>)
  }
  return (
    <div className={styles.rootWrapper}>

      <header className={`${!isMenuMobileOpen ? styles.root : styles.root__open} ${(isAuth &&isRegistrationCompleted)  && styles.rootAuth} ${role === 'client' && styles.rootClient} ${role === 'master' && styles.rootMaster} ${role === 'volunteer' && styles.rootVolunteer}`}>
        <div className={styles.menuDesktop}>
          <div className={styles.logo}>
            <Logo color={isAuth && isRegistrationCompleted ? 'white': null}/>
          </div>
          {renderMenu(false)}
          <div className={styles.right}>
            <LangSelect isAuth={isAuth}/>
            <div className={styles.separatorLine}></div>
            {!isAuth &&
              <div className={styles.actionsContainer}>
                <a className={styles.signIn} onClick={() => dispatch(signInOpen())}>
                  <span>{t('menu.signIn')}</span>
                  <img src='/img/icons/signIn.svg' alt=''/>
                </a>
                <div className={styles.separatorLine}></div>
                <a className={styles.signUp} onClick={() => dispatch(signUpOpen())}>
                  <span>{t('menu.signUp')}</span>
                  <img src='/img/icons/signUp.svg' alt=''/>
                </a>
              </div>
            }
            {(isAuth && isRegistrationCompleted)   && <ModeSelect/>}
            {(isAuth  && isRegistrationCompleted)   && <div className={styles.separatorLine}></div>}
            {(isAuth && isRegistrationCompleted) &&  <ProfileSelect/>}
            {isAuth && !isRegistrationCompleted && <Link href={'/RegistrationPage'}><div className={styles.completeRegistration}>{t('menu.completeRegistration')}</div></Link>}
          </div>
        </div>

        <div className={styles.headerMobile}>

          {(isAuth && isMenuMobileOpen && profile) && <div className={styles.user}><ProfileSelect/></div>}

          {((isAuth && !isMenuMobileOpen) || !isAuth) && <Logo color={isAuth ? 'white': null}/>}
          {isAuth && isRegistrationCompleted &&  <ModeSelect/>}

          {isMenuMobileOpen && <div className={styles.separatorLine}></div>}
          {isMenuMobileOpen && <LangSelect isAuth={isAuth}/>}
          {!isMenuMobileOpen && <div className={styles.menuOpen} onClick={handleOpenMobileMenu}>
            <MenuMobile/>
          </div>}
          {isMenuMobileOpen && <div className={styles.menuClose} onClick={handleCloseMobileMenu}>
            <MenuMobileClose/>
          </div>}
        </div>
        {isMenuMobileOpen && <div className={styles.dropdownMobile}>
          <>
          {!isAuth &&
          <div className={styles.actionsContainer}>
              <a className={styles.signIn} onClick={() => { handleCloseMobileMenu(); dispatch(signInOpen())}}>
                <span>{t('menu.signIn')}</span>
                <img src='/img/icons/signIn.svg' alt=''/>
              </a>
              <div className={styles.separatorLine}></div>
              <a className={styles.signUp} onClick={() => { handleCloseMobileMenu(); dispatch(signUpOpen())}}>
                <span>{t('menu.signUp')}</span>
                <img src='/img/icons/signUp.svg' alt=''/>
              </a>
            </div>

          }


            {renderMenu(true)}
            <div className={styles.socials}>
            <Socials/>
            </div>
            </>
        </div>}
      </header>
      </div>
  )
}

export default Header
