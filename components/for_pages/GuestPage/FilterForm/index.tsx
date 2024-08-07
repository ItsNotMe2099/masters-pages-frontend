import { useRouter } from 'next/router'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import {removeObjectEmpty} from 'utils/array'
import {Field, Form, FormikProvider, useFormik} from 'formik'
import * as React from 'react'
import FormikOnChange from 'components/fields/FormikOnChange'
import LocationField from 'components/fields/LocationField'
import SelectField from 'components/fields/SelectField'
import Input from 'components/ui/Inputs/Input'
import Button from 'components/ui/Button'
import { useDispatch } from 'react-redux'
import Favorite from 'components/svg/Favorite'
import ServiceCategoryField from 'components/fields/ServiceCategoryField'
import CountryField from 'components/fields/CountryField'
import CityField from 'components/fields/CityField'
import Validator from 'utils/validator'
import { LabelStyleType } from 'types/types'

const queryString = require('query-string')


interface Props {
  initialValues?: any
  collapsed?: boolean,
  onChange?: (data) => void,
  form?: string
  filter?: 'projects' | 'companies'
}
const Filter = (props: Props) => {

  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()

  const handleChange = (data) => {

  }
  const handleSubmit =   (data) => {
    console.log("Submit", data);
    if(props.onChange){
      props.onChange({...data, keyword: data.keyword && data.keyword.length > 2 ? data.keyword: undefined})
    }else{

      router.replace(`/FindCompanies?${queryString.stringify({filter: JSON.stringify(removeObjectEmpty(data))})}`, undefined, { shallow: true })

    }
  }
  const initialValues = {
    keywords: null,
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
        {props.filter === 'companies' ?
        <>
        <Field name='keywords' component={Input}
        label={t('taskSearch.filter.fieldKeywords')}
        labelType={'placeholder'}
        noMargin={true}
        withIcon={false}
        showEmpty={true}
        debounce={1000}
        />
        <LocationField name='location' placeholder={t('taskSearch.filter.fieldLocation')} className={styles.select}/>
        <SelectField name='radius' placeholder={t('taskSearch.filter.fieldRadiusOfSearch')} options={radiusOptions} className={styles.select}/>
        </>
        :
        <>
        <ServiceCategoryField name={'mainCategoryId'} validate={Validator.required} placeholder={t('createTask.fieldMainCategory')}/>
        <ServiceCategoryField name={'categoryId'}  categoryId={values.mainCategoryId}  validate={Validator.required} placeholder={t('createTask.fieldCategory')}/>
         <ServiceCategoryField name={'subCategoryId'}  categoryId={values.categoryId} validate={Validator.required} placeholder={t('createTask.fieldSubCategory')}/>
        <CountryField name={'country'}
                      validate={Validator.required} labelType={LabelStyleType.Cross} placeholder={t('masterForm.country')} size='normal'/>
        <CityField name={'geonameid'} countryCode={values.country}
                   validate={Validator.required} labelType={LabelStyleType.Cross} placeholder={t('corporateAccount.city')} size='normal'/>
        </>
        }
        </div>
        <div className={styles.btns}>
          <Button style='applyFilters' type='button' href='/registration/user'>{t('findCompanies.filter.applyFilters')}</Button>
          <a href='/registration/user' target='_blank' rel='noopener noreferrer' className={styles.saveSearch}>{t('taskSearch.saveTheSearch')}<Favorite/></a>
        </div>
      </Form>
    </FormikProvider>
  )
}
export default Filter

Filter.defaultProps = {
  filter: 'projects'
}
