import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { LabelStyleType } from 'types/types'
import Validator from 'utils/validator'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import { AuthRegisterFormData } from 'data/intefaces/IAuth'
import NextSvg from 'components/svg/NextSvg'
import { useAuthContext } from "context/auth_state"
import FormError from "components/ui/Form/FormError"
import PhoneField from "components/fields/PhoneField"
import { useDispatch } from 'react-redux'
import { signInOpen } from 'components/Modal/actions'
import Modals from 'components/layout/Modals'


interface Props {
  onSubmit: () => void
}

export default function PhoneStep(props: Props) {
  const authContext = useAuthContext()
  const isLoading = authContext.signUpSpinner
  const error = authContext.error
  const dispatch = useDispatch()
  const handleSubmit = async (data: AuthRegisterFormData) => {
    if (await authContext.signUpPhone(data.data)) {
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
        <div className={styles.illustration}><img src='/img/Registration/new/user/step1.svg' alt='' /></div>
        <div className={styles.text}>Please enter your phone.<br /> It will be your account login.</div>
        <></>
        <PhoneField className={styles.field} label='Phone number' name='data' labelType={LabelStyleType.Cross} validate={Validator.phone} />
        <FormError error={error} />
        <Button
          onClick={(e: React.FormEvent<HTMLFormElement>) => formik.handleSubmit(e)}
          className={classNames(styles.btn, { [styles.active]: !!formik.values.data })}
          disabled={isLoading}>
          Confirm number<NextSvg />
        </Button>
        <div className={styles.already}>
          If you have individual accounts already <span onClick={() => dispatch(signInOpen())}>SIGN IN</span>
        </div>
      </Form>
      <Modals />
    </FormikProvider>
  )
}
