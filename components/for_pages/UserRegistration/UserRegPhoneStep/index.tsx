import styles from './index.module.scss'
import React, {useState} from 'react'
import ConfirmStep from "./ConfirmStep";
import EmailStep from "./PhoneStep";


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
  const handleSubmitEmail = () => {
    setStep(Step.Confirm);
  }

  const handleSubmitCode = () => {
    props.onNextStep()
  }

  return (
    <div>
      {step === Step.Phone && <EmailStep onSubmit={handleSubmitEmail}/>}
      {step === Step.Confirm && <ConfirmStep onSubmit={handleSubmitCode}/>}
    </div>
  )
}
