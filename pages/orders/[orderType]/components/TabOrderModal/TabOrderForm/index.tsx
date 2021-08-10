import Accordion from 'components/ui/Accordion'
import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import Checkbox from 'components/ui/Inputs/Checkbox'
import Input from "components/ui/Inputs/Input";
import InputAddress from "components/ui/Inputs/InputAddress";
import InputCategory from 'components/ui/Inputs/InputCategory'
import InputSubCategory from 'components/ui/Inputs/InputSubCategory'
import FileInput from "components/ui/Inputs/FilesUploadInput";
import SelectInput from "components/ui/Inputs/SelectInput";
import TextArea from "components/ui/Inputs/TextArea";
import Link from 'next/link'
import PriceSelectForm from "pages/CreateTaskPage/Form/components/PriceSelect";
import { Field, reduxForm,formValueSelector } from 'redux-form'
import { IRootState } from "types";
import { required } from "utils/validations";
import { useSelector, useDispatch } from 'react-redux'
import InputLocation from 'components/ui/Inputs/InputLocation'
import styles from './index.module.scss'
import { connect } from 'react-redux'
import {useTranslation} from "i18n";
import InputCurrency from 'components/ui/Inputs/InputCurrency'
import * as React from 'react'
import InputCountry from 'components/ui/Inputs/InputCountry'
import InputDate from 'components/ui/Inputs/InputDate'

let TabOrderForm = props => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.createTaskComplete.formError)
  const {t} = useTranslation('common');

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
       <div className={styles.taskData}>
          <div className={styles.column}>
            <Field
              name="title"
              component={Input}
              label={`${t('taskTitle')}*`}
              validate={required}
            />
            <Field
              name="countryCode"
              component={InputCountry}
              label={t('createTask.fieldCountry')}
              onChange={() =>  {
                props.change('geonameid', null)}}
              size={'small'}
              labelType={'static'}
              validate={required}
            />

            {props.countryCode && <Field
              name="geonameid"
              component={InputLocation}
              isRegistration={true}
              countryCode={props.countryCode}
              label={`${t('createTask.fieldLocation')}`}
              size={'small'}
              labelType={'static'}
              validate={required}
            />}
            <Field
              name="address"
              component={InputAddress}
              size={'small'}
              labelType={'static'}
              label={`${t('createTask.fieldAddress')}`}
            />
            <Field
              name="masterRole"
              component={SelectInput}
              label={`${t('createTask.fieldMasterType')}`}
              options={[{value: 'master', label: t('master')}, {value: 'volunteer', label: t('volunteer')}]}    validate={required}
              size={'small'}
              labelType={'static'}
            />
            <Field
              name="executionType"
              component={SelectInput}
              label={`${t('createTask.fieldExecutionType')}`}
              options={[{value: 'physical', label: t('forms.executionTypeInput.values.physical')}, {value: 'virtual', label: t('forms.executionTypeInput.values.virtual')}, {value: 'combo', label: t('forms.executionTypeInput.values.combo')}]}
              validate={required}
              size={'small'}
              labelType={'static'}
            />
            <Field
              name="deadline"
              component={InputDate}
              label={`${t('createTask.fieldDeadline')}`}
              validate={required}
              size={'small'}
              labelType={'static'}
            />
          </div>
          <div className={styles.column}>
            <Field
              name="mainCategoryId"
              component={InputSubCategory}
              onChange={(value) => {
                props.change('categoryId', null);
                props.change('subCategoryId', null);
              }}
              label={`${t('createTask.fieldMainCategory')}`}
              validate={required}
              size={'small'}
              labelType={'static'}
            />
            <Field
              name="categoryId"
              component={InputSubCategory}
              onChange={(value) => {
                props.change('subCategoryId', null);
              }}
              label={`${t('createTask.fieldCategory')}`}
              validate={required}
              categoryId={props.mainCategoryId}
              size={'small'}
              labelType={'static'}
            />
            <Field
              name="subCategoryId"
              component={InputSubCategory}
              label={`${t('createTask.fieldSubCategory')}`}
              categoryId={props.categoryId}
              validate={required}
              size={'small'}
              labelType={'static'}
            />
          </div>
        </div>
        <div className={styles.address}>

        </div>
        <div className={styles.taskDesc}>
          <Field
            name="description"
            component={TextArea}
            label={`${t('taskDescription')}*`}
            validate={required}
          />
        </div>
      <Field
        name="currency"
        component={InputCurrency}
        withIcon={false}

        label={`${t('currency')}`}
        size={'small'}
        labelType={'static'}
        validate={required}
      />
        <Field
          name="photos"
          component={FileInput}
          label={t('photos')}
          multiple={true}
          title={t('estimate')}
          min="1"
          max="30"
        />
        <PriceSelectForm {...props}/>
        <FormError error={error}/>
      <div className={styles.buttons}>
        <Button className={styles.button} white={true} borderGrey={true} bold={true} size={'12px 40px'} type={'button'} onClick={props.onCancel}>{t('cancel')}</Button>
        <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true} size={'12px 40px'} type={'submit'}>{t('save')}</Button>
      </div>

    </form>
  )
}

TabOrderForm   = reduxForm ({
  form: 'orderForm',
}) (TabOrderForm )

const selector = formValueSelector('orderForm') // <-- same as form name
TabOrderForm = connect(state => {
  const mainCategoryId = selector(state, 'mainCategoryId')
  const categoryId = selector(state, 'categoryId')
  const countryCode = selector(state, 'countryCode')
  const currency = selector(state, 'currency')

  return {
    mainCategoryId,
    categoryId,
    countryCode,
    currency
  }
})(TabOrderForm)
export default TabOrderForm
