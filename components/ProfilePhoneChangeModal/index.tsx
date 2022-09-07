import Modal from 'components/ui/Modal'
import { IRootState } from 'types'
import styles from './index.module.scss'
import ProfilePhoneChangeForm from './Form'

import { useSelector, useDispatch } from 'react-redux'
import {changeProfileEmail, resetProfileForm} from '../Profile/actions'
import {useEffect} from 'react'
import {modalClose} from '../Modal/actions'
import { useTranslation } from 'next-i18next'
import {useAppContext} from 'context/state'
import ProfileRepository from 'data/repositories/ProfileRepostory'
interface Props {
  isOpen: boolean
  onRequestClose?: () => void
}

export default function ProfilePhoneChangeModal(props: Props) {
  const {t} = useTranslation('common')
  const dispatch = useDispatch()
  const formLoading = useSelector((state: IRootState) => state.profile.formLoading)
  const formIsSuccess = useSelector((state: IRootState) => state.profile.formIsSuccess)
  const appContext = useAppContext();
  const profile = appContext.profile
  useEffect(() => {
    return () => {
      dispatch(resetProfileForm())
    }
  }, [])
  const handleSubmit = (data) => {
    ProfileRepository.updateProfile(profile.id, {phone: data})
  }

  return (
    <Modal{...props} onRequestClose={() => dispatch(modalClose())} title={formIsSuccess ? t('personalArea.phoneChange.titleSuccess') : t('personalArea.phoneChange.title')} loading={formLoading} className={styles.root} closeClassName={styles.close}
    >
      {formIsSuccess ?
        <div className={styles.success}>{t('personalArea.phoneChange.success')}</div>
        :
        <div className={styles.form}><ProfilePhoneChangeForm onSubmit={handleSubmit}/></div>
      }

    </Modal>
  )
}
