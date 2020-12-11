import ChangePassword from "components/Auth/ChangePassword";
import PhoneConfirmComponent from "components/Auth/PhoneConfirm";
import { LangSelect } from "components/layout/Header/components/LangSelect";
import { ModeSelect } from "components/layout/Header/components/ModeSelect";
import { ProfileSelect } from "components/layout/Header/components/ProfileSelect";
import ModalConfirm from "components/Modal/ModalConfirm";
import ModalLoader from "components/ModalLoader";
import { changeRole } from "components/Profile/actions";
import MenuMobile from "components/svg/MenuMobile";
import MenuMobileClose from "components/svg/MenuMobileClose";
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
} from 'components/Modal/actions'
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
  const key = useSelector((state: IRootState) => state.modal.modalKey)
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
      <li className={styles.active}><Link href="/">{props.t('menu.home')}</Link></li>
      <li><Link href="/CreateTaskPage">{props.t('menu.createTask')}</Link></li>
      <li><Link href="/SearchTaskPage">{props.t('menu.findTask')}</Link></li>
      <li><Link href="/">{props.t('menu.masters')}</Link></li>
      <li><Link href="/">{props.t('menu.volunteers')}</Link></li>
      <li><Link href="/">{props.t('menu.faq')}</Link></li>

    </ul>)
  }
  return (
    <div className={styles.rootWrapper}>
      <header className={`${styles.root} ${isAuth && styles.rootAuth} ${role === 'client' && styles.rootClient} ${role === 'master' && styles.rootMaster} ${role === 'volunteer' && styles.rootVolunteer}`}>
        <div className={styles.menuDesktop}>
          <div className={styles.logo}>
            <Logo color={isAuth ? 'white': null}/>
          </div>
          {renderMenu(false)}
          <div className={styles.right}>
            <LangSelect isAuth={isAuth}/>
            <div className={styles.separatorLine}></div>
            {!isAuth &&
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
            }
            {isAuth   && <ModeSelect/>}
            {isAuth   && <div className={styles.separatorLine}></div>}
            {isAuth &&  <ProfileSelect/>}

          </div>
        </div>

        <div className={styles.headerMobile}>

          {(isAuth && isMenuMobileOpen) && <div className={styles.user}><ProfileSelect/></div>}

          {((isAuth && !isMenuMobileOpen) || !isAuth) && <Logo color={isAuth ? 'white': null}/>}
          {isAuth &&  <ModeSelect/>}

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
                <span>Sign in</span>
                <img src='/img/icons/signIn.svg' alt=''/>
              </a>
              <div className={styles.separatorLine}></div>
              <a className={styles.signUp} onClick={() => { handleCloseMobileMenu(); dispatch(signUpOpen())}}>
                <span>Sign up</span>
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
                      <ModalConfirm isOpen={key === 'confirm'}    onRequestClose={() => dispatch(modalClose())}/>
    </div>
  )
}

export default withTranslation('header')(Header)
