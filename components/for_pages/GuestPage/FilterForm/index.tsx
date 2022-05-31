import { useRouter } from 'next/router'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import {removeObjectEmpty} from 'utils/array'
import {Form, FormikProvider, useFormik} from 'formik'
import * as React from 'react'
import FormikOnChange from 'components/fields/FormikOnChange'
import LocationField from 'components/fields/LocationField'
import SelectField from 'components/fields/SelectField'
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
    location: null,
    radius: null
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
  const {values, setFieldValue} = formik

  const radiusOptions=[
    {label: `10 ${t('forms.radiusOfSearchInput.values.km')}`, value: 10},
    {label: `50 ${t('forms.radiusOfSearchInput.values.km')}`, value: 50},
    {label: `100 ${t('forms.radiusOfSearchInput.values.km')}`, value: 100},
    {label: t('forms.radiusOfSearchInput.values.province'), value: 500},
    {label: t('forms.radiusOfSearchInput.values.country'), value: 2000},
  ]

  return (<FormikProvider value={formik}>
      <Form>
        <div className={styles.root}>
        <FormikOnChange delay={300} onChange={handleChange}/>
        <LocationField name='location' placeholder={t('taskSearch.filter.fieldLocation')}/>
        <SelectField name='radius' placeholder={t('taskSearch.filter.fieldRadiusOfSearch')} options={radiusOptions}/>
        </div>
      </Form>
    </FormikProvider>
  )
}
export default Filter
