import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from 'context/state'
import { SnackbarType } from 'types/enums'

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

      </Form>
    </FormikProvider>
  )
}
