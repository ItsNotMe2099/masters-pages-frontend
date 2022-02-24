import styles from './index.module.scss'
import { FieldConfig, useField } from 'formik'
import cx from 'classnames'
import ErrorInput from 'components/ui/Formik/components/ErrorInput'

interface Props {
  label?: string
  placeholder?: string
  disabled?: boolean
}

export default function TextAreaInput(props: Props & FieldConfig) {
  const { label, placeholder } = props
  const [field, meta] = useField(props)
  const hasError = !!meta.error && meta.touched
  return (
    <div className={cx(styles.root, { [styles.hasError]: !!meta.error && meta.touched })}>
      <textarea
        {...field}
        disabled={props.disabled}
        placeholder={placeholder}
        className={cx(styles.textarea, { [styles.error]: hasError })}
      />
      <ErrorInput  {...meta} />
    </div>
  )
}
