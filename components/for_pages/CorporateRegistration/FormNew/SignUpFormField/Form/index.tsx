import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import TextField from 'components/fields/TextField'
import { LabelStyleType } from 'types/types'
import Validator from 'utils/validator'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import { AuthRegisterFormData } from 'data/intefaces/IAuth'
import React from 'react'
import NextSvg from 'components/svg/NextSvg'


interface Props {
  onSubmit: (data: AuthRegisterFormData) => void
}

export default function SignUpForm(props: Props) {

  const handleSubmit = (data: AuthRegisterFormData) => {
    props.onSubmit(data)
  }

  const initialValues = {
    data: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.illustration}><img src='/img/Registration/new/corp/step1.svg' alt=''/></div>
        <div className={styles.text}>Please enter your email.<br/> It will be your organization’s login.</div>
        <TextField className={styles.field} name='data' label='Email' labelType={LabelStyleType.Cross} validate={Validator.email}/>
        <Button 
        onClick={(e: React.FormEvent<HTMLFormElement>) => formik.handleSubmit(e)}
          className={classNames(styles.btn, {[styles.active]: Validator.emailRe.test(formik.values.data)})} 
          disabled={!Validator.emailRe.test(formik.values.data)}>
            Confirm email<NextSvg/>
        </Button>
      </Form>
    </FormikProvider>
  )
}
