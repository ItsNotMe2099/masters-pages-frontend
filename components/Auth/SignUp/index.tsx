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
import {useTranslation, withTranslation} from "i18n";

interface Props {
  isOpen?: boolean
  onRequestClose?: () => void,
}

const SignUpComponent = (props: Props) =>  {
  const { t } = useTranslation('common');
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
          {t('auth.titleQuick')}
        </div>
        <div className={styles.social}>
          <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/login`}><img src="/img/icons/google.svg" alt=''/></a>
          <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/facebook/login`}><img src="/img/icons/facebook.svg" alt=''/></a>
        </div>
        <div className={styles.signUpText}>
          {t('auth.signUp.title')}
        </div>
          <SignUp onSubmit={handleSubmit}/>
        <div className={styles.signUp}>
          <div>{t('auth.signUp.alreadyHaveAccount')}</div>
          <div><a onClick={() => dispatch(signInOpen())}>{t('auth.signInLink')}</a></div>
        </div>
    </Modal>
  )
}
export default SignUpComponent
