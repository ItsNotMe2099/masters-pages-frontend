import styles from 'pages/registration/corporate/index.module.scss'
import {getAuthServerSide} from 'utils/auth'
import Welcome from 'components/for_pages/CorporateRegistration/Welcome'
import CorporateAccountForm from 'components/for_pages/CorporateRegistration/Form'
import RegistrationPhone from 'components/Auth/RegistrationPhone'
import {modalClose} from 'components/Modal/actions'
import RegistrationPhoneConfirm from 'components/Auth/RegistrationPhoneConfirm'
import {useDispatch, useSelector} from 'react-redux'
import {IRootState} from 'types'
import RegistrationSuccess from 'components/Auth/RegistrationSuccess'
import {IUser} from 'data/intefaces/IUser'
import { useTranslation } from 'next-i18next'
import HiddenXs from 'components/ui/HiddenXS'


interface Props {
  user: IUser
}

const Corporate = (props: Props) => {
  const dispatch = useDispatch()
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const { t } = useTranslation('common')

  console.log('modalKey', modalKey)
  return (
    <div className={styles.body}>
      <div className={styles.root}>
        <div className={styles.title}>
          {t('corporateAccount.applicationTitle')}
        </div>
        {modalKey === 'registrationSuccess' ? <RegistrationSuccess
          isOpen={true}
          onRequestClose={() => {
            window.location.href = '/me'
          }}/> : <div className={styles.content}>
          <CorporateAccountForm user={props.user}/>
          <HiddenXs>
            <Welcome/>
          </HiddenXs>
        </div>}
      </div>
      {modalKey === 'registrationPhone' && <RegistrationPhone
        isOpen={true}
        onRequestClose={() => {
          dispatch(modalClose())
        }}/>}

      {modalKey === 'registrationPhoneConfirm' && <RegistrationPhoneConfirm
        isOpen={true}
        onRequestClose={() => {
          dispatch(modalClose())
        }}/>}
    </div>
  )
}

export const getServerSideProps = getAuthServerSide({redirect: false})

export default Corporate
