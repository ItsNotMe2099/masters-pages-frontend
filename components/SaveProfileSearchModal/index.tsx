import Modal from "components/ui/Modal";
import { IRootState } from "types";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import {saveProfileSearch, saveTaskSearch} from 'components/SavedSearches/actions'
import SaveProfileSearchForm from 'components/SaveProfileSearchModal/Form'
import {useTranslation} from "i18n";
interface Props {
  isOpen: boolean
  onRequestClose?: () => void
}

export default function SaveProfileSearchModal(props: Props) {
  const dispatch = useDispatch();
  const filter = useSelector((state: IRootState) => state.profileSearch.filter)
  const { t } = useTranslation('common');

  const formLoading = useSelector((state: IRootState) => state.profileFeedback.formLoading)
  const handleSubmit = (data) => {
    dispatch(saveProfileSearch({...filter,

      ...(filter.price && filter.price.type === 'fixed' ? { budgetMin: filter.price?.min, budgetMax: filter.price?.max} : {}),
      ...(filter.price && filter.price.type === 'rate' ? { ratePerHourMin: filter.price?.min, ratePerHourMax: filter.price?.max} : {}),
      price: undefined,
      ...data}));
  }

  return (
    <Modal{...props} loading={formLoading} className={styles.root} size="medium" closeClassName={styles.close}
    >

        <div className={styles.innards}>
          <div className={styles.rate}>{t('saveProfileSearchModal.saveThisFilter')}</div>
          <div className={styles.form}><SaveProfileSearchForm onClose={props.onRequestClose} onSubmit={handleSubmit}/></div>
        </div>
    </Modal>
  )
}
