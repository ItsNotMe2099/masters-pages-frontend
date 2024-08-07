import ErrorInput from 'components/ui/Inputs/Input/components/ErrorInput'
import Radio from 'components/ui/Inputs/RadioList/Radio'
import styles from './index.module.scss'
import classNames from "classnames";

interface Props {
  options: [{ value: string, label: string }],
  onSearchChange?: (string) => void,
  onOpenDropDown?: () => void;
  allowCustomInput?: boolean,
  input: any
  changeWithValue?: boolean
  restrictedValues: any[],
  grid: number
  label: string
  itemClassName?: string
  itemLabelClassName?: string
  labelClassName?: string
}

export const RadioList = (props) => {
  const { meta: { error, touched },restrictedValues, input, options, label, type, ...rest } = props

  const handleCheckboxChanged = (value) => {
      input.onChange(value)
  }

  return (
    <div className={styles.root}>
      {label && <div className={classNames(styles.label, props.labelClassName)}>{label}</div>}

      <div  style={{
      display: (props.grid) ? 'grid' : 'block',
      gridTemplateColumns: props.grid ? Array.from({ length: props.grid }, (_, i) => '1fr').join(' ') : '',
      gridGap: '1vw'
    }}>
      {options.filter(item => restrictedValues.indexOf(item.value) === -1).map(item => (
        <div className={styles.radio}>
          <Radio
            className={classNames(props.itemClassName, [...(!props.grid ? [styles.radioNoGrid] : [] )])}
            labelClassName={props.itemLabelClassName}
                     value={item.value} isActive={item.value === input.value} label={item.label} onChange={handleCheckboxChanged}/>
        </div>
      ))}
      <ErrorInput {...props}/>
      </div>
    </div>

  )
}

RadioList.defaultProps = {
  labelType: 'static',
  restrictedValues: []
}
