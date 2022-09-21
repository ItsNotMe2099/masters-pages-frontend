import Input from 'components/ui/Inputs/Input'
import InputPriceFilter from 'components/ui/Inputs/InputPriceFilter'
import SelectInput from 'components/ui/Inputs/SelectInput'
import * as React from 'react'
import { Field, reduxForm,formValueSelector } from 'redux-form'
import InputLocation from 'components/ui/Inputs/InputLocation'
import styles from 'components/for_pages/SearchTaskPage/Filter/Form/index.module.scss'
import { connect } from 'react-redux'
import InputSubCategory from 'components/ui/Inputs/InputSubCategory'
import { useTranslation } from 'next-i18next'
import {useWindowWidth} from '@react-hook/window-size'
import {IRootState} from 'types'
import {useEffect} from 'react'

import { useSelector } from 'react-redux'

interface Props{
  collapsed: boolean
  handleSubmit:() => void
  onChange?:(data: any) => void
  categoryId: number
  initialValues: any
}
let SearchTaskForm = (props) => {
  const {change} = props
  const { t } = useTranslation()
  const width = useWindowWidth()
  const { handleSubmit, collapsed } = props
  const filter = useSelector((state: IRootState) => state.taskSearch.filter)

  useEffect(() => {
    change('categoryId', filter.categoryId)
    change('subCategoryId', filter.subCategoryId)
    change('geonameid', filter.geonameid)
    change('executionType', filter.executionType)
    change('categoryId', filter.categoryId)
    change('rating', filter.rating)
    change('radius', filter.radius)
    change('keywords', filter.keywords)
    change('price', filter.price)
  }, [filter])
  const isMobile = width < 700

  return (
    <form onSubmit={handleSubmit} className={styles.root}>
          {collapsed ? <>
              <Field
                name="mainCategoryId"
                component={InputSubCategory}
                label={t('taskSearch.filter.fieldMainCategory')}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                onChange={() => {
                  props.change('categoryId', null)
                  props.change('subCategoryId', null)
                }}
                labelType={'placeholder'}
              />
              {!isMobile && <Field
                name="subCategoryId"
                component={InputSubCategory}
                label={t('taskSearch.filter.fieldSubCategory')}
                categoryId={props.categoryId}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                labelType={'placeholder'}
              />}
              {!isMobile && <Field

                name="geonameid"
                component={InputLocation}
                label={t('taskSearch.filter.fieldLocation')}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                labelType={'placeholder'}
              />}

              {!isMobile && <Field
                name="price"
                label={t('taskSearch.filter.fieldPrice')}
                component={InputPriceFilter}
                noMargin={true}
                formKey={`${props.form}`}
                withIcon={false}
                labelType={'placeholder'}
              />}
          </>
            :
            <>
              <Field
                name="mainCategoryId"
                component={InputSubCategory}
                label={t('taskSearch.filter.fieldMainCategory')}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                onChange={() => {
                  props.change('categoryId', null)
                  props.change('subCategoryId', null)
                }}
                labelType={'placeholder'}
              />
              <Field
                name="executionType"
                label={t('taskSearch.filter.fieldExecutionType')}
                component={SelectInput}
                options={[
                  {label: t('forms.executionTypeInput.values.physical'), value: 'physical'},
                  {label: t('forms.executionTypeInput.values.virtual'), value: 'virtual'},
                  {label: t('forms.executionTypeInput.values.combo'), value: 'combo'}
                ]}
                withIcon={false}
                noMargin={true}
                showEmpty={true}
                labelType={'placeholder'}
              />
              <Field
                name="rating"
                label={t('taskSearch.filter.fieldClientRating')}
                component={SelectInput}
                options={[
                  {label: '1', value: 1},
                  {label: '2', value: 2},
                  {label: '3', value: 3},
                  {label: '4', value: 4},
                  {label: '5', value: 5},
                ]}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                labelType={'placeholder'}
              />
              <Field
                name="categoryId"
                component={InputSubCategory}
                label={t('taskSearch.filter.fieldCategory')}
                categoryId={props.mainCategoryId}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                labelType={'placeholder'}
                onChange={() => {
                  props.change('subCategoryId', null)
                }}
              />
              <Field
                name="geonameid"
                component={InputLocation}
                label={t('taskSearch.filter.fieldLocation')}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                labelType={'placeholder'}
              />

              <Field
                name="price"
                label={t('taskSearch.filter.fieldPrice')}
                component={InputPriceFilter}
                noMargin={true}
                formKey={`${props.form}`}
                withIcon={false}
                labelType={'placeholder'}
              />


              <Field
                name="subCategoryId"
                component={InputSubCategory}
                label={t('taskSearch.filter.fieldSubCategory')}
                categoryId={props.categoryId}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                labelType={'placeholder'}
              />
              <Field
                name="radius"
                label={t('taskSearch.filter.fieldRadiusOfSearch')}
                component={SelectInput}
                options={[
                  {label: `10 ${t('forms.radiusOfSearchInput.values.km')}`, value: 10},
                  {label: `50 ${t('forms.radiusOfSearchInput.values.km')}`, value: 50},
                  {label: `100 ${t('forms.radiusOfSearchInput.values.km')}`, value: 100},
                  {label: t('forms.radiusOfSearchInput.values.province'), value: 500},
                  {label: t('forms.radiusOfSearchInput.values.country'), value: 2000},
                  {label: t('forms.radiusOfSearchInput.values.world'), value: null},
                ]}

                withIcon={false}
                noMargin={true}
                labelType={'placeholder'}
              />



              <Field
                name="keywords"
                label={t('taskSearch.filter.fieldKeywords')}
                component={Input}
                labelType={'placeholder'}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                debounce={1000}
              />
          </>}
      </form>
  )
}

SearchTaskForm  = reduxForm ({
  form: 'searchTaskForm',
}) (SearchTaskForm)

const selector = formValueSelector('searchTaskForm') // <-- same as form name
SearchTaskForm = connect(state => {
  const mainCategoryId = selector(state, 'mainCategoryId')
  const categoryId = selector(state, 'categoryId')
  return {
    categoryId,
    mainCategoryId,
  }
})(SearchTaskForm)

export default SearchTaskForm
