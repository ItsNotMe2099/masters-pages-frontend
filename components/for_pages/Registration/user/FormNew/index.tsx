import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from 'context/auth_state'
import SignUpFormField from './SignUpFormField'
import Button from 'components/ui/Button'
import TextField from 'components/fields/TextField'
import { LabelStyleType } from 'types/types'
import Validator from 'utils/validator'
import classNames from 'classnames'
import SwitchField from 'components/fields/SwitchField'
import PasswordField from 'components/fields/PasswordField'
import CheckBoxField from 'components/fields/CheckBoxField'
import AuthRepository from 'data/repositories/AuthRepository'
import { reachGoal } from 'utils/ymetrika'
import { useAppContext } from 'context/state'
import { ProfileRole } from 'data/intefaces/IProfile'
import FormError from 'components/ui/Form/FormError'
import ConfirmForm from 'components/ConfirmForm'
import NextSvg from 'components/svg/NextSvg'
import ModeField from 'components/fields/ModeField'


interface Props {
  onSubmit: () => void
}

export default function RegForm(props: Props) {

  const [isLoading, setIsLoading ] = useState(false)
  const [error, setError] = useState(null)

  const appContext = useAppContext()

  const handleSubmit = async (data) => {
    console.log('Submit', data)
    setError(null)
    setIsLoading(true);
    try {
      const res = await AuthRepository.completeRegistration(data)
      reachGoal('auth:signup:completed')
      await appContext.updateUser()
      await appContext.updateRole(ProfileRole.Client)
      props.onSubmit()

    }catch (e){
      setError(e)
    }
    setIsLoading(false)
  }

  const [step, setStep] = useState<number>(4)

  const initialValues = {
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    terms: false,
    searchable: true,
    mode: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

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
      <div className={styles.title}>
        {step < 4 ? 'Individual Account Registration' : 'New profile'}
      </div>
      <Form className={styles.form}>
        {step === 1 && 
          <SignUpFormField onSubmit={() => /*authContext.*/isOk ? setStep(2) : null} name='phone'/>
        }
        {step === 2 &&
          <ConfirmForm illustration='/img/Registration/new/user/step1.svg' onSubmit={() => setStep(3)} backBtn={() => <BackButton/>}/>
        }
        {step === 3 &&
          <>
            <div className={styles.steps}>
              <img src='/img/Registration/new/user/steps-line.svg' alt=''/>
            </div>
            <div className={styles.illustration}><img src='/img/Registration/new/corp/step2.svg' alt=''/></div>
            <div className={styles.text}>Please, provide contact information</div>
            <SwitchField name='searchable' label='Searchable' className={styles.switch}/>
            <TextField 
            className={styles.field} 
            name='firstName' label='First name' labelType={LabelStyleType.Cross} validate={Validator.required}/>
            <TextField 
            className={styles.altField} 
            name='lastName' label='Last name' labelType={LabelStyleType.Cross} validate={Validator.required}/>
            <TextField className={styles.altField} name='email' label='Email' labelType={LabelStyleType.Cross} 
            validate={Validator.combine([Validator.required, Validator.email])}/>
            <PasswordField 
              className={styles.altField}  
              name='password' 
              label='Create password' 
              labelType={LabelStyleType.Cross}
              validate={Validator.required}
            />
            <PasswordField 
              className={styles.altField}  
              name='passwordConfirm' 
              label='Re-type password' 
              labelType={LabelStyleType.Cross}
              validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(formik.values)])}
            />
            <CheckBoxField className={styles.checkbox} name={'terms'} validate={Validator.required} label={<div className={styles.terms}>
            Accept <a href='/Terms'>Terms & Conditions</a>
          </div>}/>
            <div className={styles.btns}>
              <BackButton/>
              <Button 
                type='button'
                onClick={() => setStep(4)}
                className=
                {classNames(styles.btn, 
                {[styles.active]: formik.values.firstName !== '' && formik.values.lastName !== '' &&
                  Validator.emailRe.test(formik.values.email) &&
                  formik.values.password === formik.values.passwordConfirm &&
                  formik.values.terms
                })} 
                disabled={formik.values.firstName === '' && formik.values.lastName === '' &&
                !Validator.emailRe.test(formik.values.email) &&
                formik.values.password !== formik.values.passwordConfirm &&
                !formik.values.terms
                }>
                Register<NextSvg/>
              </Button>
            </div>
          </>
        }
        {step === 4 &&
          <>
            <div className={styles.text}>Your MastersPages account has 3 modes. You<br/> can switch between modes at any time.</div>
            <div className={styles.choose}>
              CHOOSE YOUR STARTING MODE
            </div>
            <div className={styles.modes}>
              <ModeField name='mode' onClick={() => setStep(5)}/>
            </div>
          </>
        }
        {step === 5 && (
          formik.values.mode === ProfileRole.Master ? <>Master</> :
          formik.values.mode === ProfileRole.Volunteer ? <>Volunteer</> :
          <>Client</>)
        }
      </Form>
    </FormikProvider>
  )
}
