import { useRouter } from 'next/router'
import styles from './index.module.scss'
import {useEffect, useState} from 'react'
import { useTranslation } from 'next-i18next'
import {removeObjectEmpty} from 'utils/array'
import {Form, FormikProvider, useFormik} from 'formik'
import ServiceCategoryField from 'components/fields/ServiceCategoryField'
import Validator from 'utils/validator'
import * as React from 'react'
import FormikOnChange from 'components/fields/FormikOnChange'
import CountryField from 'components/fields/CountryField'
import {LabelStyleType} from 'types/types'
import CityField from 'components/fields/CityField'
const queryString = require('query-string')

interface Props {
  initialValues?: any
  collapsed?: boolean,
  onChange?: (data) => void,
  form?: string
}
const Filter = (props: Props) => {

  const { t } = useTranslation()
  const router = useRouter()

  const handleChange = (data) => {

  }
  const handleSubmit =   (data) => {
    console.log("Submit", data);
    if(props.onChange){
      props.onChange({...data, keyword: data.keyword && data.keyword.length > 2 ? data.keyword: undefined})
    }else{

      router.replace(`/SearchTaskPage?${queryString.stringify({filter: JSON.stringify(removeObjectEmpty(data))})}`, undefined, { shallow: true })

    }
  }
  const initialValues = {
    mainCategoryId: null,
    categoryId:  null,
    subCategoryId: null,
    countryId: null,
    geonameid: null,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
  const {values, setFieldValue} = formik;
  useEffect(() => {
    console.log("changeVal", values);
    setFieldValue('categoryId', null);
    setFieldValue('subCategoryId', null);
  }, [values.mainCategoryId])
  useEffect(() => {
    setFieldValue('subCategoryId', null);
  }, [values.categoryId])


  return (<FormikProvider value={formik}>
      <Form>
        <div className={styles.root}>
        <FormikOnChange delay={300} onChange={handleChange}/>
        <ServiceCategoryField name={'mainCategoryId'} validate={Validator.required} placeholder={t('createTask.fieldMainCategory')}/>
        <ServiceCategoryField name={'categoryId'}  categoryId={values.mainCategoryId}  validate={Validator.required} placeholder={t('createTask.fieldCategory')}/>
         <ServiceCategoryField name={'subCategoryId'}  categoryId={values.categoryId} validate={Validator.required} placeholder={t('createTask.fieldSubCategory')}/>
        <CountryField name={'country'}
                      validate={Validator.required} labelType={LabelStyleType.Cross} placeholder={t('masterForm.country')} size='normal'/>
        <CityField name={'geonameid'} countryCode={values.country}
                   validate={Validator.required} labelType={LabelStyleType.Cross} placeholder={t('corporateAccount.city')} size='normal'/>
        </div>
      </Form>
    </FormikProvider>
  )
}
export default Filter
