import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import Validator from 'utils/validator'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import { useAuthContext } from 'context/auth_state'
import OtpCodeField from 'components/fields/OtpCodeField'


interface Props {
  onSubmit: () => void
}

export default function EmailConfirmForm(props: Props) {

  const handleSubmit = async (data: {code: string}) => {
    const isConfirmed = await authContext.confirmCode(data.code)
    if(isConfirmed){
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

  const authContext = useAuthContext()

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.illustration}><img src='/img/Registration/new/corp/step1.svg' alt=''/></div>
        <div className={styles.text}>Please, check your email Inbox or Spam folders and enter below the code provided:</div>
        <OtpCodeField name='code' length={4} validate={Validator.otpValidation}/>
        <Button 
          className={classNames(styles.btn, {[styles.active]: Validator.otpValidation !== undefined})} 
          disabled={Validator.otpValidation !== undefined}>
            Confirm email<img src='/img/Registration/new/corp/next.svg' alt=''/>
        </Button>
      </Form>
    </FormikProvider>
  )
}
