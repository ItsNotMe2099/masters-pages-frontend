import { signInSubmit } from "components/Auth/SignIn/actions";
import Button from 'components/ui/Button'
import Modal from "components/ui/Modal";
import Router, {useRouter} from "next/router";
import styles from './index.module.scss'
import Link from "next/link";
import {useTranslation, withTranslation} from "i18n";

interface Props {
  isOpen: boolean
  onRequestClose?: () => void,
  t?: (string) => string,
}

const RegistrationSuccess = (props: Props) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  return (
    <div className={styles.root}>
        <img src={'/img/Modal/success.svg'}/>
        <div className={styles.headText}>
          {t('auth.registrationSuccess.title')}
        </div>
        <div className={styles.text}>
          {t('auth.registrationSuccess.description')}
        </div>
        <Link href="/CreateTaskPage"><Button green size="16px 0" onClick={() => {
          router.push('/CreateTaskPage');
        }}>CREATE A TASK</Button></Link>
        <div className={styles.btnContainer}>
          <Link href=""><Button size="16px 0" onClick={() => {
            router.push('/MasterProfile');
          }}> {t('auth.registrationSuccess.buttonBecomeMaster')}</Button></Link>
        </div>
        <div className={styles.btnContainer}>
          <Link href=""><Button size="16px 0" onClick={() => {
            router.push('/VolunteerProfile');
          }}> {t('auth.registrationSuccess.buttonBecomeVolunteer')}</Button></Link>
        </div>
        <Link href="/SearchTaskPage"><a className={styles.link}>{t('auth.registrationSuccess.lookAtTaskList')}</a></Link>
    </div>
  )
}
export default RegistrationSuccess;
