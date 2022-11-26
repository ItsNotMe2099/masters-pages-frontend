import styles from './index.module.scss'
import React, {useEffect, useState} from 'react'
import ConfirmStep from "./ConfirmStep";
import EmailStep from "./EmailStep";
import {useAuthContext} from "context/auth_state";


enum Step{
  Email = 'email',
  Confirm = 'confirm'
}
interface Props {
  onNextStep: () => void
}

export default function CorporateRegEmailStep(props: Props) {
  const [step, setStep] = useState<Step>(Step.Email);
  const [sending, setSending] = useState(false)
  const authContext = useAuthContext();
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
        Organization account application
      </div>
      {step === Step.Email && <EmailStep onSubmit={handleSubmitEmail}/>}
      {step === Step.Confirm && <ConfirmStep onSubmit={handleSubmitCode} onBack={() => setStep(Step.Email)}/>}
    </div>
  )
}
