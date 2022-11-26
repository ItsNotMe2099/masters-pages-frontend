import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from 'context/auth_state'
import Button from 'components/ui/Button'
import TextField from 'components/fields/TextField'
import { LabelStyleType } from 'types/types'
import Validator from 'utils/validator'
import PhoneField from 'components/fields/PhoneField'
import classNames from 'classnames'
import AuthRepository from 'data/repositories/AuthRepository'
import { reachGoal } from 'utils/ymetrika'
import { useAppContext } from 'context/state'
import { ProfileRole } from 'data/intefaces/IProfile'
import NextSvg from 'components/svg/NextSvg'
import BackButton from 'components/BackButton'
import SwitchField from "components/fields/SwitchField";
import PasswordField from "components/fields/PasswordField";
import CheckBoxField from "components/fields/CheckBoxField";


interface Props {
  onNextStep: (data?: any) => void
}

export default function UserRegInfoStep(props: Props) {

  const [isLoading, setIsLoading ] = useState(false)
  const [error, setError] = useState(null)

  const appContext = useAppContext()

  const handleSubmit = async (data) => {
      console.log("handleSubmit")
    setError(null)
    setIsLoading(true);
    try {
      const res = await AuthRepository.completeUserRegistration(data)
      reachGoal('auth:signup:completed')
      await appContext.updateUser()
      props.onNextStep()

    }catch (e){
      setError(e)
    }
    setIsLoading(false)
  }

  const [step, setStep] = useState<number>(1)

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const authContext = useAuthContext()

  console.log('formik.values', formik.values)

  const isOk = true //temp

  const isButtonActive = formik.values.firstName  && formik.values.lastName  &&
    formik.values.password && formik.values.passwordConfirm &&
    formik.values.terms
  return (
    <FormikProvider value={formik}>
      <div className={styles.title}>
        Individual Account Registration
      </div>
      <Form className={styles.form}>
        <div className={styles.steps}>
          <img src='/img/Registration/new/user/steps-line.svg' alt=''/>
        </div>
        <div className={styles.illustration}><img src='/img/Registration/new/corp/step2.svg' alt=''/></div>
        <div className={styles.text}>Please, provide contact information</div>
        {/*<SwitchField name='searchable' label='Searchable' className={styles.switch}/>*/}
        <div className={styles.fields}>
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
        </div>
        <div className={styles.btns}>
          <Button
            type='submit'
            className=
              {classNames(styles.btn,
                {[styles.active]: isButtonActive
                })}
            disabled={isLoading}>
            Register<NextSvg/>
          </Button>
        </div>

      </Form>
    </FormikProvider>
  )
}
