import { PWRecoveryResetState, PWRecoverySecondSubmit, PWRecoverySubmit } from "components/Auth/PWRecovery/actions";
import Button from 'components/ui/Button'
import Modal from "components/ui/Modal";
import { useEffect } from "react";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import { signInOpen} from 'components/Auth/actions'
import PWRecovery from "./Form";

interface Props {
  isOpen: boolean
  onRequestClose: () => void
}

export default function PWRecoveryComponent(props: Props) {
  const dispatch = useDispatch()
  const firstStepIsComplete = useSelector((state: IRootState) => state.PWRecovery.formIsSuccess)
  const isLoading = useSelector((state: IRootState) => state.PWRecovery.loading)

  useEffect(() => {
    if(props.isOpen){
    dispatch(PWRecoveryResetState());
    }
  }, [props.isOpen])
  const handleSubmit = (data) => {
    dispatch(PWRecoverySubmit(data));
    console.log(data)
  }

  const handleSubmitSecondStep = (data) => {
    dispatch(PWRecoverySecondSubmit(data));
    console.log(data)
  }

  return (
    <Modal {...props} loading={isLoading}>
        <div className={styles.image}>
          <img src='img/PWRecovery/icons/shield.svg' alt=''/>
        </div>
        <div className={styles.headText}>
          Password recovery
        </div>
        <div className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisi dolor mauris pretium tortor lectus.
        </div>
        <div className={styles.fakeMargin}></div>
          {firstStepIsComplete ?
          <PWRecovery onSubmit={handleSubmitSecondStep}/>
          :
          <PWRecovery firstStep onSubmit={handleSubmit}/>}

        <div className={styles.signUp}>
          <div>Remember password?</div>
          <div><a onClick={() => dispatch(signInOpen())}>Sign in</a></div>
        </div>
    </Modal>
  )
}
