import Button from "components/ui/Button";
import Modal from "components/ui/Modal";
import styles from './index.module.scss'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
}

export default function SuccessFeedbackModal(props: Props) {

  return (
    <Modal{...props} className={styles.root} closeClassName={styles.close} >
      <div className={styles.innards}>
          <div><img src="/img/SuccessFeedbackModal/icon.svg" alt=""/></div>
          <div className={styles.text}>Thank you for your feedback!</div>
          <div className={styles.btnContainer}>
            <Button type="button" red bold smallFont size="10px 45px">GO TO HOME PAGE</Button>
          </div>
      </div>
    </Modal>
  )
}
