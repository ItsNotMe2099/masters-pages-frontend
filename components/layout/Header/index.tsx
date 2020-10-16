import styles from './index.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import Button from 'components/ui/Button'
import Logo from 'components/Logo'

interface Props {}

export default function Header(props: Props) {

  const [isAuth, setAuth] = useState(false)

  return (
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
          <Link href="/"><a>
            <div className={styles.signIn}>
              <a>
                <span>Sign in</span>
                <img src='img/icons/signIn.svg' alt=''/>
              </a>
            </div>
          </a></Link>
          <Link href="/"><a>
            <div className={styles.signUp}>
              <a>
                <span>Sign up</span>
                <img src='img/icons/signUp.svg' alt=''/>
              </a>
            </div>
          </a></Link>
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
  )
}
