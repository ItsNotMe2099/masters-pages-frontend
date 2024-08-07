import FormError from 'components/ui/Form/FormError'
import * as React from 'react'
import { useSelector, connect } from 'react-redux'
import { IRootState } from 'types'
import styles from './index.module.scss'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { useTranslation } from 'next-i18next'
import Button from 'components/PublicProfile/components/Button'
import InputAddress from 'components/ui/Inputs/InputAddress'
import {RadioList} from 'components/ui/Inputs/RadioList'
import {useState} from 'react'
import {required} from 'utils/validations'
interface Props{
  onCancel: () => void,
  handleSubmit?: () => void,
  onSubmit?: (data) => void
}
let PreferWorkInForm = (props: Props) => {
  const { t } = useTranslation('common')
  const error = useSelector((state: IRootState) => state.profile.formErrorByKey['preferWorkIn'])
  const [showAddress, setShowAddress] = useState(false)
  const handleTypeChange = (value) => {
   if(value === 'offline'){
     setShowAddress(true)
   }else{
     setShowAddress(false)
   }
  }
  return (
    <form className={styles.root} onSubmit={props.handleSubmit}>
      <Field
        name="type"
        component={RadioList}
        grid={2}
        onChange={handleTypeChange}
        size={'small'}
        labelType="placeholder"
        label={t('type')}
        options={[{label: t('online'), value: 'online'}, {label: t('offline'), value: 'offline'}]}
        validate={required}
      />
      {showAddress && <Field
        name="location"
        component={InputAddress}
        size={'small'}
        labelType="placeholder"
        label={t('personalArea.tabProfile.fieldAddress')}
        validate={required}
      />}

      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button size={'small'} type={'button'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
        <Button size={'small'} type={'submit'}>{t('task.save')}</Button>
      </div>

    </form>
  )
}

PreferWorkInForm  = reduxForm({
  form: 'preferWorkInForm',
}) (PreferWorkInForm)

const selector = formValueSelector('preferWorkInForm') // <-- same as form name
PreferWorkInForm = connect(state => {
  return {

  }
})(PreferWorkInForm)
export default PreferWorkInForm
