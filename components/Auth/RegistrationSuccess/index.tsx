import {useRouter} from 'next/router'
import styles from './index.module.scss'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import MainSectionButton from 'components/for_pages/Corporate/Button'
import { useDispatch } from 'react-redux'
import { logout } from '../actions'
import { useAppContext } from 'context/state'
import Button from 'components/ui/Button'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void,
  t?: (string) => string,
}

const RegistrationSuccess = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const dispatch = useDispatch()
  const context = useAppContext()

  const handleClick = (href?: string) => {
    dispatch(logout())
    href && router.push(href)
  }

  return (
    <div className={styles.root}>
        <div className={styles.image}><img src={'/img/Modal/success.svg'}/></div>
        <div className={styles.headText}>
          {context.profile?.role === 'corporate' ? t('auth.registrationSuccess.title') : t('auth.registrationSuccess.titleForClient')}
        </div>
        {context.profile?.role === 'corporate' &&
        <div className={styles.text}>
          {t('auth.registrationSuccess.description')}
        </div>}
        <div className={styles.btns}>
            {context.profile?.role === 'corporate' ?
            <>
            <MainSectionButton size={'small'} color='yellow' onClick={() => handleClick('/corporate')}>{t('newMainVolunteer.forCompanies')}</MainSectionButton>
            <MainSectionButton size={'small'} color='outlineGreen' onClick={() => handleClick('/')}>{t('newMainVolunteer.forIndividuals')}</MainSectionButton>
            <MainSectionButton className={styles.guest} size={'small'} color='outlineRed' onClick={() => handleClick('/guestpage')}>{t('newMainVolunteer.guestAccess')}</MainSectionButton>
           </>
            :
            <>
            {/*<div className={styles.btnContainerGreen}>
            <Button green size="16px 0" onClick={() => {
              router.push('/CreateTaskPage')
            }}>CREATE A TASK</Button>
          </div>*/}
            <div className={styles.btnContainer}>
           <Button size="16px 0" onClick={() => {
                router.push('/MasterProfile')
              }}> {t('auth.registrationSuccess.buttonBecomeMaster')}</Button>
            </div>
            <div className={styles.btnContainer}>
        <Button size="16px 0" onClick={() => {
    
            router.push('/VolunteerProfile')
              }}> {t('auth.registrationSuccess.buttonBecomeVolunteer')}</Button>
            </div>
            </>
            }
            </div>
        <Link href={context.profile?.role === 'corporate' ? "/FindOrdersGuest" : '/SearchTaskPage'}><a className={styles.link} onClick={() => context.profile?.role === 'corporate' ? handleClick() : null}>{t('auth.registrationSuccess.lookAtTaskList')}</a></Link>
    </div>
  )
}
export default RegistrationSuccess
