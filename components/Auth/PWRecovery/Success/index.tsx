import { PWRecoverySecondSubmit, PWRecoveryFinalSubmit} from "components/Auth/PWRecovery/actions";
import Modal from "components/ui/Modal";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import PWRecoveryNewPW from "./Form";

interface Props {
  isOpen: boolean
  onRequestClose: () => void
}

export default function PWRecoverySucces(props: Props) {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: IRootState) => state.PWRecovery.loading)

  const handleSubmit = (data) => {
    dispatch(PWRecoveryFinalSubmit(data));
    console.log(data)
  }

  return (
    <Modal {...props} loading={isLoading}>
        <div className={styles.image}>
          <img src='/img/PWRecovery/icons/shieldGreen.svg' alt=''/>
        </div>
        <div className={styles.headText}>
          Success
        </div>
        <div className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant nulla
        </div>
          <PWRecoveryNewPW onSubmit={handleSubmit}/>
    </Modal>
  )
}
