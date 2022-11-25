import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import { LabelStyleType } from 'types/types'
import Validator from 'utils/validator'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import { AuthRegisterFormData } from 'data/intefaces/IAuth'
import React from 'react'
import PhoneField from 'components/fields/PhoneField'
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
        <div className={styles.illustration}><img src='/img/Registration/new/user/step1.svg' alt=''/></div>
        <div className={styles.text}>Please enter your email.<br/> It will be your organization’s login.</div>
        <PhoneField className={styles.field} label='Phone number' name='data' labelType={LabelStyleType.Cross} validate={Validator.phone}/>
        <Button 
        onClick={(e: React.FormEvent<HTMLFormElement>) => formik.handleSubmit(e)}
          className={classNames(styles.btn, {[styles.active]: Validator.emailRe.test(formik.values.data)})} 
          disabled={!Validator.emailRe.test(formik.values.data)}>
            Confirm number<NextSvg/>
        </Button>
      </Form>
    </FormikProvider>
  )
}
