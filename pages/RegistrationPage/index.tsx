import Backgrounds from './Backgrounds'
import RegistrationForm from './Form'
import styles from './index.module.scss'

interface Props {}

export default function RegistrationPage(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.head}>Registration complete</div>
        <div className={styles.inner}>
          <div className={styles.left}>
            <div className={styles.socialText}>
              Use social media to finish registration
            </div>
            <a href="#" target="_blank">
              <div className={styles.google}>
                <img src="img/Registration/icons/google.svg"/>
                <div>Google</div>
              </div>
            </a>
            <a href="#" target="_blank">
              <div className={styles.facebook}>
                <img src="img/Registration/icons/facebook.svg"/>
                <div>Facebook</div>
              </div>
            </a>
            <a href="#" target="_blank">
              <div className={styles.instagram}>
                <img src="img/Registration/icons/instagram.svg"/>
                <div>Instagram</div>
              </div>
            </a>
          </div>
          <div className={styles.border}><div className={styles.or}>or</div></div>
          <div className={styles.right}>
            <RegistrationForm/>
          </div>
        </div>
      </div>
      <Backgrounds/>
    </div>
  )
}