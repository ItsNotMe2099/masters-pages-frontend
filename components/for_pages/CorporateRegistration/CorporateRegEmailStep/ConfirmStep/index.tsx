import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import Validator from 'utils/validator'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import OtpCodeField from 'components/fields/OtpCodeField'
import React, { ReactElement, useState } from 'react'
import { useAuthContext } from 'context/auth_state'
import NextSvg from 'components/svg/NextSvg'
import FormError from "components/ui/Form/FormError";
import BackButton from "components/BackButton";


interface Props {
  onSubmit: () => void
  onBack?: () => void
}

export default function ConfirmStep(props: Props) {

  const authContext = useAuthContext()

  const handleSubmit = async (data: {code: string}) => {
    console.log("handleSubmit")
    if(await authContext.confirmEmailCode(data.code)){
      props.onSubmit()
    }
  }

  const initialValues = {
    code: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.illustration}><img src={'/img/Registration/new/corp/step1.svg'} alt=''/></div>
        <div className={styles.text}>Please, check your email Inbox or Spam folders and enter below the code provided:</div>
        <OtpCodeField error={!!authContext.error} name='code' length={4} validate={Validator.otpValidation}/>
        <FormError error={authContext.error}/>
        <div className={styles.btns}>
          <BackButton onClick={props.onBack}/>

          <Button
          onClick={(e: React.FormEvent<HTMLFormElement>) => formik.handleSubmit(e)}
          className=
          {classNames(styles.btn,
            {[styles.active]: true})}
          disabled={Validator.otpValidation(formik.values.code) !== undefined || formik.values.code.length < 4}>
            Confirm number<NextSvg/>
        </Button>
        </div>
        <div className={styles.remain}>
          <div className={styles.seconds}>{authContext.remainSec}s</div>
          <div className={styles.get}>{'Didn’t get an email?'} <span onClick={() => authContext.sendEmailCodeAgain()}>Resend</span></div>
        </div>
        {authContext.codeRes?.code && <div className={styles.codeEnter}>Enter: {authContext.codeRes?.code}</div>}

      </Form>
    </FormikProvider>
  )
}
