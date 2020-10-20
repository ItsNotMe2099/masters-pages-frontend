import { phoneConfirmSubmit } from "components/Auth/PhoneConfirm/actions";
import { signUpSubmit } from "components/Auth/SignUp/actions";
import Button from 'components/ui/Button'
import styles from './index.module.scss'
import Link from 'next/link'
import SignUp from './Form'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { signInOpen} from 'components/Auth/actions'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
}

export default function PhoneConfirmComponent(props: Props) {
  const dispatch = useDispatch()
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      zIndex: '2',
    },
    content : {
      width: '441px',
      height: '671px',
      borderRadius: '21px',
      padding: '0',
      border: '0',
      margin: 'auto',
      position: 'static',
      inset: '0',
    },
  }
  const handleSubmit = (data) => {
    dispatch(phoneConfirmSubmit(data));
  }
  return (
    <Modal
    style={customStyles}
    isOpen={props.isOpen}
    onRequestClose={props.onRequestClose}
    >
      <div className={styles.root}>
        <div className={styles.close}>
          <Button closeBtn onClick={() => { props.onRequestClose() }}></Button>
        </div>

        <div className={styles.image}>
          <img src="img/CodeConfirm/code_confirm.svg" alt=''/>
        </div>
        <div className={styles.title}>
          Phone number confirmation:
        </div>
        <div className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum volutpat
        </div>
        <div className={styles.form}>
          <SignUp onSubmit={handleSubmit}/>
        </div>
      </div>
    </Modal>
  )
}
