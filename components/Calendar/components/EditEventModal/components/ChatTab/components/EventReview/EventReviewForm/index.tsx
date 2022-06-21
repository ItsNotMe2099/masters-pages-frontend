import Button from 'components/ui/Button'
import Input from 'components/ui/Inputs/Input'
import TextArea from 'components/ui/Inputs/TextArea'

import * as React from 'react'
import {IEvent, IRootState} from 'types'
import {required} from 'utils/validations'
import styles from './index.module.scss'

import {useSelector} from 'react-redux'

import {Field, reduxForm, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'
import FormError from 'components/ui/Form/FormError'


import Rating from 'components/ui/Inputs/Rating'
import { useTranslation } from 'next-i18next'

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
  const otherSide = event.isAuthor ? event.participant : event.author
  const {t} = useTranslation('common')


  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <div className={styles.title}>{t('event.describeYourExperience')} <a href={`/id${otherSide.id}`} target={'_blank'} className={styles.profileName} rel="noreferrer">{otherSide.firstName} {otherSide.lastName}</a></div>
      <Field
        name="title"
        component={Input}
        label={t('title')}
      />
      <Field
        name="description"
        component={TextArea}
        label={t('description')}
      />
      <div className={styles.mark}>
      <Field
        name="mark"
        component={Rating}
        validate={required}
      />
      </div>
      <FormError error={error}/>
      {!formLoading && <div className={styles.buttons}>


        <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true} size={'12px 40px'}
                type={'submit'}>{t('event.submitReview')}</Button>

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
