import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from 'context/auth_state'
import EmailConfirmForm from './EmailConfirmForm'
import SignUpFormField from './SignUpFormField'
import Button from 'components/ui/Button'
import TextField from 'components/fields/TextField'
import { LabelStyleType } from 'types/types'
import Validator from 'utils/validator'
import PhoneField from 'components/fields/PhoneField'
import classNames from 'classnames'
import QuestionPopover from 'components/ui/QuestionPopover'
import SwitchField from 'components/fields/SwitchField'
import PasswordField from 'components/fields/PasswordField'
import CheckBoxField from 'components/fields/CheckBoxField'
import AuthRepository from 'data/repositories/AuthRepository'
import { reachGoal } from 'utils/ymetrika'
import { useAppContext } from 'context/state'
import { ProfileRole } from 'data/intefaces/IProfile'
import FormError from 'components/ui/Form/FormError'


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
      await appContext.updateRole(ProfileRole.Corporate)
      props.onSubmit()

    }catch (e){
      setError(e)
    }
    setIsLoading(false)
  }

  const [step, setStep] = useState<number>(3)

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    phoneExtension: '',
    organization: {
      name: '',
      id: '',
      site: '',
      searchable: true
    },
    password: '',
    passwordConfirm: '',
    terms: false
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

  useEffect(() => {
    const result = formik.values.phoneExtension.replace(/\D/g, '').slice(0, 5)
    formik.setFieldValue('phoneExtension', result)
  }, [formik.values.phoneExtension])

  console.log('phoneExtension', formik.values.phoneExtension)

  return (
    <FormikProvider value={formik}>
      <div className={styles.title}>
        Organization account application
      </div>
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
            <div className={styles.id}>
              <PhoneField label='Phone number (optional)' name='phone' labelType={LabelStyleType.Cross} validate={Validator.phone}/>
              <TextField 
              className={styles.extension} 
              label='Extension' 
              name='phoneExtension' 
              placeholder='77777' 
              labelType={LabelStyleType.Cross}
              />
            </div>
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
          <>
          <div className={styles.steps}>
            <img src='/img/Registration/new/corp/steps-line-step3.svg' alt=''/>
          </div>
          <div className={styles.illustration}><img src='/img/Registration/new/corp/step3.svg' alt=''/></div>
          <div className={styles.text}>Almost done.</div>
          <TextField 
          className={styles.field} 
          name='organization.name' label='Organization name' labelType={LabelStyleType.Cross} validate={Validator.required}/>
          <TextField 
          className={styles.altField} 
          name='organization.site' label='Organization website' labelType={LabelStyleType.Cross} validate={Validator.required}/>
          <div className={styles.id}>
            <TextField 
              className={styles.altField} 
              name='organization.id' label='MastersPages.com ID' labelType={LabelStyleType.Cross} validate={Validator.required}/>
            <QuestionPopover info={'It will become your address in the format http://www.masterspages.com/orgid'} 
            className={styles.question}/>
          </div>
          <SwitchField name='organization.searchable' label='Searchable' className={styles.switch}/>
          <PasswordField 
          className={styles.field}  
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
          <FormError error={error}/>
          <div className={styles.btns}>
            <BackButton/>
            <Button 
              className=
              {classNames(styles.btn, 
              {[styles.active]: formik.values.organization.name !== '' && 
              formik.values.organization.id !== '' && 
              formik.values.organization.site !== '' &&
              formik.values.password === formik.values.passwordConfirm &&
              formik.values.terms})} 
              disabled=
              {formik.values.organization.name === '' && 
              formik.values.organization.id === '' && 
              formik.values.organization.site === '' &&
              formik.values.password !== formik.values.passwordConfirm &&
              !formik.values.terms}>
              Send aplication<img src='/img/Registration/new/corp/next.svg' alt=''/>
            </Button>
          </div>
        </>
        }
      </Form>
    </FormikProvider>
  )
}
