import { createFeedBackSite } from "components/ProfileFeedback/actions";
import Modal from "components/ui/Modal";
import { IRootState } from "types";
import styles from './index.module.scss'
import FeedbackForm from "./Form";

import { useSelector, useDispatch } from 'react-redux'
import {useTranslation, withTranslation} from "i18n";
interface Props {
  isOpen: boolean
  onRequestClose?: () => void
}

export default function FeedbackSiteModal(props: Props) {
  const dispatch = useDispatch();
  const formLoading = useSelector((state: IRootState) => state.profileFeedback.formLoading)
  const handleSubmit = (data) => {
    dispatch(createFeedBackSite(data))
  }
  const { t } = useTranslation('common');

  return (
    <Modal{...props} loading={formLoading} className={styles.root} size="medium" closeClassName={styles.close}
    >

        <div className={styles.innards}>
          <div className={styles.rate}>{t('feedBack.ratePlatform')}</div>
          <div className={styles.form}><FeedbackForm onSubmit={handleSubmit}/></div>
        </div>
    </Modal>
  )
}
