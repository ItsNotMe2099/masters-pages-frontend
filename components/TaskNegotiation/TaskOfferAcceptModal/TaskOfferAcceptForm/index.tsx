import Button from 'components/ui/Button'
import FormError from 'components/ui/Form/FormError'
import Input from 'components/ui/Inputs/Input'
import { RadioList } from 'components/ui/Inputs/RadioList'
import SelectInput from 'components/ui/Inputs/SelectInput'
import TextArea from 'components/ui/Inputs/TextArea'
import { format } from 'date-fns'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { IRootState, ITask } from 'types'
import { connect,  } from 'react-redux'
import { required } from 'utils/validations'
import styles from './index.module.scss'
import { Field, reduxForm,formValueSelector } from 'redux-form'
import {getCurrencySymbol} from 'data/currency'
import { useTranslation } from 'next-i18next'
import InputDate from 'components/ui/Inputs/InputDate'
interface Props{
  task: ITask
}
let TaskOfferAcceptForm = (props) => {
  const error = useSelector((state: IRootState) => state.profile.formError)
  const task = useSelector((state: IRootState) => state.taskOffer.currentTask)
  const {t} = useTranslation('common')

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>

      <div className={styles.container}>
        <Field
          name="message"
          component={TextArea}
          label={t('taskNegotiation.coverLetter')}
          labelType={'static'}
          validate={required}
        />
        <Field
          name="offerAcceptType"
          component={RadioList}
          validate={required}
          options={[
            {label: t('taskNegotiation.agreeWith'), value: 'agree'},
            {label: t('taskNegotiation.iWant'), value: 'custom'}
          ]}
        />


      </div>

        <div className={styles.taskPriceDetails}>
          <div className={styles.taskPriceDetailsItem}>
            <div className={styles.taskPriceDetailsItemLabel}>{props.task.priceType === 'fixed' ? `${t('fixedPrice')}:` : `${t('perHour')}:`}</div>
            <div className={styles.taskPriceDetailsItemValue}>{getCurrencySymbol(props.task.currency)} {props.task.priceType === 'fixed' ? props.task.budget : `${props.task.ratePerHour}/${t('priceRateSuffix')}`}</div>
          </div>
          <div className={styles.taskPriceDetailsItem}>
            <div className={styles.taskPriceDetailsItemLabel}>{`${t('deadline')}:`}</div>
            <div className={styles.taskPriceDetailsItemValue}>{props.task.deadline ? format(new Date(props.task.deadline), 'MM.dd.yyy') : 'N/A'} </div>
          </div>
        </div>
      {props.offerAcceptType === 'custom' && <div className={styles.offerDetails}>
        <div className={styles.offerDetailsForRow}>
          <div className={styles.offerDetailsForRowLabel}>{`${t('price')}:`}</div>
          <div className={styles.offerDetailsForRowFields}>
            <div className={styles.offerDetailsForRowFieldsWrapper}>
            <Field
              name="priceType"
              component={SelectInput}
              withIcon={false}
              size={'small'}
              validate={required}
              options={[
                {label: t('fixedPrice'), value: 'fixed'},
                {label: t('perHour'), value: 'rate'}
              ]}
            />
            {props.priceType === 'fixed' && <Field
              name="budget"
              size={'small'}
              component={Input}
              validate={required}
              format={(value) => `${getCurrencySymbol(task.currency)} ${value || ''}`}
              parse={(value) => value ? parseFloat(value?.replace(getCurrencySymbol(task.currency), '').replace(/\s/g, '')) : null}     />}
            {props.priceType === 'rate' && <Field
              name="ratePerHour"
              component={Input}
              size={'small'}
              format={(value) => `${getCurrencySymbol(task.currency)} ${value || ''}`}
              parse={(value) => value ? parseFloat(value?.replace(getCurrencySymbol(task.currency), '').replace(/\s/g, '')) : null}

              validate={required}
            />}
            </div>
          </div>
        </div>
        <div className={styles.offerDetailsForRow}>
          <div className={styles.offerDetailsForRowLabel}>{`${t('deadline')}:`}</div>
          <div className={styles.offerDetailsForRowFields}>
            <div className={styles.offerDetailsForRowFieldsWrapper}>
              <Field
                name="deadline"
                component={InputDate}
                label={t('deadline')}
                validate={required}
                size={'small'}
                labelType={'placeholder'}
              />
            </div>

          </div>
        </div>
      </div>}

      <div className={styles.containerButtons}>
      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button className={styles.button} white={true} borderGrey={true} bold={true} size={'12px 40px'} type={'button'} onClick={props.onCancel}>{t('cancel')}</Button>
        <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true} size={'12px 40px'} type={'submit'}>{t('save')}</Button>
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
  const priceType = selector(state, 'priceType')
  const offerAcceptType = selector(state, 'offerAcceptType')
  return {
    priceType: offerAcceptType === 'custom' && !priceType ? 'fixed' : priceType,
    offerAcceptType
  }
})(TaskOfferAcceptForm)

export default TaskOfferAcceptForm
