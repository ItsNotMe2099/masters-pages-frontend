import Modal from "components/ui/Modal";
import styles from './index.module.scss'
import FinishingTaskByClientForm from "./Form";

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
  job: string
  money: string
  firstName?: string
  lastName?: string
  img?: string
}

export default function FinishingTaskByClientModal(props: Props) {

  const handleSubmit = () => {
    
  }

  return (
    <Modal{...props} headerJob className={styles.root} size="medium" closeClassName={styles.close} 
    firstName={props.firstName}
    lastName={props.lastName}
    img={props.img}
    job={props.job}
    >

        <div className={styles.innards}>
          <div className={styles.money}>
            You own: <span> &nbsp;$ {props.money}</span>
          </div>
          <div className={styles.rate}>Please rate {props.firstName} work!</div>
          <div className={styles.form}><FinishingTaskByClientForm onSubmit={handleSubmit}/></div>
        </div>
    </Modal>
  )
}
