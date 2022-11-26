import styles from './index.module.scss'
import React, {useState} from 'react'
import ConfirmStep from "./ConfirmStep";
import EmailStep from "./EmailStep";


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
  const handleSubmitEmail = () => {
    setStep(Step.Confirm);
  }

  const handleSubmitCode = () => {
    props.onNextStep()
  }

  return (
    <div>
      {step === Step.Email && <EmailStep onSubmit={handleSubmitEmail}/>}
      {step === Step.Confirm && <ConfirmStep onSubmit={handleSubmitCode}/>}
    </div>
  )
}
