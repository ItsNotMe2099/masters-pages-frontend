import { signInSubmit } from "components/Auth/SignIn/actions";
import Button from 'components/ui/Button'
import Modal from "components/ui/Modal";
import { IRootState } from "types";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {  PWRecoveryOpen, signUpOpen } from 'components/Auth/actions'
import Link from "next/link";

interface Props {
  isOpen: boolean
  onRequestClose: () => void
}

export default function RegistrationSuccess(props: Props) {

  return (
    <Modal{...props} image='img/Modal/success.svg'>

        <div className={styles.headText}>
          THANK YOU FOR REGISTRATION
        </div>
        <div className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id fusce suscipit pretium ornare sit tincidunt et. 
        </div>
        <Link href="/CreateTaskPage"><Button green size="16px 0">CREATE A TASK</Button></Link>
        <div className={styles.btnContainer}>
          <Link href=""><Button size="16px 0">BECOME A MASTER</Button></Link>
        </div>
        <div className={styles.btnContainer}>
          <Link href=""><Button size="16px 0">BECOME A VOLUNTEER</Button></Link>
        </div>
        <Link href=""><a className={styles.link}>Look at task list</a></Link>
    </Modal>
  )
}
