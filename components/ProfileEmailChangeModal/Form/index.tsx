import Button from 'components/ui/Button'
import FormError from 'components/ui/Form/FormError'
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import { IRootState } from 'types'
import styles from './index.module.scss'
import {email, required} from 'utils/validations'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'

let ProfileEmailChangeForm = props => {
  const {t} = useTranslation('common')
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.profile.formError)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="email"
        label={t('personalArea.emailChange.fieldEmail')}
        component={Input}
        validate={[required, email]}
      />
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button green largeFont size="16px 0">{t('personalArea.emailChange.buttonConfirm')}</Button>
      </div>
    </form>
  )
}

ProfileEmailChangeForm = reduxForm ({
  form: 'ProfileEmailChangeForm',
}) (ProfileEmailChangeForm)

export default ProfileEmailChangeForm
