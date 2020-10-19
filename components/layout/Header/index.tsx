import styles from './index.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import Button from 'components/ui/Button'
import Logo from 'components/Logo'
import SignInComponent from 'components/Auth/SignIn'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import { signInClose, signInOpen } from 'components/Auth/actions'

interface Props {}

export default function Header(props: Props) {

  const [isAuth, setAuth] = useState(false)
  const signInIsOpen = useSelector((state: IRootState) => state.authComponent.isSignInOpen)
  const dispatch = useDispatch()

  return (
  <>
    <header className={styles.root}>
      <div className={styles.container}>
        <Logo/>
        <ul className={styles.menu}>
          <li><Link href="/"><a>Create a task</a></Link></li>
          <li><Link href="/"><a>Find a task</a></Link></li>
          <li><Link href="/"><a>Masters</a></Link></li>
          <li><Link href="/"><a>Volunteers</a></Link></li>
          <li><Link href="/"><a>FAQ</a></Link></li>
        </ul>
        <div className={styles.right}>
          <div className={styles.langSwitch}>
            <img className={styles.country} src='img/icons/ru.svg' alt=''/>
            <span>RU</span>
            <img className={styles.arrow} src='img/icons/arrow.svg' alt=''/>
          </div>
          {!isAuth ?
          <div>
          <a onClick={() => dispatch(signInOpen())}>
            <div className={styles.signIn}>
              <a>
                <span>Sign in</span>
                <img src='img/icons/signIn.svg' alt=''/>
              </a>
            </div>
          </a>
          <a>
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
    isOpen={signInIsOpen}
    onRequestClose={() => dispatch(signInClose())}
    />
  </>
  )
}
