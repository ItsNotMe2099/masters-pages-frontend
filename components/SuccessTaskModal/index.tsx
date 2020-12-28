import Button from "components/ui/Button";
import Modal from "components/ui/Modal";
import styles from './index.module.scss'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
}

export default function SuccessTaskModal(props: Props) {

  return (
    <Modal{...props} className={styles.root} closeClassName={styles.close} >

        <div className={styles.innards}>
          <div className={styles.top}>
            <div><img src="/img/SuccessTaskModal/icon.svg" alt=""/></div>
            <div className={styles.text__top}>Congratulations! Your order is completed</div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.text__bottom}>Please describe your experiens working with our platform. It will help us to make it more useful for you in future.</div>
            <div className={styles.btnContainer}>
              <Button type="button" transparent bold smallFont size="10px 32px" borderC4>NO I DON'T</Button>
              <Button type="button" red bold smallFont size="10px 45px">YES I WILL DO IT</Button>
            </div>
          </div>
        </div>
    </Modal>
  )
}
