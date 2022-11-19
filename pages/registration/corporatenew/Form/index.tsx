import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import { useState } from 'react'
import { useAuthContext } from 'context/auth_state'
import EmailConfirmForm from './EmailConfirmForm'
import SignUpFormField from './SignUpFormField'


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

  console.log('formik.values', formik.values)

  const isOk = true //temp

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        {step === 1 && 
          <SignUpFormField onSubmit={() => /*authContext.*/isOk ? setStep(2) : null} name='email'/>
        }
        {step === 2 &&
          <EmailConfirmForm onSubmit={() => setStep(3)}/>
        }
      </Form>
    </FormikProvider>
  )
}
