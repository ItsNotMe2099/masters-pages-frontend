import TaskOfferAcceptForm from "components/TaskNegotiation/TaskOfferAcceptModal/TaskOfferAcceptForm";
import Button from "components/ui/Button";
import FormError from "components/ui/Form/FormError";
import Input from "components/ui/Inputs/Input";
import { RadioList } from "components/ui/Inputs/RadioList";
import SelectInput from "components/ui/Inputs/SelectInput";
import TextArea from "components/ui/Inputs/TextArea";
import { format } from "date-fns";
import CreateTaskForm from "pages/CreateTaskPage/Form";
import { useEffect, useState } from "react";
import * as React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { IRootState, ITask, ITaskNegotiation } from "types";
import { connect,  } from 'react-redux'
import { maskBirthDate } from "utils/masks";
import { arrayNotEmpty, required } from "utils/validations";
import styles from './index.module.scss'
import { Field, reduxForm,formValueSelector } from 'redux-form'
interface Props{
  taskNegotiation: ITaskNegotiation
}
let TaskEditConditionsForm = (props) => {
  const error = useSelector((state: IRootState) => state.profile.formError)

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
        <div className={styles.taskPriceDetails}>
          <div className={styles.taskPriceDetailsItem}>
            <div className={styles.taskPriceDetailsItemLabel}>{props.taskNegotiation.priceType === 'fixed' ? 'Fixed price:' : 'Rate per hour:'}</div>
            <div className={styles.taskPriceDetailsItemValue}>$ {props.taskNegotiation.priceType === 'fixed' ? props.taskNegotiation.budget : `${props.taskNegotiation.ratePerHour}/h`}</div>
          </div>
          <div className={styles.taskPriceDetailsItem}>
            <div className={styles.taskPriceDetailsItemLabel}>Dead line:</div>
            <div className={styles.taskPriceDetailsItemValue}>{props.taskNegotiation.deadline ? format(new Date(props.taskNegotiation.deadline), 'MM.dd.yyy') : 'N/A'} </div>
          </div>
        </div>
    <div className={styles.offerDetails}>
        <div className={styles.offerDetailsForRow}>
          <div className={styles.offerDetailsForRowLabel}>Price:</div>
          <div className={styles.offerDetailsForRowFields}>
            <div className={styles.offerDetailsForRowFieldsWrapper}>
            <Field
              name="offerPriceType"
              component={SelectInput}
              withIcon={false}
              size={'small'}
              validate={required}
              options={[
                {label: 'Fixed price', value: 'fixed'},
                {label: 'Rate per hour', value: 'rate'}
              ]}
            />
            {props.offerPriceType === 'fixed' && <Field
              name="budget"
              size={'small'}
              component={Input}
              validate={required}
              format={(value) => `$ ${value || ''}`}
              parse={(value) => value ? parseFloat(value?.replace('$', '').replace(/\s/g, '')) : null}     />}
            {props.offerPriceType === 'rate' && <Field
              name="ratePerHour"
              component={Input}
              size={'small'}
              format={(value) => `$ ${value || ''}`}
              parse={(value) => value ? parseFloat(value?.replace('$', '').replace(/\s/g, '')) : null}

              validate={required}
            />}
            </div>
          </div>
        </div>
        <div className={styles.offerDetailsForRow}>
          <div className={styles.offerDetailsForRowLabel}>Deadline:</div>
          <div className={styles.offerDetailsForRowFields}>
            <div className={styles.offerDetailsForRowFieldsWrapper}>
              <Field
                name="deadline"
                component={Input}
                label="Deadline"
                validate={required}
                size={'small'}
                labelType={'placeholder'}
                {...maskBirthDate}
              />
            </div>

          </div>
        </div>
      </div>

      <div className={styles.containerButtons}>
      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button className={styles.button} white={true} borderGrey={true} bold={true} size={'12px 40px'} type={'button'} onClick={props.onCancel}>Cancel</Button>
        <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true} size={'12px 40px'} type={'submit'}>Send offer</Button>
      </div>
      </div>
    </form>
  )
}


TaskEditConditionsForm  = reduxForm({
  form: 'taskEditConditionsForm',

}) (TaskEditConditionsForm )
const selector = formValueSelector('taskEditConditionsForm') // <-- same as form name
TaskEditConditionsForm = connect(state => {
  const offerPriceType = selector(state, 'offerPriceType')
  return {
    offerPriceType: !offerPriceType ? 'fixed' : offerPriceType,
  }
})(TaskEditConditionsForm)

export default TaskEditConditionsForm
