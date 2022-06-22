import {useRouter} from 'next/router'
import styles from './index.module.scss'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import MainSectionButton from 'components/for_pages/Corporate/Button'
import { useDispatch } from 'react-redux'
import { logout } from '../actions'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void,
  t?: (string) => string,
}

const RegistrationSuccess = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const dispatch = useDispatch()

  const handleClick = (href?: string) => {
    dispatch(logout())
    href && router.push(href)
  }

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
            <MainSectionButton size={'small'} color='yellow' onClick={() => handleClick('/corporate')}>{t('newMainVolunteer.forCompanies')}</MainSectionButton>
            <MainSectionButton size={'small'} color='outlineGreen' onClick={() => handleClick('/')}>{t('newMainVolunteer.forIndividuals')}</MainSectionButton>
            <MainSectionButton className={styles.guest} size={'small'} color='outlineRed' onClick={() => handleClick('/guestpage')}>{t('newMainVolunteer.guestAccess')}</MainSectionButton>
          </div>
        <Link href="/FindOrdersGuest"><a className={styles.link} onClick={() => handleClick()}>{t('auth.registrationSuccess.lookAtTaskList')}</a></Link>
    </div>
  )
}
export default RegistrationSuccess
