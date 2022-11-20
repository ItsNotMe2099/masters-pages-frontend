import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import { useState } from 'react'
import { useAuthContext } from 'context/auth_state'
import EmailConfirmForm from './EmailConfirmForm'
import SignUpFormField from './SignUpFormField'
import Button from 'components/ui/Button'
import TextField from 'components/fields/TextField'
import { LabelStyleType } from 'types/types'
import Validator from 'utils/validator'
import PhoneField from 'components/fields/PhoneField'
import classNames from 'classnames'


interface Props {
  onSubmit: (data) => void
}

export default function RegForm(props: Props) {

  const handleSubmit = (data) => {
    props.onSubmit(data)
  }

  const [step, setStep] = useState<number>(1)

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const getIllustration = () => {
    switch(step) {
      case 3:
        return '/img/Registration/new/corp/step2.svg'
      case 4:
        return '/img/Registration/new/corp/step3.svg'
      default:
        return '/img/Registration/new/corp/step3.svg'
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
          <>
            <div className={styles.steps}>
              <img src='/img/Registration/new/corp/steps-line-step2.svg' alt=''/>
            </div>
            <div className={styles.illustration}><img src='/img/Registration/new/corp/step2.svg' alt=''/></div>
            <div className={styles.text}>Please, provide contact information</div>
            <TextField 
            className={styles.field} 
            name='firstName' label='First name' labelType={LabelStyleType.Cross} validate={Validator.required}/>
            <TextField 
            className={styles.altField} 
            name='lastName' label='Last name' labelType={LabelStyleType.Cross} validate={Validator.required}/>
            <PhoneField label='Phone number (optional)' name='phone' labelType={LabelStyleType.Cross} validate={Validator.phone}/>
            <div className={styles.btns}>
              <BackButton/>
              <Button 
                type='button'
                onClick={() => setStep(4)}
                className=
                {classNames(styles.btn, 
                {[styles.active]: formik.values.firstName !== '' && formik.values.lastName !== ''})} 
                disabled={formik.values.firstName === '' && formik.values.lastName === ''}>
                Next step<img src='/img/Registration/new/corp/next.svg' alt=''/>
              </Button>
            </div>
          </>
        }
        {step === 4 &&
          <div>This is STEP 4</div>
        }
      </Form>
    </FormikProvider>
  )
}
