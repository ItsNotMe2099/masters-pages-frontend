import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import { useState } from 'react'
import { useAuthContext } from 'context/auth_state'
import EmailConfirmForm from './EmailConfirmForm'
import SignUpFormField from './SignUpFormField'
import Button from 'components/ui/Button'


interface Props {
  onSubmit: (data) => void
}

export default function RegForm(props: Props) {

  const handleSubmit = (data) => {
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

  const BackButton = () => {
    return(
      <Button className={styles.back} type='button' onClick={() => setStep(step => step - 1)}>
        <img src='/img/Registration/new/corp/prev.svg' alt=''/>
      </Button>
    )
  }

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        {step === 1 && 
          <SignUpFormField onSubmit={() => /*authContext.*/isOk ? setStep(2) : null} name='email'/>
        }
        {step === 2 &&
          <EmailConfirmForm onSubmit={() => setStep(3)} backBtn={() => <BackButton/>}/>
        }
        {step === 3 &&
          <div>This is STEP 3</div>
        }
      </Form>
    </FormikProvider>
  )
}
