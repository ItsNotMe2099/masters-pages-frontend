import FormError from 'components/ui/Form/FormError'
import * as React from 'react'
import { useSelector, connect } from 'react-redux'
import { IRootState } from 'types'
import styles from './index.module.scss'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { useTranslation } from 'next-i18next'
import TextArea from 'components/ui/Inputs/TextArea'
import Button from 'components/PublicProfile/components/Button'
import {bioMaxLength} from 'utils/validations'
interface Props{
  onCancel: () => void,
  handleSubmit?: () => void,
  onSubmit?: (data) => void
  initialValues?: any
}
let CardBioForm = (props: Props) => {
  const { t } = useTranslation('common')
  const error = useSelector((state: IRootState) => state.profile.formErrorByKey['bio'])

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <Field
        name="bio"
        component={TextArea}
        labelType="placeholder"
        label={t('personalArea.profile.bio')}
        validate={[bioMaxLength]}
      />

      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button size={'small'} type={'button'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
        <Button size={'small'} type={'submit'}>{t('task.save')}</Button>
      </div>

    </form>
  )
}

CardBioForm  = reduxForm({
  form: 'cardBioForm',

}) (CardBioForm)


const selector = formValueSelector('cardBioForm') // <-- same as form name
CardBioForm = connect(state => {
  return {

  }
})(CardBioForm)
export default CardBioForm
