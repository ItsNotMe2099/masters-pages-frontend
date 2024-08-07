import Button from 'components/ui/Button'
import FormError from 'components/ui/Form/FormError'
import Input from 'components/ui/Inputs/Input'
import InputAddress from 'components/ui/Inputs/InputAddress'
import InputSubCategory from 'components/ui/Inputs/InputSubCategory'
import FileInput from 'components/ui/Inputs/FilesUploadInput'
import SelectInput from 'components/ui/Inputs/SelectInput'
import TextArea from 'components/ui/Inputs/TextArea'
import PriceSelectForm from 'components/for_pages/CreateTaskPage/Form/components/PriceSelect'
import * as React from 'react'
import { Field, reduxForm,formValueSelector } from 'redux-form'
import { IRootState } from 'types'
import { required } from 'utils/validations'
import { useSelector } from 'react-redux'
import InputLocation from 'components/ui/Inputs/InputLocation'
import styles from 'components/for_pages/CreateTaskPage/Form/index.module.scss'
import { connect } from 'react-redux'
import { useTranslation } from 'next-i18next'
import InputCurrency from 'components/ui/Inputs/InputCurrency'
const queryString = require('query-string')
import {RadioList} from 'components/ui/Inputs/RadioList'
import InputCountry from 'components/ui/Inputs/InputCountry'
import InputProfileContact from 'components/ui/Inputs/InputProfileContact'
import InputDate from 'components/ui/Inputs/InputDate'

