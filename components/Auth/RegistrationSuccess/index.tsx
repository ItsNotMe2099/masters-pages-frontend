import Button from 'components/ui/Button'
import {useRouter} from 'next/router'
import styles from './index.module.scss'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void,
  t?: (string) => string,
}

const RegistrationSuccess = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  return (
    <div className={styles.root}>
        <img src={'/img/Modal/success.svg'}/>
        <div className={styles.headText}>
          {t('auth.registrationSuccess.title')}
        </div>
        <div className={styles.text}>
          {t('auth.registrationSuccess.description')}
        </div>
        <Button green size="16px 0" onClick={() => {
          window.location.href = '/CreateTaskPage'
        }}>CREATE A TASK</Button>
        <div className={styles.btnContainer}>
       <Button size="16px 0" onClick={() => {
            window.location.href = '/MasterProfile'
          }}> {t('auth.registrationSuccess.buttonBecomeMaster')}</Button>
        </div>
        <div className={styles.btnContainer}>
    <Button size="16px 0" onClick={() => {

      window.location.href = '/VolunteerProfile'
          }}> {t('auth.registrationSuccess.buttonBecomeVolunteer')}</Button>
        </div>
        <Link href="/SearchTaskPage"><a className={styles.link}>{t('auth.registrationSuccess.lookAtTaskList')}</a></Link>
    </div>
  )
}
export default RegistrationSuccess
