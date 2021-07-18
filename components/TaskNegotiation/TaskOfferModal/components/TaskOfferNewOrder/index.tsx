
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
interface Props {
  onCancel: () => void
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
        name="geonameid"
        component={InputLocation}
        label={`${t('location')}*`}
        validate={required}
      />
      <Field
        name="masterRole"
        component={SelectInput}
        label={`${t('masterOrVolunteer')}*`}
        options={[{value: 'master', label: 'Master'}, {value: 'volunteer', label: 'Volunteer'}]}
        validate={required}
      />
      <Field
        name="categoryId"
        component={InputCategory}
        label={`${t('category')}*`}
        validate={required}
      />
      <Field
        name="subCategoryId"
        component={InputSubCategory}
        label={`${t('subCategory')}*`}
        categoryId={props.categoryId}
        validate={required}
      />

      <Field
        name="executionType"
        component={SelectInput}
        label={`${t('executionType')}*`}
        options={[{value: 'physical', label: t('physical')}, {value: 'virtual', label: t('virtual')}, {value: 'combo', label: t('combo')}]}
        validate={required}
        labelType={'cross'}
      />


      <Field
        name="address"
        component={InputAddress}
        label={t('address')}
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
        <Button className={styles.button} white={true} borderGrey={true} bold={true} size={'12px 40px'} type={'button'} onClick={props.onCancel}>{t('cancel')}</Button>
        <Button className={`${styles.button} ${styles.buttonSubmit}`}  red={true} bold={true} size={'12px 40px'} type={'submit'}>{t('taskNegotiation.sendOffer')}</Button>
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
  console.log("getCategoryId", categoryId, state)
  const offerPriceType = selector(state, 'offerPriceType')
  const currency = selector(state, 'currency')

  return {
    categoryId,
    currency,
    offerPriceType: !offerPriceType ? 'fixed' : offerPriceType,
  }
})(TaskOfferNewOrder)
export default TaskOfferNewOrder
