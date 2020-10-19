import Button from 'components/ui/Button'
import styles from './index.module.scss'
import Link from 'next/link'
import SignIn from './Form'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { signUpOpen } from 'components/Auth/actions'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
}

export default function SignInComponent(props: Props) {
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
        <div className={styles.headText}>
          Sign in:
        </div>
        <div className={styles.center}>
          <SignIn/>
        </div>
        <div className={styles.forgot}>
          <Link href='/'><a>Forgot password?</a></Link>
        </div>
        <div className={styles.signUp}>
          <div>Don’t have an account yet?</div> 
          <div><a onClick={() => dispatch(signUpOpen())}>Sign up</a></div>
        </div>
      </div>
    </Modal>
  )
}