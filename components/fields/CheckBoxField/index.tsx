import {FieldConfig, useField, useFormikContext} from 'formik'
import styles from 'components/fields/CheckBoxField/index.module.scss'
import {CustomCheckbox} from 'components/ui/CustomCheckbox'
import FieldError from 'components/ui/FieldError'
import {ReactElement} from 'react'
import classNames from 'classnames'

interface Props {
  label?: string | ReactElement
  disabled?: boolean
  className?: string
}

const CheckBoxField = (props: Props & FieldConfig) => {
  const [field, meta] = useField(props)
  const { setFieldValue, setFieldTouched, validateField } = useFormikContext()
  const hasError = !!meta.error && meta.touched

  return (
    <div className={classNames(styles.root, props.className)}>
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
