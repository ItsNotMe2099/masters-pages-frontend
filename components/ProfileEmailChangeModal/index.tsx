import Modal from 'components/ui/Modal'
import { IRootState } from 'types'
import styles from './index.module.scss'
import ProfileEmailChangeForm from './Form'

import { useSelector, useDispatch } from 'react-redux'
import {changeProfileEmail, resetProfileForm} from '../Profile/actions'
import {useEffect} from 'react'
import {modalClose} from '../Modal/actions'
import { useTranslation } from 'next-i18next'
import {useAppContext} from 'context/state'
interface Props {
  isOpen: boolean
  onRequestClose?: () => void
}

export default function ProfileEmailChangeModal(props: Props) {
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
    dispatch(changeProfileEmail(profile.id, data.email))
  }

  return (
    <Modal{...props} onRequestClose={() => dispatch(modalClose())} title={formIsSuccess ? t('personalArea.emailChange.titleSuccess') : t('personalArea.emailChange.title')} loading={formLoading} className={styles.root} closeClassName={styles.close}
    >
      {formIsSuccess ?
        <div className={styles.success}>{t('personalArea.emailChange.success')}</div>
        :
        <div className={styles.form}><ProfileEmailChangeForm onSubmit={handleSubmit}/></div>
      }

    </Modal>
  )
}
