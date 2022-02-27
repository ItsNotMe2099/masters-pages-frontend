import styles from './index.module.scss'
import { IField, InputStyleType, IOption } from 'types/types'
import { useField } from 'formik'
import FieldError from 'components/ui/FieldError'
import Select from 'components/fields/Select'
import {InputActionMeta} from 'react-select'

interface Props<T> extends IField<T> {
  options: IOption<T>[]
  styleType?: InputStyleType
  onMenuOpen?: () => void
  onInputChange: (newValue: string, actionMeta: InputActionMeta) => void
}

export default function SelectField<T>(props: Props<T>) {
  const [field, meta, helpers] = useField(props)
  const showError = meta.touched && !!meta.error

  return (
    <div className={styles.root}>
      <Select<T>
        label={props.label}
        styleType={props.styleType}
        options={props.options}
        value={field.value}
        hasError={showError}
        placeholder={props.placeholder ?? props.label}
        onMenuOpen={props.onMenuOpen}
        onInputChange={props.onInputChange}
        onChange={(value) => {
          helpers.setValue(value)
        }}
      />
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
