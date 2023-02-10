import Radio from './Radio'
import styles from './index.module.scss'
import classNames from "classnames"
import { IField } from 'types/types'
import { useField, useFormikContext } from 'formik'

interface IOption {
  value: string
  label: string
}

interface Props<T> extends IField<T> {
  options: IOption[],
  onSearchChange?: (string) => void,
  onOpenDropDown?: () => void;
  allowCustomInput?: boolean,
  changeWithValue?: boolean
  restrictedValues?: string[],
  grid?: number
  label?: string
  itemClassName?: string
  itemLabelClassName?: string
  labelClassName?: string
  flex?: boolean
}

export default function RadioListField<T>(props: Props<string>) {
  const { restrictedValues, options, label, type, ...rest } = props
  const [field, meta] = useField(props)
  const {value} = field
  const { setFieldValue, setFieldTouched } = useFormikContext()

  const handleCheckboxChanged = (value: string) => {
      setFieldValue(props.name, value)
  }

  return (
    <div className={styles.root}>
      {label && <div className={classNames(styles.label, props.labelClassName)}>{label}</div>}

      <div  style={{
      display: (props.grid) ? 'grid' : (props.flex) ? 'flex' : 'block',
      gridTemplateColumns: props.grid ? Array.from({ length: props.grid }, (_, i) => '1fr').join(' ') : '',
      gridGap: '1vw'
    }}>
      {options.filter(item => restrictedValues.indexOf(item.value) === -1).map(item => (
        <div className={styles.radio}>
          <Radio
            className={classNames(props.itemClassName, [...(!props.grid ? [styles.radioNoGrid] : [] )])}
            labelClassName={props.itemLabelClassName}
                     value={item.value} isActive={item.value === value} label={item.label} 
                     onChange={() => handleCheckboxChanged(item.value)}/>
        </div>
      ))}
      </div>
    </div>

  )
}

RadioListField.defaultProps = {
  labelType: 'static',
  restrictedValues: []
}
