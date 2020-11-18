import { phoneConfirmSubmit } from "components/Auth/PhoneConfirm/actions";
import Modal from "components/ui/Modal";
import { IRootState } from "types";
import styles from './index.module.scss'
import SignUp from './Form'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
}

export default function PhoneConfirmComponent(props: Props) {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: IRootState) => state.phoneConfirmReducer.loading)
  const handleSubmit = (data) => {
    dispatch(phoneConfirmSubmit(data));
  }
  return (
    <Modal
      {...props}
      loading={isLoading}
    >
      <div className={styles.image}>
        <img src="/img/CodeConfirm/code_confirm.svg" alt=''/>
      </div>
      <div className={styles.title}>
        Phone number confirmation:
      </div>
      <div className={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum volutpat
      </div>
        <SignUp onSubmit={handleSubmit}/>
    </Modal>
  )
}
