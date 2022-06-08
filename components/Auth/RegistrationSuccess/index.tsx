import {useRouter} from 'next/router'
import styles from './index.module.scss'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import MainSectionButton from 'components/for_pages/Corporate/Button'

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
        <div className={styles.image}><img src={'/img/Modal/success.svg'}/></div>
        <div className={styles.headText}>
          {t('auth.registrationSuccess.title')}
        </div>
        <div className={styles.text}>
          {t('auth.registrationSuccess.description')}
        </div>
        <div className={styles.btns}>
            <MainSectionButton size={'small'} color='yellow' href='/corporate'>{t('newMainVolunteer.forCompanies')}</MainSectionButton>
            <MainSectionButton size={'small'} color='outlineGreen' href='/'>{t('newMainVolunteer.forIndividuals')}</MainSectionButton>
            <MainSectionButton className={styles.guest} size={'small'} color='outlineRed' href='/guestpage'>{t('newMainVolunteer.guestAccess')}</MainSectionButton>
          </div>
        <Link href="/SearchTaskPage"><a className={styles.link}>{t('auth.registrationSuccess.lookAtTaskList')}</a></Link>
    </div>
  )
}
export default RegistrationSuccess