let CreateTaskForm = props => {
  const {t} = useTranslation('common')
  const { handleSubmit, onChangeForStat } = props
  const error = useSelector((state: IRootState) => state.createTaskComplete.formError)
  const searchStatCount = useSelector((state: IRootState) => state.profileSearch.searchStatCount)
  const statFilter = useSelector((state: IRootState) => state.profileSearch.searchStatFilter)


  const getSearchStatFilterLink = () => {
     return `/${statFilter.masterRole === 'volunteer' ?'SearchVolunteerPage' : 'SearchMasterPage'}/?${queryString.stringify({filter: JSON.stringify(statFilter)}, {encode: true}).replace(/(")/g, '%22')}`
  }
  //=%7B"categoryId"%3A4%2C"subCategoryId"%3A11%7D
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.mainForm}>
          <div className={styles.title__top}>{t('createTask.stepFillUpTaskRequest')}</div>
          <div className={styles.taskData}>
            <div className={styles.column}>
              {props.isMaster && props.visibilityType === 'private' && <Field
                name="profileId"
                component={InputProfileContact}
                role={props.isMaster ? 'client' : null}
                label={`${t('createTask.client')}*`}
                size={'small'}
                validate={required}
                labelType={'static'}
              />}
              <Field
                name="title"
                size={'small'}
                labelType={'static'}
                component={Input}
                label={`${t('createTask.fieldTitle')}*`}
                validate={required}
              />
              {!props.isMaster && <Field
                name="visibilityType"
                component={RadioList}
                label={`${t('type')}*`}
                options={[{label: t('public'), value: 'public'}, {label: t('private'), value: 'private'}]}
                size={'small'}
                labelType={'static'}
              />}
              {!props.isMaster && props.visibilityType === 'private' && <Field
                name="profileId"
                component={InputProfileContact}
                role={props.isMaster ? 'client' : null}
                label={`${t('menu.profile')}*`}
                size={'small'}
                validate={required}
                labelType={'static'}
              />}
              <Field
                name="countryCode"
                component={InputCountry}
                label={`${t('createTask.fieldCountry')}*`}
                onChange={() =>  {
                  props.change('geonameid', null)}}
                labelType={'static'}
                size={'small'}
                validate={required}
              />
              {props.countryCode && <Field
                name="geonameid"
                component={InputLocation}
                isRegistration={true}
                countryCode={props.countryCode}
                label={`${t('createTask.fieldLocation')}*`}
                size={'small'}
                labelType={'static'}
                validate={required}
              />}

              {!props.isMaster && <Field
                name="masterRole"
                onChange={(value) => onChangeForStat('masterRole', value)}
                component={SelectInput}
                label={`${t('createTask.fieldMasterType')}*`}
                options={[{value: 'master', label: t('master')}, {value: 'volunteer', label: t('volunteer')}]}    validate={required}
                size={'small'}
                labelType={'static'}
              />}
            </div>
            <div className={styles.column}>
              <Field
                name="mainCategoryId"
                component={InputSubCategory}
                onChange={(value) => {
                  props.change('categoryId', null)
                  props.change('subCategoryId', null)
                  onChangeForStat('mainCategoryId', value)}}
                label={`${t('createTask.fieldMainCategory')}*`}
                validate={required}
                size={'small'}
                labelType={'static'}
              />
              <Field
                name="categoryId"
                component={InputSubCategory}
                onChange={(value) => {
                  props.change('subCategoryId', null)
                  onChangeForStat('categoryId', value)}}
                label={`${t('createTask.fieldCategory')}*`}
                validate={required}
                categoryId={props.mainCategoryId}
                size={'small'}
                labelType={'static'}
              />
              <Field
                name="subCategoryId"
                component={InputSubCategory}
                onChange={(value) => onChangeForStat('subCategoryId', value)}
                label={`${t('createTask.fieldSubCategory')}*`}
                categoryId={props.categoryId}
                validate={required}
                size={'small'}

                labelType={'static'}
              />
            </div>
          </div>
          <div className={styles.column}>
            <Field
              name="executionType"
              component={SelectInput}
              label={`${t('createTask.fieldExecutionType')}*`}
              options={[{value: 'physical', label: t('forms.executionTypeInput.values.physical')}, {value: 'virtual', label: t('forms.executionTypeInput.values.virtual')}, {value: 'combo', label: t('forms.executionTypeInput.values.combo')}]}
              validate={required}
              size={'small'}
              labelType={'static'}
            />
            <Field
              name="deadline"
              component={InputDate}
              label={`${t('createTask.fieldDeadline')}`}
              size={'small'}
              labelType={'static'}
              mask={'99/99/9999'}
            />
          </div>
          <div className={styles.address}>
          <Field
            name="address"
            component={InputAddress}
            size={'small'}
            labelType={'static'}
            label={`${t('createTask.fieldAddress')}`}
          />
            <Field
              name="currency"
              component={InputCurrency}
              withIcon={false}
              label={`${t('currency')}*`}
              size={'small'}
              labelType={'static'}
              validate={required}
            />
          </div>

          <div className={styles.taskDesc}>
            <Field
              name="description"
              component={TextArea}
              label={`${t('createTask.fieldDescription')}*`}
              validate={required}
              size={'small'}
              labelType={'static'}
            />
          </div>
          <Field
            name="photos"
            component={FileInput}
            label="Photos"
            multiple={true}
            title="Estimate"
            min="1"
            max="30"
          />
           <PriceSelectForm {...props}/>

          <FormError error={error}/>
        <div className={styles.btnContainer}>
            <Button red size="14px 65px">{t('createTask.buttonCreateTask')}</Button>
          </div>
        </div>
      {/*<div className={styles.right}>
      {(searchStatCount && !props.isMaster) && <div className={styles.stat}>
        <Link href={getSearchStatFilterLink()}>
          <a>{t('createTask.stat', {count: searchStatCount})}</a>
        </Link>
      </div>}
                </div>*/}
      </form>
  )
}

CreateTaskForm   = reduxForm ({
  form: 'taskForm',
}) (CreateTaskForm )

const selector = formValueSelector('taskForm') // <-- same as form name
CreateTaskForm = connect(state => {
  const mainCategoryId = selector(state, 'mainCategoryId')
  const categoryId = selector(state, 'categoryId')
  const visibilityType = selector(state, 'visibilityType')
  const countryCode = selector(state, 'countryCode')
  const currency = selector(state, 'currency')
  return {
    mainCategoryId,
    categoryId,
    visibilityType,
    countryCode,
    currency
  }
})(CreateTaskForm)
export default CreateTaskForm
