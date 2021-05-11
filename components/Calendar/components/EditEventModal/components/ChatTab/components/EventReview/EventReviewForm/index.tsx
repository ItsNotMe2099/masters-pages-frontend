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
import StateButton from 'components/Calendar/components/EditEventModal/components/StateButton'
import Modal from 'components/ui/Modal'
import Rating from 'components/ui/Inputs/Rating'

interface Props {
  onCancel?: () => void
  initialValues?: any,
  handleSubmit?: (e) => void
  onSubmit: (data) => void
  event?: IEvent
}

let EventReviewForm = ({event, handleSubmit}: Props) => {
  const error = useSelector((state: IRootState) => state.event.formFeedbackError)
  const formLoading = useSelector((state: IRootState) => state.event.formLoading)
  const otherSide = event.isAuthor ? event.participant : event.author;


  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <div className={styles.title}>Describe your work experience with  <a href={`/PublicProfile/${otherSide.id}`} target={'_blank'} className={styles.profileName}>{otherSide.firstName} {otherSide.lastName}</a></div>
      <Field
        name="title"
        component={Input}
        label="Title"
      />
      <Field
        name="description"
        component={TextArea}
        label="Description"
      />
      <div className={styles.mark}>
      <Field
        name="mark"
        component={Rating}
      />
      </div>
      <FormError error={error}/>
      {!formLoading && <div className={styles.buttons}>


        <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true} size={'12px 40px'}
                type={'submit'}>Submit review</Button>

      </div>}
    </form>
  )
}

EventReviewForm   = reduxForm (
{
  form: 'EventReviewForm',
}
) (EventReviewForm )

const selector = formValueSelector('EventReviewForm')
EventReviewForm = connect(state =>
{
  // can select values individually
//  const categoryId = selector(state, 'categoryId')

  return {}
}
)(EventReviewForm)
export default EventReviewForm
