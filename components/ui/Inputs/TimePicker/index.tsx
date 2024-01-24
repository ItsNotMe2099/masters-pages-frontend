import styles from './index.module.scss'
import RCTimePicker from 'rc-time-picker'
// theme css file
import 'rc-time-picker/assets/index.css'
import classNames from 'classnames'

interface Props {
  input: any,
  disabledHours?: () => number[]
  disabledMinutes?: () => number[]
  disabled?: boolean
  className?: string
}

export default function TimePicker(props: Props) {
  const { value, onChange } = props.input
  const { disabledHours, disabledMinutes, disabled } = props
  const handleChange = (v) => {
    onChange(v)
  }

  return (
    <RCTimePicker
      className={classNames(styles.input, props.className)}
      showSecond={false}
      clearIcon={<div />}
      minuteStep={5}
      disabled={disabled}
      use12Hours
      onChange={handleChange}
      value={value}
      disabledHours={disabledHours}
      disabledMinutes={disabledMinutes}
    />
  )
}
