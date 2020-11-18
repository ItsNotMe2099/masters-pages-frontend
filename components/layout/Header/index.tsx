import ChangePassword from "components/Auth/ChangePassword";
import PhoneConfirmComponent from "components/Auth/PhoneConfirm";
import { LangSelect } from "components/layout/Header/components/LangSelect";
import ModalLoader from "components/ModalLoader";
import { changeRole } from "components/Profile/actions";
import Socials from "components/ui/Socials";
import { withTranslation } from "react-i18next";
import { withAuthSync } from "utils/auth";
import { getMediaPath } from "utils/media";
import styles from './index.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import Button from 'components/ui/Button'
import Logo from 'components/Logo'
import SignInComponent from 'components/Auth/SignIn'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import {
  modalClose,
  signInOpen,
  signUpOpen,
  phoneConfirmOpen,
} from 'components/Auth/actions'
import SignUpComponent from 'components/Auth/SignUp'
import PWRecoveryComponent from "components/Auth/PWRecovery";
import PWRecoverySucces from "components/Auth/PWRecovery/Success";
import RegistrationSuccess from "components/Auth/RegistrationSuccess";


interface Props {
  user?: any,
  t: (string) => string,
}

const Header = (props: Props) => {
  const [isMenuMobileOpen, setMenuMobileOpen] = useState(false);
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const role = useSelector((state: IRootState) => state.profile.role)

  const handleOpenMobileMenu = () => {
    document.body.classList.add('modal-open');

    setMenuMobileOpen(true);}
  const handleCloseMobileMenu = () => {
    document.body.classList.remove('modal-open');
    setMenuMobileOpen(false);
  }
  console.log("ProfileRole", role);
  const [isAuth, setAuth] = useState(props.user ? true : false)
  const key = useSelector((state: IRootState) => state.authComponent.modalKey)
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
  return (
    <div className={styles.rootWrapper}>
      <header className={styles.root}>
        <div className={styles.menuDesktop}>
          <div className={styles.logo}>
            <Logo/>
          </div>
          <ul className={styles.menu}>
            <li><Link href="/CreateTaskPage">{props.t('menu.createTask')}</Link></li>
            <li><Link href="/SearchTaskPage">{props.t('menu.findTask')}</Link></li>
            <li><Link href="/">{props.t('menu.masters')}</Link></li>
            <li><Link href="/">{props.t('menu.volunteers')}</Link></li>
            <li><Link href="/">{props.t('menu.faq')}</Link></li>
          </ul>
          <div className={styles.right}>

            <LangSelect/>
            <div className={styles.separatorLine}></div>
            {/*<div className={styles.langSwitch}>
            <img className={styles.country} src='/img/icons/ru.svg' alt=''/>
            <span>RU</span>
            <img className={styles.arrow} src='/img/icons/arrow.svg' alt=''/>
          </div>*/}
            {!isAuth ?
              <div className={styles.actionsContainer}>
                <a className={styles.signIn} onClick={() => dispatch(signInOpen())}>
                      <span>Sign in</span>
                      <img src='/img/icons/signIn.svg' alt=''/>
                </a>
                <div className={styles.separatorLine}></div>
                <a className={styles.signUp} onClick={() => dispatch(signUpOpen())}>
                      <span>Sign up</span>
                      <img src='/img/icons/signUp.svg' alt=''/>
                </a>
              </div>
              :
              <div className={styles.profile}>
                <Link href="/PersonalArea"><a className={styles.profile}>
                  <div className={styles.profileMode}>{getRoleName(role)}</div>
                  {profile?.photo &&<img src={`${getMediaPath(profile?.photo)}`} alt=""/>}
                </a></Link>
                {role !== 'master' && <Button smallFont size="20px 0"  red onClick={() => dispatch(changeRole('master'))}>Master</Button>}
                {role !== 'volunteer' && <Button smallFont size="20px 0" blue onClick={() => dispatch(changeRole('volunteer'))}>Volunteer</Button>}
                {role !== 'client' && <Button smallFont size="20px 0"  green onClick={() => dispatch(changeRole('client'))}>Client</Button>}
              </div>
            }
          </div>
        </div>

        <div className={styles.headerMobile}>

          {isAuth && <div className={styles.user}><Link href="/PersonalArea" >
           <> {profile?.photo && <img src={`${getMediaPath(profile?.photo)}`} alt=""/>}
            <span>{getRoleName(role)}</span>
           </>
          </Link></div>}

          {!isAuth && <Logo/>}

          <div className={styles.separatorLine}></div>
          <LangSelect/>
          {!isMenuMobileOpen && <div className={styles.menuOpen} onClick={handleOpenMobileMenu}>
            <img src='/img/Header/menu-mobile.svg'/>
          </div>}
          {isMenuMobileOpen && <div className={styles.menuClose} onClick={handleCloseMobileMenu}>
            <img src='/img/Header/menu-mobile-close.svg'/>
          </div>}
        </div>
        {isMenuMobileOpen && <div className={styles.dropdownMobile}>
          <>
          {!isAuth ?
            <div className={styles.actionsContainer}>
              <a className={styles.signIn} onClick={() => { handleCloseMobileMenu(); dispatch(signInOpen())}}>
                <span>Sign in</span>
                <img src='/img/icons/signIn.svg' alt=''/>
              </a>
              <div className={styles.separatorLine}></div>
              <a className={styles.signUp} onClick={() => { handleCloseMobileMenu(); dispatch(signUpOpen())}}>
                <span>Sign up</span>
                <img src='/img/icons/signUp.svg' alt=''/>
              </a>
            </div>
            :
            <div className={styles.modesContainer}>
              {role !== 'master' && <Button smallFont size="10px 15px" red>Master</Button>}
              {role !== 'client' && <Button smallFont size="10px 15px" green>Client</Button>}
              {role !== 'volunteer' && <Button smallFont size="10px 15px" blue>Volunteer</Button>}
            </div>
          }
            <ul className={styles.menuMobile}>
              <li className={styles.active}><Link href="/">{props.t('menu.home')}</Link></li>
                <li><Link href="/CreateTaskPage">{props.t('menu.createTask')}</Link></li>
                <li><Link href="/SearchTaskPage">{props.t('menu.findTask')}</Link></li>
                <li><Link href="/">{props.t('menu.masters')}</Link></li>
                <li><Link href="/">{props.t('menu.volunteers')}</Link></li>
                <li><Link href="/">{props.t('menu.faq')}</Link></li>

            </ul>
            <div className={styles.socials}>
            <Socials/>
            </div>
            </>
        </div>}
      </header>
      <SignInComponent
        isOpen={key === 'signIn'}
        onRequestClose={() => dispatch(modalClose())}
      />
      <SignUpComponent
        isOpen={key === 'signUp'}
        onRequestClose={() => dispatch(modalClose())}
      />
      <PhoneConfirmComponent
        isOpen={key === 'phoneConfirm'}
        onRequestClose={() => dispatch(modalClose())}
      />
      <PWRecoveryComponent
        isOpen={key === 'pwRecFirst'}
        onRequestClose={() => dispatch(modalClose())}/>
      <PWRecoverySucces
        isOpen={key === 'pwRecSuccess'}
        onRequestClose={() => dispatch(modalClose())}/>
      <ModalLoader isOpen={key === 'loader'} onRequestClose={() => {}}/>
      <ChangePassword isOpen={key === 'changePassword'}
                      onRequestClose={() => dispatch(modalClose())}/>
    </div>
  )
}

export default withTranslation('header')(Header)
