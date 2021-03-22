import { signInSubmit } from "components/Auth/SignIn/actions";
import Button from 'components/ui/Button'
import Modal from "components/ui/Modal";
import Router from "next/router";
import styles from './index.module.scss'
import Link from "next/link";
import {useTranslation, withTranslation} from "react-i18next";

interface Props {
  isOpen: boolean
  onRequestClose?: () => void,
  t?: (string) => string,
}

const RegistrationSuccess = (props: Props) => {
  const { t } = useTranslation('common');
  return (
    <Modal{...props} image='/img/Modal/success.svg'>

        <div className={styles.headText}>
          {t('auth.registrationSuccess.title')}
        </div>
        <div className={styles.text}>
          {t('auth.registrationSuccess.description')}
        </div>
        <Link href="/CreateTaskPage"><Button green size="16px 0" onClick={() => {
          window.location.href = '/CreateTaskPage'
        }}>CREATE A TASK</Button></Link>
        <div className={styles.btnContainer}>
          <Link href=""><Button size="16px 0" onClick={() => {
            window.location.href = '/MasterProfile'
          }}> {t('auth.registrationSuccess.buttonBecomeMaster')}</Button></Link>
        </div>
        <div className={styles.btnContainer}>
          <Link href=""><Button size="16px 0" onClick={() => {
            window.location.href = '/VolunteerProfile'
          }}> {t('auth.registrationSuccess.buttonBecomeVolunteer')}</Button></Link>
        </div>
        <Link href="/SearchTaskPage"><a className={styles.link}>{t('auth.registrationSuccess.lookAtTaskList')}</a></Link>
    </Modal>
  )
}
export default RegistrationSuccess;
