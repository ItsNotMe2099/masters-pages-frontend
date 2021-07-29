
import PriceSelectFormMini from "components/TaskNegotiation/TaskOfferModal/components/TaskOfferNewOrder/PriceSelect";
import { fetchTaskUserListRequest, resetTaskUserList } from "components/TaskUser/actions";
import Button from "components/ui/Button";
import Checkbox from "components/ui/Inputs/Checkbox";
import Input from "components/ui/Inputs/Input";
import InputAddress from "components/ui/Inputs/InputAddress";
import InputCategory from "components/ui/Inputs/InputCategory";
import InputLocation from "components/ui/Inputs/InputLocation";
import InputSubCategory from "components/ui/Inputs/InputSubCategory";
import FileInput from "components/ui/Inputs/FilesUploadInput";
import SelectInput from "components/ui/Inputs/SelectInput";
import TextArea from "components/ui/Inputs/TextArea";
import Loader from "components/ui/Loader";

import Modal from "components/ui/Modal";
import Link from "next/link";
import CreateTaskForm from "pages/CreateTaskPage/Form";
import PriceSelectForm from "pages/CreateTaskPage/Form/components/PriceSelect";
import { useEffect } from "react";
import * as React from "react";
import { IRootState, ITask, SkillData, SkillListItem } from "types";
import { maskBirthDate } from "utils/masks";
import { required } from "utils/validations";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'

import { Field, reduxForm,formValueSelector } from 'redux-form'
import {useTranslation, Trans} from "i18n";
import { connect } from 'react-redux'
import InputCountry from 'components/ui/Inputs/InputCountry'
interface Props {
  change?: (name, val) => void
  countryCode?: string
  onCancel: () => void
  mainCategoryId?: number
  categoryId?: number
  offerPriceType?: string
  initialValues?: any,
  handleSubmit?: (e) => void
  onSubmit: (data) => void
}
let TaskOfferNewOrder = (props: Props) => {
  const sendOfferLoading = useSelector((state: IRootState) => state.taskOffer.sendOfferLoading)

  const dispatch = useDispatch();
  const {t} = useTranslation('common')


  return (
     <form className={styles.root} onSubmit={props.handleSubmit}>
       {sendOfferLoading ? <Loader/> : <>
      <div className={styles.form}>
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
          label={t('address')}
        />
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
            props.change('categoryId', null);
            props.change('subCategoryId', null)
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

      <Field
        name="executionType"
        component={SelectInput}
        label={`${t('executionType')}*`}
        options={[{value: 'physical', label: t('physical')}, {value: 'virtual', label: t('virtual')}, {value: 'combo', label: t('combo')}]}
        validate={required}
        labelType={'static'}
      />


      <Field
        name="description"
        component={TextArea}
        label={`${t('taskDescription')}*`}
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
    </div>
      <PriceSelectFormMini {...props} inModal={true} offerPriceType={props.offerPriceType}/>
      <div className={styles.acceptTerms}>
      <Field
        name="terms"
        component={Checkbox}
        label={<div>{t('taskNegotiation.iAmAgreeWith')} <Link href="/">{t('taskNegotiation.termsAndConditions')}</Link></div>}
      />
      </div>
      {!sendOfferLoading && <div className={styles.buttons}>
        <Button className={styles.button} white={true} borderGrey={true} bold={true} size={'12px 20px'} type={'button'} onClick={props.onCancel}>{t('cancel')}</Button>
        <Button className={`${styles.button} ${styles.buttonSubmit}`}  red={true} bold={true} size={'12px 20px'} type={'submit'}>{t('taskNegotiation.sendOffer')}</Button>
      </div>}
      </>}
    </form>
  )
}

TaskOfferNewOrder   = reduxForm ({
  form: 'TaskOfferNewOrder',
}) (TaskOfferNewOrder )

const selector = formValueSelector('TaskOfferNewOrder')
TaskOfferNewOrder = connect(state => {
  // can select values individually
  const categoryId = selector(state, 'categoryId')
  const offerPriceType = selector(state, 'offerPriceType')
  const currency = selector(state, 'currency')
  const countryCode = selector(state, 'countryCode')
  const mainCategoryId = selector(state, 'mainCategoryId')
  return {
    mainCategoryId,
    categoryId,
    currency,
    countryCode,
    offerPriceType: !offerPriceType ? 'fixed' : offerPriceType,
  }
})(TaskOfferNewOrder)
export default TaskOfferNewOrder
