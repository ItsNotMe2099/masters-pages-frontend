import PriceSelectFormMini from "components/TaskNegotiation/TaskOfferModal/components/TaskOfferNewOrder/PriceSelect";
import {fetchTaskUserListRequest, resetTaskUserList} from "components/TaskUser/actions";
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
import {IEvent, IRootState, ITask, SkillData, SkillListItem} from "types";
import {maskBirthDate} from "utils/masks";
import {required} from "utils/validations";
import styles from './index.module.scss'

import {useSelector, useDispatch} from 'react-redux'

import {Field, reduxForm, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'
import DateTimeRange from 'components/ui/Inputs/DateTimeRange'
import FormError from 'components/ui/Form/FormError'
import EventInputsForm from 'components/Calendar/components/EditEventModal/components/EventInputsForm'
import PricingForm from 'components/Calendar/components/EditEventModal/components/PricingForm'
import Expenses from 'components/Calendar/components/EditEventModal/components/Expenses'
import {
  confirmEventRequest,
  declineEventRequest,
  deleteEvent,
  draftEventRequest,
  sendEventRequest
} from 'components/Events/actions'
import {confirmOpen, editEventOpen} from 'components/Modal/actions'
import {taskNegotiationDeclineConditions} from 'components/TaskNegotiation/actions'
import MeetingForm from 'components/Calendar/components/EditEventModal/components/MeetingForm'
import {parserPrice} from 'utils/formatters'

interface Props {
  onCancel?: () => void
  initialValues?: any,
  handleSubmit?: (e) => void
  onSubmit: (data) => void
  event?: IEvent
}

let EventExpenseForm = ({event, handleSubmit}: Props) => {
  const error = useSelector((state: IRootState) => state.event.formError)
  const formLoading = useSelector((state: IRootState) => state.event.formLoading)
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)

  const handleEdit = () => {
   // dispatch(deleteEvent(event.id))
  }



  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      {formLoading ? <Loader/> : <>
        <div className={styles.form}>
          <Field
            name="type"
            component={Input}
            showIcon={false}
            label="Expense type"
            validate={required}
          />

          <Field
            name="amount"
            component={Input}
            showIcon={false}
            label="Price amount"
            parse={parserPrice}
            validate={required}
          />
        </div>

        {!formLoading && <div className={styles.buttons}>
          <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true} size={'12px 40px'}
                  type={'submit'} onClick={handleEdit}>Save</Button>

        </div>}
      </>}
    </form>
  )
}

EventExpenseForm   = reduxForm (
{
  form: 'EventExpenseForm',
}
) (EventExpenseForm )

const selector = formValueSelector('EventExpenseForm')
EventExpenseForm = connect(state =>
{
  // can select values individually
//  const categoryId = selector(state, 'categoryId')

  return {}
}
)(EventExpenseForm)
export default EventExpenseForm
