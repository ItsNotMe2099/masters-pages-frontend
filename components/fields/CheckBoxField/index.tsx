import {FieldConfig, useField, useFormikContext} from 'formik'
import styles from 'components/fields/CheckBoxField/index.module.scss'
import ErrorInput from 'components/ui/Formik/components/ErrorInput'
import {CustomCheckbox} from 'components/ui/CustomCheckbox'
import FieldError from 'components/ui/FieldError'
import {ReactElement} from 'react'
interface Props {
  label?: string | ReactElement
  disabled?: boolean
}

const CheckBoxField = (props: Props & FieldConfig) => {
  const [field, meta] = useField(props)
  const { setFieldValue, setFieldTouched, validateField } = useFormikContext()
  const hasError = !!meta.error && meta.touched

  return (
    <div className={styles.root}>
      <CustomCheckbox
        checked={field.value}
        disabled={props.disabled}
        label={props.label}
        onChange={(val) => setFieldValue(props.name, val)}
      />
      <FieldError showError={hasError}>{meta.error}</FieldError>
    </div>
  )
}
export default CheckBoxField
