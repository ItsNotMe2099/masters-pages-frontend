import { PWRecoverySecondSubmit, PWRecoverySubmit} from "components/Auth/PWRecovery/actions";
import Button from 'components/ui/Button'
import styles from './index.module.scss'
import Modal from 'react-modal'
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
    dispatch(PWRecoverySubmit(data));
    console.log(data)
  }

  const handleSubmitSecondStep = (data) => {
    dispatch(PWRecoverySecondSubmit(data));
    console.log(data)
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
          <img src='img/PWRecovery/icons/shield.svg' alt=''/>
        </div>
        <div className={styles.headText}>
          Password recovery
        </div>
        <div className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisi dolor mauris pretium tortor lectus.
        </div>
        <div className={styles.fakeMargin}></div>
        <div className={styles.center}>
          {firstStepIsComplete ?
          <PWRecovery onSubmit={handleSubmitSecondStep}/>
          :
          <PWRecovery firstStep onSubmit={handleSubmit}/>}
        </div>
        <div className={styles.signUp}>
          <div>Remember password?</div>
          <div><a onClick={() => dispatch(signInOpen())}>Sign in</a></div>
        </div>
        <div></div>
      </div>
    </Modal>
  )
}
