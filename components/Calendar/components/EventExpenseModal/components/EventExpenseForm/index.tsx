import Button from 'components/ui/Button'
import Input from 'components/ui/Inputs/Input'
import Loader from 'components/ui/Loader'

import * as React from 'react'
import {IEvent, IRootState} from 'types'
import {required} from 'utils/validations'
import styles from './index.module.scss'

import {useSelector} from 'react-redux'

import {Field, reduxForm, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'


import {parserPrice} from 'utils/formatters'
import { useTranslation } from 'next-i18next'

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
  const {t} = useTranslation('common')

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
            label={t('expenseType')}
            validate={required}
          />

          <Field
            name="amount"
            component={Input}
            showIcon={false}
            label={t('priceAmount')}
            parse={parserPrice}
            validate={required}
          />
        </div>

        {!formLoading && <div className={styles.buttons}>
          <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true} size={'12px 40px'}
                  type={'submit'} onClick={handleEdit}>{t('save')}</Button>

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
