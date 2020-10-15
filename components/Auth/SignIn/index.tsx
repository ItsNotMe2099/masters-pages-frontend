import Button from 'components/ui/Button'
import styles from './index.module.scss'
import Link from 'next/link'
import SignIn from './Form'

interface Props {}

export default function SignInComponent(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.close}>
        <Button closeBtn></Button>
      </div>
      <div className={styles.headText}>
        Quick sign in:
      </div>
      <div className={styles.social}>
        <img src="img/icons/google.svg" alt=''/>
        <img src="img/icons/facebook.svg" alt=''/>
        <img src="img/icons/instagram.svg" alt=''/>
      </div>
      <div className={styles.headText}>
        Sign in:
      </div>
      <SignIn/>
      <div className={styles.forgot}>
        <Link href='/'><a>Forgot password?</a></Link>
      </div>
      <div className={styles.signUp}>
        <div>Don’t have an account yet? </div> 
        <div><Link href='/'><a> Sign up</a></Link></div>
      </div>
    </div>
  )
}