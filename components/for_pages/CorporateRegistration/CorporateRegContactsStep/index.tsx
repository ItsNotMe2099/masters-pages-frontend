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


interface Props {
  onNextStep: (data?: any) => void
}

export default function CorporateRegContactsStep(props: Props) {

  const [isLoading, setIsLoading ] = useState(false)
  const [error, setError] = useState(null)

  const appContext = useAppContext()

  const handleSubmit = async (data) => {

    console.log('Submit', data)
    return  props.onNextStep(data);
    setError(null)
    setIsLoading(true);
    try {
      const res = await AuthRepository.completeRegistration(data)
      reachGoal('auth:signup:completed')
      await appContext.updateUser()
      await appContext.updateRole(ProfileRole.Corporate)
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
    phone: '',
    phoneExtension: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const authContext = useAuthContext()

  console.log('formik.values', formik.values)

  const isOk = true //temp

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

              <Button
                type='submit'
                className=
                  {classNames(styles.btn,
                    {[styles.active]: formik.values.firstName !== '' && formik.values.lastName !== ''})}
                disabled={formik.values.firstName === '' && formik.values.lastName === ''}>
                Next step<NextSvg/>
              </Button>
            </div>
      </Form>
    </FormikProvider>
  )
}
