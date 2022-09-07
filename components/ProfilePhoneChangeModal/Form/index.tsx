import Button from 'components/ui/Button'
import FormError from 'components/ui/Form/FormError'
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import { IRootState } from 'types'
import styles from './index.module.scss'
import {email, phone, required} from 'utils/validations'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import InputPhone from 'components/ui/Inputs/InputPhone'

let ProfilePhoneChangeForm = props => {
  const {t} = useTranslation('common')
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.profile.formError)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="phone"
        label={t('personalArea.phoneChange.fieldPhone')}
        component={InputPhone}
        validate={[required]}
      />
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button green largeFont size="16px 0">{t('personalArea.phoneChange.buttonConfirm')}</Button>
      </div>
    </form>
  )
}

ProfilePhoneChangeForm = reduxForm ({
  form: 'ProfileEmailChangeForm',
}) (ProfilePhoneChangeForm)

export default ProfilePhoneChangeForm
