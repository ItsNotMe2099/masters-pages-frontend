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

interface Props<T> {
  onSubmit: (data) => void,
  onCancel: () => void
}

export default function ServiceCategoryForm(props: Props<any[]>) {
  const { t, i18n } = useTranslation('common')

  const handleSubmit =   (data) => {
    console.log("Submit", data);
    props.onSubmit(data);
  }
  const initialValues = {
    mainCategory: null,
    category:  null,
    subCategory: null
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
  const {values, setFieldValue} = formik;
  useEffect(() => {
    console.log("changeVal", values);
   setFieldValue('category', null);
    setFieldValue('subCategory', null);
  }, [values.mainCategory])
  useEffect(() => {
    setFieldValue('subCategory', null);
  }, [values.category])


  return (<FormikProvider value={formik}>
  <Form>
    <ServiceCategoryField name={'mainCategory'} valueAsObject validate={Validator.required} label={t('createTask.fieldMainCategory')}/>
    {values.mainCategory && <ServiceCategoryField name={'category'} valueAsObject categoryId={values.mainCategory?.id}  validate={Validator.required} label={t('createTask.fieldCategory')}/>}
    {values.category && <ServiceCategoryField name={'subCategory'} valueAsObject categoryId={values.category?.id} validate={Validator.required} label={t('createTask.fieldSubCategory')}/>}
    <div className={styles.buttons}>
      <Button size={'small'} type={'button'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
      <Button size={'small'} type={'submit'} onClick={(e) => formik.handleSubmit(e)}>{t('task.save')}</Button>
    </div>
  </Form>
    </FormikProvider>
  )
}
