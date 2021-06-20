import { createFeedBackSite } from "components/ProfileFeedback/actions";
import Modal from "components/ui/Modal";
import { IRootState } from "types";
import styles from './index.module.scss'
import SaveTaskSearchForm from "./Form";

import { useSelector, useDispatch } from 'react-redux'
import {saveTaskSearch} from 'components/SavedSearches/actions'
interface Props {
  isOpen: boolean
  onRequestClose?: () => void
}

export default function SaveTaskSearchModal(props: Props) {
  const dispatch = useDispatch();
  const filter = useSelector((state: IRootState) => state.taskSearch.filter)

  const formLoading = useSelector((state: IRootState) => state.profileFeedback.formLoading)
  const handleSubmit = (data) => {
    dispatch(saveTaskSearch({...filter,

      ...(filter.price && filter.price.type === 'fixed' ? { budgetMin: filter.price?.min, budgetMax: filter.price?.max} : {}),
      ...(filter.price && filter.price.type === 'rate' ? { ratePerHourMin: filter.price?.min, ratePerHourMax: filter.price?.max} : {}),
      price: undefined,
      ...data}));
  }

  return (
    <Modal{...props} loading={formLoading} className={styles.root} size="medium" closeClassName={styles.close}
    >

        <div className={styles.innards}>
          <div className={styles.rate}>Save this filter?</div>
          <div className={styles.form}><SaveTaskSearchForm onSubmit={handleSubmit}/></div>
        </div>
    </Modal>
  )
}
