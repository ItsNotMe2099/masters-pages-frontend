import PhoneConfirmComponent from "components/Auth/PhoneConfirm";
import { LangSelect } from "components/layout/Header/components/LangSelect";
import Socials from "components/ui/Socials";
import { withTranslation } from "react-i18next";
import { withAuthSync } from "utils/auth";
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
import Select, { components } from 'react-select';
import PWRecoveryComponent from "components/Auth/PWRecovery";
import PWRecoverySucces from "components/Auth/PWRecovery/Success";
import { PWRecoveryResetState } from "components/Auth/PWRecovery/actions";

interface Props {
  user?: any,
  t: (string) => string,
}

const customStyles = {

  container: (provided, state) => ({
    ...provided
  }),
  option: (provided, state) => ({
    ...provided,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  }
}
const IndicatorsContainer = props => {
  return (
    <div style={{ background: 'red', width: '10px' }}>
      <components.IndicatorsContainer {...props} />
    </div>
  );
};
const DropdownIndicator = (
  props: components.DropdownIndicator
) => {
  return (
    <components.DropdownIndicator {...props}>
      <img className={styles.arrow} src='img/icons/arrow.svg' alt=''/>
    </components.DropdownIndicator>
  );
};
const Header = (props: Props) => {
  const [isMenuMobileOpen, setMenuMobileOpen] = useState(false);

  const handleOpenMobileMenu = () => {
    document.body.classList.add('modal-open');

    setMenuMobileOpen(true);}
  const handleCloseMobileMenu = () => {
    document.body.classList.remove('modal-open');
    setMenuMobileOpen(false);
  }
  console.log("Props", props.user);
  const [isAuth, setAuth] = useState(props.user ? true : false)
  /*const isSignInOpen = useSelector((state: IRootState) => state.authComponent.isSignInOpen)
  const isSignUpOpen = useSelector((state: IRootState) => state.authComponent.isSignUpOpen)
  const isPhoneConfirmOpen = useSelector((state: IRootState) => state.authComponent.isPhoneConfirmOpen)*/
  const key = useSelector((state: IRootState) => state.authComponent.modalKey)
  const isOpen = useSelector((state: IRootState) => state.PWRecovery.isOpen)
  const isOpenSuccess = useSelector((state: IRootState) => state.PWRecovery.isOpenSuccess)
  const dispatch = useDispatch()

  return (
    <div className={styles.rootWrapper}>
      <header className={styles.root}>
        <div className={styles.menuDesktop}>
          <div className={styles.logo}>
            <Logo/>
          </div>
          <ul className={styles.menu}>
            <li><Link href="/CreateTaskPage">{props.t('menu.createTask')}</Link></li>
            <li><Link href="/">{props.t('menu.findTask')}</Link></li>
            <li><Link href="/">{props.t('menu.masters')}</Link></li>
            <li><Link href="/">{props.t('menu.volunteers')}</Link></li>
            <li><Link href="/">{props.t('menu.faq')}</Link></li>
          </ul>
          <div className={styles.right}>

            <LangSelect/>
            <div className={styles.separatorLine}></div>
            {/*<div className={styles.langSwitch}>
            <img className={styles.country} src='img/icons/ru.svg' alt=''/>
            <span>RU</span>
            <img className={styles.arrow} src='img/icons/arrow.svg' alt=''/>
          </div>*/}
            {!isAuth ?
              <div className={styles.actionsContainer}>
                <a className={styles.signIn} onClick={() => dispatch(signInOpen())}>
                      <span>Sign in</span>
                      <img src='img/icons/signIn.svg' alt=''/>
                </a>
                <div className={styles.separatorLine}></div>
                <a className={styles.signUp} onClick={() => dispatch(signUpOpen())}>
                      <span>Sign up</span>
                      <img src='img/icons/signUp.svg' alt=''/>
                </a>
              </div>
              :
              <div className={styles.master}>
                <Link href="/"><a>
                  <span>Master mode</span>
                  <img src='img/Header/avatar.png' alt=""/>
                </a></Link>
                <Button smallFont size="20px 0" blue>Volunteer</Button>
                <Button smallFont size="20px 0"  green>Client</Button>
              </div>
            }
          </div>
        </div>

        <div className={styles.headerMobile}>

          {isAuth && <div className={styles.user}><Link href="/" >
           <> <img src='img/Header/avatar.png' alt=""/>
            <span>Master mode</span></>
          </Link></div>}

          {!isAuth && <Logo/>}

          <div className={styles.separatorLine}></div>
          <LangSelect/>
          {!isMenuMobileOpen && <div className={styles.menuOpen} onClick={handleOpenMobileMenu}>
            <img src='img/Header/menu-mobile.svg'/>
          </div>}
          {isMenuMobileOpen && <div className={styles.menuClose} onClick={handleCloseMobileMenu}>
            <img src='img/Header/menu-mobile-close.svg'/>
          </div>}
        </div>
        {isMenuMobileOpen && <div className={styles.dropdownMobile}>
          <>
          {!isAuth ?
            <div className={styles.actionsContainer}>
              <a className={styles.signIn} onClick={() => { handleCloseMobileMenu(); dispatch(signInOpen())}}>
                <span>Sign in</span>
                <img src='img/icons/signIn.svg' alt=''/>
              </a>
              <div className={styles.separatorLine}></div>
              <a className={styles.signUp} onClick={() => { handleCloseMobileMenu(); dispatch(signUpOpen())}}>
                <span>Sign up</span>
                <img src='img/icons/signUp.svg' alt=''/>
              </a>
            </div>
            :
            <div className={styles.modesContainer}>

              <Button smallFont size="10px 15px"  red>Master</Button>
              <Button smallFont size="10px 15px"   green>Client</Button>
              <Button smallFont size="10px 15px"  blue>Volunteer</Button>
            </div>
          }
            <ul className={styles.menuMobile}>
              <li className={styles.active}><Link href="/">{props.t('menu.home')}</Link></li>
                <li><Link href="/CreateTaskPage">{props.t('menu.createTask')}</Link></li>
                <li><Link href="/">{props.t('menu.findTask')}</Link></li>
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
        isOpen={isOpen}
        onRequestClose={() => dispatch(PWRecoveryResetState())}/>
      <PWRecoverySucces
        isOpen={isOpenSuccess}
        onRequestClose={() => dispatch(PWRecoveryResetState())}/>
    </div>
  )
}

export default withTranslation('header')(Header)
