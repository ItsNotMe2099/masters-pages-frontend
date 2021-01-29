import { feedbackSiteOpen, modalClose } from "components/Modal/actions";
import Button from "components/ui/Button";
import Modal from "components/ui/Modal";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'

interface Props {
  isOpen: boolean
}

export default function SuccessTaskModal(props: Props) {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(modalClose());
  }

  const handleWillDoIt = () => {
    dispatch(feedbackSiteOpen());
  }
  return (
    <Modal{...props} onRequestClose={handleClose} className={styles.root} closeClassName={styles.close} >

        <div className={styles.innards}>
          <div className={styles.top}>
            <div><img src="/img/SuccessTaskModal/icon.svg" alt=""/></div>
            <div className={styles.text__top}>Congratulations! Your order is completed</div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.text__bottom}>Please describe your experiens working with our platform. It will help us to make it more useful for you in future.</div>
            <div className={styles.btnContainer}>
              <Button type="button" transparent bold smallFont size="10px 32px" borderC4 onClick={handleClose}>NO I DON'T</Button>
              <Button type="button" red bold smallFont size="10px 45px" onClick={handleWillDoIt} >YES I WILL DO IT</Button>
            </div>
          </div>
        </div>
    </Modal>
  )
}
