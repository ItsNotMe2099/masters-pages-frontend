
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

import * as React from "react";
import { IRootState, ITask, SkillData, SkillListItem } from "types";
import { maskBirthDate } from "utils/masks";
import {eventMinDuration, required} from "utils/validations";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'

import { Field, reduxForm,formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import DateTimeRange from 'components/ui/Inputs/DateTimeRange'
import FormError from 'components/ui/Form/FormError'
import {RadioList} from 'components/ui/Inputs/RadioList'
import {useTranslation, withTranslation} from "i18n";
interface Props {
  onCancel: () => void
  initialValues?: any,
  handleSubmit?: (e) => void
  onSubmit: (data) => void
}
let NewEventForm = (props: Props) => {
  const error = useSelector((state: IRootState) => state.event.formError)
  const formLoading = useSelector((state: IRootState) => state.event.formLoading)
  const taskList = useSelector((state: IRootState) => state.taskUser.list)
  const { t } = useTranslation('common');

  const dispatch = useDispatch();


  return (
     <form className={styles.root} onSubmit={props.handleSubmit}>
       {formLoading ? <Loader/> : <>
      <div className={styles.form}>
        <Field
          name="timeRange"
          component={DateTimeRange}

          label={t('date')}
          validate={[required, eventMinDuration]}
        />
        <Field
          name="title"
          component={Input}
          labelType={'static'}
          size={'small'}
          label={t('event.eventTitle')}
          validate={required}
        />
      <Field
        name="taskId"
        component={SelectInput}
        options={taskList.map(item => ({label: item.title, value: item.id}))}
        label={t('event.task')}
        size={'small'}
        validate={required}
      />
         <Field
          name="priceType"
          component={RadioList}
          grid={2}
          size={'small'}
          labelType="static"
          label={t('priceType')}
          validate={required}
          options={[ {label: t('perHour'), value: 'rate'}, {label: t('fixed'), value: 'fixed'}]}
        />
        <FormError error={error}/>
    </div>

      {!formLoading && <div className={styles.buttons}>
        <Button className={styles.button} white={true} borderGrey={true} bold={true} size={'12px 40px'} type={'button'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
        <Button className={`${styles.button} ${styles.buttonSubmit}`}  red={true} bold={true} size={'12px 40px'} type={'submit'}>{t('event.createEvent')}</Button>
      </div>}
      </>}
    </form>
  )
}

NewEventForm   = reduxForm ({
  form: 'NewEventForm',
}) (NewEventForm )

const selector = formValueSelector('NewEventForm')
NewEventForm = connect(state => {
  // can select values individually
//  const categoryId = selector(state, 'categoryId')

  return {
  }
})(NewEventForm)
export default NewEventForm
