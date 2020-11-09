import { signInSubmit } from "components/Auth/SignIn/actions";
import Button from 'components/ui/Button'
import Modal from "components/ui/Modal";
import { IRootState } from "types";
import styles from './index.module.scss'
import SignIn from './Form'
import { useDispatch, useSelector } from 'react-redux'
import {  PWRecoveryOpen, signUpOpen } from 'components/Auth/actions'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
}

export default function SignInComponent(props: Props) {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: IRootState) => state.authSignIn.loading)

  const handleSubmit = (data) => {
    dispatch(signInSubmit(data));
  }
  return (
    <Modal{...props} loading={isLoading}>

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
         <SignIn onSubmit={handleSubmit}/>
        <div className={styles.forgot}>
          <div><a onClick={() => dispatch(PWRecoveryOpen())}>Forgot password?</a></div>
        </div>
        <div className={styles.signUp}>
          <div>Don’t have an account yet?</div>
          <div><a onClick={() => dispatch(signUpOpen())}>Sign up</a></div>
        </div>

    </Modal>
  )
}
