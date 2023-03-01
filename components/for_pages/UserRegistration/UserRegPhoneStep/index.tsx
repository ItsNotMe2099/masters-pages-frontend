import styles from './index.module.scss'
import React, {useEffect, useState} from 'react'
import ConfirmStep from "./ConfirmStep";
import PhoneStep from "./PhoneStep";
import {useAuthContext} from "context/auth_state";


enum Step{
  Phone = 'phone',
  Confirm = 'confirm'
}
interface Props {
  onNextStep: () => void
}

export default function UserRegPhoneStep(props: Props) {
  const [step, setStep] = useState<Step>(Step.Phone);
  const [sending, setSending] = useState(false)
  const authContext = useAuthContext()
  useEffect(() => {
    authContext.clear();
  }, [])
  const handleSubmitEmail = () => {
    setStep(Step.Confirm);
  }

  const handleSubmitCode = () => {
    props.onNextStep()
  }

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        Individual Account Registration
      </div>
      {step === Step.Phone && <PhoneStep onSubmit={handleSubmitEmail}/>}
      {step === Step.Confirm && <ConfirmStep onSubmit={handleSubmitCode} onBack={() => setStep(Step.Phone)}/>}
    </div>
  )
}
