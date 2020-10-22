import { PWRecoverySecondSubmit, PWRecoveryFinalSubmit} from "components/Auth/PWRecovery/actions";
import Button from 'components/ui/Button'
import styles from './index.module.scss'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import { signInOpen} from 'components/Auth/actions'
import PWRecoveryNewPW from "./Form";

interface Props {
  isOpen: boolean
  onRequestClose: () => void
}

export default function PWRecoverySucces(props: Props) {
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
    dispatch(PWRecoveryFinalSubmit(data));
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
          <img src='img/PWRecovery/icons/shieldGreen.svg' alt=''/>
        </div>
        <div className={styles.headText}>
          Success
        </div>
        <div className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant nulla 
        </div>
        <div className={styles.center}>
          <PWRecoveryNewPW onSubmit={handleSubmit}/>
        </div>
      </div>
    </Modal>
  )
}
