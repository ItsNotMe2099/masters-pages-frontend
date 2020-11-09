import { signInSubmit } from "components/Auth/SignIn/actions";
import Button from 'components/ui/Button'
import Modal from "components/ui/Modal";
import styles from './index.module.scss'

import { useDispatch } from 'react-redux'


interface Props {
}

export default function ModalSuccess(props) {
  const dispatch = useDispatch()

  return (
    <Modal
    {...props}
    title={props.title}
    title={props.title}
    >
      <div className={styles.root}>
        <div className={styles.close}>
          <Button closeBtn onClick={() => { props.onRequestClose() }}></Button>
        </div>
        <div className={styles.image}>
          <img src='img/icons/congratulations.svg' />
        </div>
        <div className={styles.headText}>
         Thank you for your task
        </div>

      </div>
    </Modal>
  )
}
