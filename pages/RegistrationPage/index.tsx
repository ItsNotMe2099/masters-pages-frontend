import { modalClose } from "components/Modal/actions";
import { registrationCompleteSubmit } from "components/Auth/RegistrationPage/actions";
import RegistrationSuccess from "components/Auth/RegistrationSuccess";
import { withTranslation } from "next-i18next";
import Router from "next/router";
import { IRootState } from "types";
import { withAuthSync, withRestrictAuthSync } from "utils/auth";
import Backgrounds from './Backgrounds'
import RegistrationForm from './Form'
import styles from './index.module.scss'

import { useDispatch, useSelector } from 'react-redux'
interface Props {
  t: (string) => string,
  user?: any
}

const RegistrationPage = (props: Props) => {
  console.log("PropsUser", props.user)
  const dispatch = useDispatch()
  const modalKey = useSelector((state: IRootState) => state.registrationComplete.modalKey)

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
                <img src="/img/Registration/icons/google.svg"/>
                <div>Google</div>
              </div>
            </a>
            <a href="#" target="_blank">
              <div className={styles.facebook}>
                <img src="/img/Registration/icons/facebook.svg"/>
                <div>Facebook</div>
              </div>
            </a>
            <a href="#" target="_blank">
              <div className={styles.instagram}>
                <img src="/img/Registration/icons/instagram.svg"/>
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
      <RegistrationSuccess
        isOpen={modalKey === 'regSuccess'}
        onRequestClose={() =>{
          Router.push('/')
        }}/>
    </div>
  )
}
export default withRestrictAuthSync(withTranslation('registration')(RegistrationPage))
