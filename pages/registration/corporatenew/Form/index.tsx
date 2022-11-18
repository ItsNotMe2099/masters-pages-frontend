import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import { useState } from 'react'
import TextField from 'components/fields/TextField'
import { LabelStyleType } from 'types/types'
import Validator from 'utils/validator'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import { useAuthContext } from 'context/auth_state'
import { AuthRegisterFormData } from 'data/intefaces/IAuth'


interface Props {
  onSubmit: (data) => void
}

export default function RegForm(props: Props) {

  const handleSubmit =   (data) => {
    props.onSubmit(data)
  }

  const [step, setStep] = useState<number>(1)

  const initialValues = {
    email: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const getIllustration = () => {
    switch(step) {
      case 1:
        return '/img/Registration/new/corp/step1.svg'
      case 2:
        return '/img/Registration/new/corp/step1.svg'
      case 3:
        return '/img/Registration/new/corp/step2.svg'
      case 4:
        return '/img/Registration/new/corp/step3.svg'
      default:
        return '/img/Registration/new/corp/step1.svg'
    }
  }

  const authContext = useAuthContext()

  const handleStep = (step: number, data?: AuthRegisterFormData) => {
    switch(step) {
      case 1:
        authContext.signUp(data)
        setStep(2)
        break
    }
  }

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        {step === 1 && 
          <>
          <div className={styles.illustration}><img src={getIllustration()} alt=''/></div>
          <div className={styles.text}>Please enter your email. It will be your organization’s login.</div>
          <TextField className={styles.field} name='email' label='Email' labelType={LabelStyleType.Cross} validate={Validator.email}/>
          <Button 
          className={classNames(styles.btn, {[styles.active]: Validator.emailRe.test(formik.values.email)})} 
          disabled={!Validator.emailRe.test(formik.values.email)} 
          onClick={() => handleStep(1, formik.values.email)}>Confirm email<img src='/img/Registration/new/corp/next.svg' alt=''/></Button>
          </>
        }
        {step === 2 && authContext.isOk &&
          <>
          </>
        }
      </Form>
    </FormikProvider>
  )
}
