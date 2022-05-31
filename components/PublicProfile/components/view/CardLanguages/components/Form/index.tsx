import FormError from 'components/ui/Form/FormError'
import * as React from 'react'
import { useSelector, connect } from 'react-redux'
import { IRootState } from 'types'
import styles from './index.module.scss'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { useTranslation } from 'next-i18next'
import Button from 'components/PublicProfile/components/Button'
import SelectInput from 'components/ui/Inputs/SelectInput'
import {LanguagesList} from 'data/languages'
import {required} from 'utils/validations'
interface Props{
  onCancel: () => void,
  handleSubmit?: () => void,
  onSubmit?: (data) => void
}
let LanguageForm = (props: Props) => {
  const { t } = useTranslation('common')
  const error = useSelector((state: IRootState) => state.profile.formErrorByKey['language'])

  return (
    <form className={styles.root} onSubmit={props.handleSubmit}>
      <Field
        name="language"
        component={SelectInput}
        size={'small'}
        labelType="placeholder"
        label={t('personalArea.tabSettings.fieldLanguage')}
        validate={[required]}
        options={Object.keys(LanguagesList).map(key => ({value: key, label: LanguagesList[key].name}))}
      />
      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button size={'small'} type={'button'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
        <Button size={'small'} type={'submit'}>{t('task.save')}</Button>
      </div>

    </form>
  )
}

LanguageForm  = reduxForm({
  form: 'languageForm',
}) (LanguageForm)

const selector = formValueSelector('languageForm') // <-- same as form name
LanguageForm = connect(state => {
  return {

  }
})(LanguageForm)
export default LanguageForm
