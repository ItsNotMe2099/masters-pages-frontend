import Button from "components/ui/Button";
import FormError from "components/ui/Form/FormError";
import Input from "components/ui/Inputs/Input";
import { RadioList } from "components/ui/Inputs/RadioList";
import SelectInput from "components/ui/Inputs/SelectInput";
import TextArea from "components/ui/Inputs/TextArea";
import CreateTaskForm from "pages/CreateTaskPage/Form";
import { useEffect, useState } from "react";
import * as React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { IRootState, ITask } from "types";
import { connect,  } from 'react-redux'
import { maskBirthDate } from "utils/masks";
import { arrayNotEmpty, required } from "utils/validations";
import styles from './index.module.scss'
import { Field, reduxForm,formValueSelector } from 'redux-form'
interface Props{
  task: ITask
}
let TaskOfferAcceptForm = (props) => {
  const error = useSelector((state: IRootState) => state.profile.formError)

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>

      <div className={styles.container}>
        <Field
          name="message"
          component={TextArea}
          label="Cover Letter"
          labelType={'static'}
          validate={required}
        />
        <Field
          name="offerAcceptType"
          component={RadioList}
          validate={required}
          options={[
            {label: 'Agree with client payment offer', value: 'agree'},
            {label: 'I want to propose different terms', value: 'custom'}
          ]}
        />


      </div>

        <div className={styles.taskPriceDetails}>
          <div className={styles.taskPriceDetailsItem}>
            <div className={styles.taskPriceDetailsItemLabel}>{props.task.priceType === 'fixed' ? 'Fixed price:' : 'Rate per hour:'}</div>
            <div className={styles.taskPriceDetailsItemValue}>$ {props.task.priceType === 'fixed' ? props.task.budget : `${props.task.ratePerHour}/h`}</div>
          </div>
          <div className={styles.taskPriceDetailsItem}>
            <div className={styles.taskPriceDetailsItemLabel}>Dead line:</div>
            <div className={styles.taskPriceDetailsItemValue}>{props.task.deadline || 'N/A'}</div>
          </div>
        </div>
      {props.offerAcceptType === 'custom' && <div className={styles.offerDetails}>
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
      </div>}

      <div className={styles.containerButtons}>
      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button className={styles.button} white={true} borderGrey={true} bold={true} size={'12px 40px'} type={'button'} onClick={props.onCancel}>Cancel</Button>
        <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true} size={'12px 40px'} type={'submit'}>Save</Button>
      </div>
      </div>
    </form>
  )
}


TaskOfferAcceptForm  = reduxForm({
  form: 'taskOfferAccept',

}) (TaskOfferAcceptForm )

const selector = formValueSelector('taskOfferAccept') // <-- same as form name
TaskOfferAcceptForm = connect(state => {
  // can select values individually
  const offerPriceType = selector(state, 'offerPriceType')
  const offerAcceptType = selector(state, 'offerAcceptType')
  console.log("offerPriceType", offerPriceType)
  return {
    offerPriceType: offerAcceptType === 'custom' && !offerPriceType ? 'fixed' : offerPriceType,
    offerAcceptType
  }
})(TaskOfferAcceptForm)

export default TaskOfferAcceptForm
