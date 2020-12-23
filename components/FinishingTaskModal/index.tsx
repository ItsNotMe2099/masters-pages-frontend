import Modal from "components/ui/Modal";
import styles from './index.module.scss'
import { useState } from "react";
import FinishingTaskForm from "./Form";

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
  job: string
  money: string
  firstName?: string
  lastName?: string
  img?: string
}

export default function FinishingTaskModal(props: Props) {

  const [show, setShowAll] = useState(false)

  return (
    <Modal{...props} headerJob className={styles.root} size="medium" closeClassName={styles.close} 
    firstName={props.firstName}
    lastName={props.lastName}
    img={props.img}
    >

        <div className={styles.innards}>
          <div className={styles.top}>
            <div className={styles.job}>{props.job}</div>
            <a className={styles.details} onClick={() => show ? setShowAll(false) : setShowAll(true)}>
              {show ? <span>Hide</span> : <span>See details</span>}<img className={show ? styles.hide : null} src="img/icons/arrowDetails.svg" alt=''/>
            </a>
          </div>
          <div className={styles.money}>
            You own: <span> &nbsp;$ {props.money}</span>
          </div>
          <div className={styles.rate}>Please rate {props.firstName} work!</div>
          <div className={styles.form}><FinishingTaskForm/></div>
        </div>
    </Modal>
  )
}
