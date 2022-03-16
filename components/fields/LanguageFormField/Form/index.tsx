import { IField, InputStyleType, IOption } from 'types/types'
import {Form, FormikProvider, useFormik} from 'formik'
import SelectField from 'components/fields/SelectField'
import {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import styles from 'components/PublicProfile/components/view/CardCategories/components/Form/index.module.scss'
import Button from 'components/PublicProfile/components/Button'
import * as React from 'react'
import ServiceCategoryField from 'components/fields/ServiceCategoryField'
import Validator from 'utils/validator'
import CountryField from 'components/fields/CountryField'
import LanguageField from 'components/fields/LanguageField'

interface Props<T> {
  onSubmit: (data) => void,
  onCancel: () => void
}

export default function LanguageForm(props: Props<any[]>) {
  const { t, i18n } = useTranslation('common')

  const handleSubmit =   (data) => {
    console.log("Submit", data);
    props.onSubmit(data);
  }
  const initialValues = {
    language: null
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
  const {values, setFieldValue} = formik;


  return (<FormikProvider value={formik}>
  <Form>
    <LanguageField name={'language'} validate={Validator.required} label={'Langs'}/>
     <div className={styles.buttons}>
      <Button size={'small'} type={'button'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
      <Button size={'small'} type={'submit'} onClick={(e) => formik.handleSubmit(e)}>{t('task.save')}</Button>
    </div>
  </Form>
    </FormikProvider>
  )
}
