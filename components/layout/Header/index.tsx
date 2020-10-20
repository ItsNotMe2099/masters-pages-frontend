import PhoneConfirmComponent from "components/Auth/PhoneConfirm";
import { LangSelect } from "components/layout/Header/components/LangSelect";
import styles from './index.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import Button from 'components/ui/Button'
import Logo from 'components/Logo'
import SignInComponent from 'components/Auth/SignIn'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import {
  signInClose,
  signInOpen,
  signUpOpen,
  signUpClose,
  phoneConfirmOpen,
  phoneConfirmClose
} from 'components/Auth/actions'
import SignUpComponent from 'components/Auth/SignUp'
import Select, { components } from 'react-select';
interface Props {
  user: any
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
export default function Header(props: Props) {
  const [lang, setLang] = useState({value: 'ru', label: 'RU'});

  console.log("Props", props.user);
  const [isAuth, setAuth] = useState(props.user ? true : false)
  const isSignInOpen = useSelector((state: IRootState) => state.authComponent.isSignInOpen)
  const isSignUpOpen = useSelector((state: IRootState) => state.authComponent.isSignUpOpen)
  const isPhoneConfirmOpen = useSelector((state: IRootState) => state.authComponent.isPhoneConfirmOpen)
  const dispatch = useDispatch()

  return (
  <>
    <header className={styles.root}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo /></div>
        <ul className={styles.menu}>
          <li><Link href="/"><a>Create a task</a></Link></li>
          <li><Link href="/"><a>Find a task</a></Link></li>
          <li><Link href="/"><a>Masters</a></Link></li>
          <li><Link href="/"><a>Volunteers</a></Link></li>
          <li><Link href="/"><a>FAQ</a></Link></li>
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
          <a onClick={() => dispatch(signInOpen())}>
            <div className={styles.signIn}>
              <a>
                <span>Sign in</span>
                <img src='img/icons/signIn.svg' alt=''/>
              </a>
            </div>
          </a>
            <div className={styles.separatorLine}></div>

            <a onClick={() => dispatch(signUpOpen())}>
            <div className={styles.signUp}>
              <a>
                <span>Sign up</span>
                <img src='img/icons/signUp.svg' alt=''/>
              </a>
            </div>
          </a>
          </div>
          :
          <div className={styles.master}>
            <Link href="/"><a>
              <span>Master mode</span>
              <img src='img/Header/avatar.png' alt=""/>
            </a></Link>
            <Button largeHeader blue>Volunteer</Button>
            <Button largeHeader green>Client</Button>
          </div>
          }
        </div>
        </div>
    </header>
    <SignInComponent
    isOpen={isSignInOpen}
    onRequestClose={() => dispatch(signInClose())}
    />
    <SignUpComponent
      isOpen={isSignUpOpen}
      onRequestClose={() => dispatch(signUpClose())}
    />
    <PhoneConfirmComponent
      isOpen={isPhoneConfirmOpen}
      onRequestClose={() => dispatch(phoneConfirmClose())}
    />
  </>
  )
}
