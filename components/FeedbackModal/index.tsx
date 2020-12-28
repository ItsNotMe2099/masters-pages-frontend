import Modal from "components/ui/Modal";
import styles from './index.module.scss'
import FeedbackForm from "./Form";

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
}

export default function FeedbackModal(props: Props) {

  const handleSubmit = () => {
    
  }

  return (
    <Modal{...props} headerXP className={styles.root} size="medium" closeClassName={styles.close} 
    >

        <div className={styles.innards}>
          <div className={styles.rate}>Please rate Masters Pages platform</div>
          <div className={styles.form}><FeedbackForm onSubmit={handleSubmit}/></div>
        </div>
    </Modal>
  )
}
