import { signUpReset, signUpSubmit } from "components/Auth/SignUp/actions";
import Button from 'components/ui/Button'
import Modal from "components/ui/Modal";
import { useEffect } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import Link from 'next/link'
import SignUp from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { signInOpen} from 'components/Modal/actions'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
}

export default function SignUpComponent(props: Props) {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: IRootState) => state.authSignUp.loading)
  const handleSubmit = (data) => {
    dispatch(signUpSubmit(data));
  }
  useEffect(() => {
    dispatch(signUpReset());
  })
  return (
    <Modal {...props} loading={isLoading}>
        <div className={styles.headText}>
          Quick sign in:
        </div>
        <div className={styles.social}>
          <a href="#" target="_blank"><img src="/img/icons/google.svg" alt=''/></a>
          <a href="#" target="_blank"><img src="/img/icons/facebook.svg" alt=''/></a>
          <a href="#" target="_blank"><img src="/img/icons/instagram.svg" alt=''/></a>
        </div>
        <div className={styles.signUpText}>
          Sign up:
        </div>
          <SignUp onSubmit={handleSubmit}/>
        <div className={styles.signUp}>
          <div>Already have an account?</div>
          <div><a onClick={() => dispatch(signInOpen())}>Sign in</a></div>
        </div>
    </Modal>
  )
}
