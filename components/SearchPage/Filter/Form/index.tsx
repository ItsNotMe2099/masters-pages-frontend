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
import {useTranslation} from "react-i18next";

interface Props{
  collapsed: boolean
  handleSubmit:() => void
  onChange?:(data: any) => void
  categoryId: number
  initialValues: any
}
let SearchProfileForm = (props) => {
  const { t } = useTranslation();
  const { handleSubmit, collapsed } = props
  const width = useWindowWidth()
  console.log("SearchProfileForm", props.form)
  const isMobile = width < 700;
  return (
    <form onSubmit={handleSubmit}>

        <div className={styles.root}>
          {collapsed ? <>
              <Field
                name="categoryId"
                component={InputCategory}
                label={t('profileSearch.filter.fieldCategory')}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
              />
              {!isMobile && <Field
                name="subCategoryId"
                component={InputSubCategory}
                label={t('profileSearch.filter.fieldSubCategory')}
                categoryId={props.categoryId}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
              />}
              {!isMobile && <Field

                name="geonameid"
                component={InputLocation}
                label={t('profileSearch.filter.fieldLocation')}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
              />}

              {!isMobile && <Field
                name="price"
                label={t('profileSearch.filter.fieldPrice')}
                component={InputPriceFilter}
                noMargin={true}
                formKey={`${props.form}`}
                withIcon={false}
              />}
              </>
            :
            <>
              <Field
                name="categoryId"
                component={InputCategory}
                label={t('profileSearch.filter.fieldCategory')}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
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
              />
              <Field
                name="executionType"
                label={t('profileSearch.filter.fieldExecutionType')}
                component={SelectInput}
                options={[
                  {value: t('forms.radiusOfSearchInput.values.province'), label: 'Physical'},
                  {value: t('forms.radiusOfSearchInput.values.virtual'), label: 'Virtual'},
                  {value: t('forms.radiusOfSearchInput.values.combo'), label: 'Combo'}
                ]}
                withIcon={false}
                noMargin={true}
                showEmpty={true}
              />
              <Field
                name="price"
                label={t('profileSearch.filter.fieldPrice')}
                component={InputPriceFilter}
                noMargin={true}
                formKey={`${props.form}`}
                withIcon={false}
              />
              <Field
                name="subCategoryId"
                component={InputSubCategory}
                label={t('profileSearch.filter.fieldSubCategory')}
                categoryId={props.categoryId}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
              />
              <Field
                name="geonameid"
                component={InputLocation}
                label={t('profileSearch.filter.fieldLocation')}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
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
              />
              <Field
                name="keyword"
                label={t('profileSearch.filter.fieldKeywords')}
                component={Input}
                labelType={'placeholder'}
                noMargin={true}
                withIcon={false}
                showEmpty={true}
                debounce={1000}
              />

            </>}
        </div>
      </form>
  )
}

SearchProfileForm  = reduxForm ({
  form: 'searchTaskForm',
}) (SearchProfileForm)

const selector = formValueSelector('searchTaskForm') // <-- same as form name
SearchProfileForm = connect(state => {
  const categoryId = selector(state, 'categoryId')
  return {
    categoryId,
  }
})(SearchProfileForm)

export default SearchProfileForm
