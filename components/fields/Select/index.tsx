import styles from './index.module.scss'
import { InputStyleType, IOption } from 'types/types'
import ReactSelect, {components, InputActionMeta} from 'react-select'
import { DropdownIndicatorProps } from 'react-select/dist/declarations/src/components/indicators'
import { GroupBase } from 'react-select/dist/declarations/src/types'
import classNames from 'classnames'
import usePressAndHover from 'hooks/usePressAndHover'

interface Props<T> {
  label?: string
  styleType: InputStyleType
  options: IOption<T>[]
  value: T
  onChange: (value: T) => void
  hasError?: boolean
  placeholder?: string
  onMenuOpen?: () => void
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void
}
const CustomOption = (props) =>
{
  const { innerProps, isDisabled, isSelected, data: {label, value} } = props
  console.log('CustomOption', props)
 return  !isDisabled ? (
    <div {...innerProps} className={styles.option}><div
      className={classNames({[styles.circle]: true, [styles.active]: isSelected})}/>{label}</div>
  ) : null
}
export default function Select<T>(props: Props<T>) {
  const selected = props.options.find(item => item.value == props.value)
  const [ref, press, hover] = usePressAndHover()

  return (
    <div className={styles.root} ref={ref}>
       <div className={classNames({
          [styles.label]: true,
        })}>
          {props.label}
        </div>
      <ReactSelect<IOption<T>>
        defaultValue={selected}
        value={selected}
        isMulti={false}
        onMenuOpen={props.onMenuOpen}
        className={classNames({
          [styles.input]: true,
          [styles.error]: props.hasError,
          [styles.hover]: hover,
          [styles.press]: press,
        }, styles[props.styleType])}
        classNamePrefix="ma-select"
        isSearchable={true}
        placeholder={props.placeholder}
        onInputChange={props.onInputChange}
        onChange={(option) => {
          props.onChange((option as IOption<T>).value)
        }}
        options={props.options as any}
        components={{ DropdownIndicator, Option: CustomOption }}
      />
    </div>
  )
}

const DropdownIndicator = (props: DropdownIndicatorProps<IOption<any>, false, GroupBase<IOption<any>>>) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <img src="/img/field/arrowDown.svg" alt="" className={classNames({
          [styles.indicator]: true,
          [styles.indicatorInverse]: props.selectProps.menuIsOpen,
        })}/>
      </components.DropdownIndicator>
    )
  )
}
