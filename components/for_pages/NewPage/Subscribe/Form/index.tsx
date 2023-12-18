import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from 'context/state'
import { SnackbarType } from 'types/enums'
import TextField from 'components/fields/TextField'
import MailSvg from 'components/svg/MailSvg'
import Button from 'components/ui/Button'

interface IFormData {
  email: string,
}

interface Props {

}

export default function SubscribeForm(props: Props) {

  const appContext = useAppContext()
  const router = useRouter()
  const redirect = router.query.redirect as string
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: IFormData) => {
    setLoading(true)
    try {

    } catch (err) {
      console.error(err)
      if (err) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }
    setLoading(false)
  }

  const initialValues: IFormData = {
    email: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <TextField
          inputClassName={styles.input}
          className={styles.field}
          iconClass={styles.icon}
          name='email'
          placeholder={'Your email here'}
          icon={<MailSvg color='#1A92B7' />} />
        <Button projectBtn='red' className={styles.btn}>
          Subscribe
        </Button>
      </Form>
    </FormikProvider>
  )
}
