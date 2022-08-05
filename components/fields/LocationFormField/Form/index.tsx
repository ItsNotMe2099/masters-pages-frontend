import {Form, FormikProvider, useFormik} from 'formik'
import SelectField from 'components/fields/SelectField'
import {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import styles from 'components/PublicProfile/components/view/CardCategories/components/Form/index.module.scss'
import Button from 'components/PublicProfile/components/Button'
import * as React from 'react'
import Validator from 'utils/validator'
import TextField from 'components/fields/TextField'

interface Props<T> {
  onSubmit: (data) => void,
  onCancel: () => void
}

export default function LocationForm(props: Props<any[]>) {
  const { t, i18n } = useTranslation('common')
  const [showAddress, setShowAddress] = useState(false)
  const handleSubmit =   (data) => {
    console.log("Submit", data);
    props.onSubmit(data);
  }
  const initialValues = {
    type: null,
    location:  null
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
  const {values, setFieldValue} = formik;
  useEffect(() => {
    setShowAddress(values.type === 'offline')
  }, [values.type])


  return (<FormikProvider value={formik}>
  <Form>
    <SelectField name={'type'} options={[{label: t('forms.executionTypeInput.values.online'), value: 'online'}, {label: t('forms.executionTypeInput.values.offline'), value: 'offline'}]} validate={Validator.required} label={t('type')}/>
    {showAddress && <TextField name={'address'} label={'Address'} />}
    <div className={styles.buttons}>
      <Button size={'small'} type={'button'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
      <Button size={'small'} type={'submit'} onClick={(e) => formik.handleSubmit(e)}>{t('task.save')}</Button>
    </div>
  </Form>
    </FormikProvider>
  )
}
