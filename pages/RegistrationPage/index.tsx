import { registrationCompleteSubmit } from "components/Auth/RegistrationPage/actions";
import { withTranslation } from "next-i18next";
import { withAuthSync } from "utils/auth";
import Backgrounds from './Backgrounds'
import RegistrationForm from './Form'
import styles from './index.module.scss'

import { useDispatch } from 'react-redux'
interface Props {
  t: (string) => string,
  user?: any
}

const RegistrationPage = (props: Props) => {
  console.log("PropsUser", props.user)
  const dispatch = useDispatch()
  const handleSubmit = (data) => {
    console.log("HandleSubmit", data)
    dispatch(registrationCompleteSubmit(data));
  }
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
          <div className={styles.separator}>
            <div className={styles.or}>or</div>
            <div className={styles.border}></div>
          </div>
          <div className={styles.right}>
            <RegistrationForm onSubmit={handleSubmit} initialValues={{phone: props.user?.phone}}/>
          </div>
        </div>
      </div>
      <Backgrounds/>
    </div>
  )
}
export default withAuthSync(withTranslation('registration')(RegistrationPage))
