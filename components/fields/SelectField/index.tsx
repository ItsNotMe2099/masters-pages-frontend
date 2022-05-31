import styles from './index.module.scss'
import {IField, InputStyleType, IOption, LabelStyleType} from 'types/types'
import { useField } from 'formik'
import FieldError from 'components/ui/FieldError'
import Select from 'components/fields/Select'
import {InputActionMeta} from 'react-select'

interface Props<T> extends IField<T> {
  key?: string //update loadOptions
  options?: IOption<T>[]
  styleType?: InputStyleType
  labelType?: LabelStyleType
  onMenuOpen?: () => void
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void
  loadOptions?: (initialValue) => Promise<IOption<T>[]>
}

export default function SelectField<T>(props: Props<T>) {
  const [field, meta, helpers] = useField(props)
  const showError = meta.touched && !!meta.error
  return (
    <div className={styles.root}>
      <Select<T>
        key={props.key}
        label={props.label}
        styleType={props.styleType}
        labelType={props.labelType}
        options={props.options}
        value={field.value}
        hasError={showError}
        placeholder={props.placeholder ?? props.label}
        onMenuOpen={props.onMenuOpen}
        onInputChange={props.onInputChange}
        loadOptions={props.loadOptions}
        onChange={(value) => {
          console.log("SetValue", value);
          helpers.setValue(value)
        }}
      />
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
