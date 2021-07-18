import InputCategory from 'components/ui/Inputs/InputCategory'
import InputPriceFilter from "components/ui/Inputs/InputPriceFilter";
import SelectInput from "components/ui/Inputs/SelectInput";
import { Field, reduxForm,formValueSelector } from 'redux-form'
import InputLocation from 'components/ui/Inputs/InputLocation'
import styles from './index.module.scss'
import { connect } from 'react-redux'
import InputSubCategory from 'components/ui/Inputs/InputSubCategory'
import {useWindowWidth} from "@react-hook/window-size";
import Input from "../../../ui/Inputs/Input";
import * as React from "react";
import {useTranslation} from "i18n";
import {IRootState} from 'types'
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
interface Props{
  type: 'master' | 'client'
  collapsed: boolean
  handleSubmit:() => void
  onChange?:(data: any) => void
  categoryId: number
  initialValues: any
}
let SearchProfileForm = (props) => {
  const {change} = props;
  const { t } = useTranslation();
  const { handleSubmit, collapsed } = props
  const width = useWindowWidth()
  console.log("SearchProfileForm", props.form)
  const isMobile = width < 700;
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
    console.log("FilterChange", filter)
    change('price', filter.price)
  }, [filter])
  return (
    <form onSubmit={handleSubmit}>

      {props.type === 'master' ? <div className={styles.root}>
          {collapsed ? <>
              <Field
                name="categoryId"
                component={InputCategory}
                label={t('profileSearch.filter.fieldCategory')}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                labelType={'placeholder'}
              />
              {!isMobile && <Field
                name="subCategoryId"
                component={InputSubCategory}
                label={t('profileSearch.filter.fieldSubCategory')}
                categoryId={props.categoryId}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                labelType={'placeholder'}
              />}
              {!isMobile && <Field

                name="geonameid"
                component={InputLocation}
                label={t('profileSearch.filter.fieldLocation')}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                labelType={'placeholder'}
              />}

              {!isMobile && <Field
                name="price"
                label={t('profileSearch.filter.fieldPrice')}
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
                label={t('profileSearch.filter.fieldMainCategory')}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                labelType={'placeholder'}
              />
              <Field
                name="executionType"
                label={t('profileSearch.filter.fieldExecutionType')}
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
                label={t('profileSearch.filter.fieldClientRating')}
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
                label={t('profileSearch.filter.fieldCategory')}
                categoryId={props.mainCategoryId}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                labelType={'placeholder'}
              />
              <Field
                name="geonameid"
                component={InputLocation}
                label={t('profileSearch.filter.fieldLocation')}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                labelType={'placeholder'}
              />
              <Field
                name="price"
                label={t('profileSearch.filter.fieldPrice')}
                component={InputPriceFilter}
                noMargin={true}
                formKey={`${props.form}`}
                withIcon={false}
                labelType={'placeholder'}
              />
              <Field
                name="subCategoryId"
                component={InputSubCategory}
                label={t('profileSearch.filter.fieldSubCategory')}
                categoryId={props.categoryId}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                labelType={'placeholder'}
              />
              <Field
                name="radius"
                label={t('profileSearch.filter.fieldRadiusOfSearch')}
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
                label={t('profileSearch.filter.fieldKeywords')}
                component={Input}
                labelType={'placeholder'}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                debounce={1000}
              />

            </>}
        </div> : <div className={styles.root}>
        <Field
          name="keywords"
          label={t('profileSearch.filter.fieldKeywords')}
          component={Input}
          labelType={'placeholder'}
          noMargin={true}
          withIcon={false}
          showEmpty={true}
          debounce={1000}
        />
        <Field
          name="geonameid"
          component={InputLocation}
          label={t('profileSearch.filter.fieldLocation')}
          noMargin={true}
          withIcon={false}
          showEmpty={true}
          labelType={'placeholder'}
        />
        <Field
          name="radius"
          label={t('profileSearch.filter.fieldRadiusOfSearch')}
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

      </div>}
      </form>
  )
}

SearchProfileForm  = reduxForm ({
  form: 'searchTaskForm',
}) (SearchProfileForm)

const selector = formValueSelector('searchTaskForm') // <-- same as form name
SearchProfileForm = connect(state => {
  const mainCategoryId = selector(state, 'mainCategoryId')
  const categoryId = selector(state, 'categoryId')
  return {
    categoryId,
  }
})(SearchProfileForm)

export default SearchProfileForm
