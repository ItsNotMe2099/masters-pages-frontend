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

export default function SignUpComponent(props: Props) {
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
    dispatch(signUpSubmit(data));
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
        <div className={styles.headText}>
          Quick sign in:
        </div>
        <div className={styles.social}>
          <a href="#" target="_blank"><img src="img/icons/google.svg" alt=''/></a>
          <a href="#" target="_blank"><img src="img/icons/facebook.svg" alt=''/></a>
          <a href="#" target="_blank"><img src="img/icons/instagram.svg" alt=''/></a>
        </div>
        <div className={styles.signUpText}>
          Sign up:
        </div>
        <div className={styles.center}>
          <SignUp onSubmit={handleSubmit}/>
        </div>
        <div className={styles.signUp}>
          <div>Already have an account?</div>
          <div><a onClick={() => dispatch(signInOpen())}>Sign in</a></div>
        </div>
      </div>
    </Modal>
  )
}
