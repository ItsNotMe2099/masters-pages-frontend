import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import Validator from 'utils/validator'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import OtpCodeField from 'components/fields/OtpCodeField'
import { ReactElement, useState } from 'react'
import { useAuthContext } from 'context/auth_state'


interface Props {
  onSubmit: () => void
  backBtn?: () => ReactElement
  illustration: string
  email?: boolean
}

export default function ConfirmForm(props: Props) {

  const [error, setError] = useState<boolean>(false)

  const authContext = useAuthContext()

  const handleSubmit = async (data: {code: string}) => {
    const isConfirmed = await authContext.confirmCode(data.code)
    if(isConfirmed){
      props.onSubmit()
    }
    else{
      setError(true)
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
        <div className={styles.illustration}><img src={props.illustration} alt=''/></div>
        <div className={styles.text}>Please, check your email Inbox or Spam folders and enter below the code provided:</div>
        <OtpCodeField error={error} name='code' length={4} validate={Validator.otpValidation}/>
        <div className={styles.btns}>
        {props.backBtn ? props.backBtn() : null}
        <Button 
          onClick={(e: React.FormEvent<HTMLFormElement>) => formik.handleSubmit(e)}
          className=
          {classNames(styles.btn, 
            {[styles.active]: (Validator.otpValidation(formik.values.code) === undefined && formik.values.code.length === 4)})} 
          disabled={Validator.otpValidation(formik.values.code) !== undefined || formik.values.code.length < 4}>
            Confirm number<img src='/img/Registration/new/corp/next.svg' alt=''/>
        </Button>
        </div>
        <div className={styles.remain}>
          <div className={styles.seconds}>{authContext.remainSec}s</div>
          <div className={styles.get}>{props.email ? 'Didn’t get an email?' : 'Didn’t get the sms?'} <span onClick={() => authContext.sendCodeAgain()}>Resend</span></div>
        </div>
      </Form>
    </FormikProvider>
  )
}
