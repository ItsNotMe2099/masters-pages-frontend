import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import TextField from 'components/fields/TextField'
import { LabelStyleType } from 'types/types'
import Validator from 'utils/validator'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import { AuthRegisterFormData } from 'data/intefaces/IAuth'
import React, {useState} from 'react'
import NextSvg from 'components/svg/NextSvg'
import {useAuthContext} from "context/auth_state";
import FormError from "components/ui/Form/FormError";


interface Props {
  onSubmit: () => void
}

export default function EmailStep(props: Props) {
  const [sending, setSending] = useState(false)
  const authContext = useAuthContext();
  const isLoading = authContext.signUpSpinner;
  const error = authContext.error;
  const handleSubmit =async  (data: AuthRegisterFormData) => {
    if(await authContext.signUpEmail(data.data)){
      props.onSubmit()
    }
  }

  const initialValues = {
    data: authContext.signUpFormData?.data ?? '',
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
        <TextField disabled={isLoading} className={styles.field} name='data' label='Email' labelType={LabelStyleType.Cross} validate={Validator.email}/>
        <FormError error={error}/>
        <Button
        onClick={(e: React.FormEvent<HTMLFormElement>) => formik.handleSubmit(e)}
          className={classNames(styles.btn, {[styles.active]: Validator.emailRe.test(formik.values.data)})}

          disabled={isLoading}>
            Confirm email<NextSvg/>
        </Button>
      </Form>
    </FormikProvider>
  )
}
