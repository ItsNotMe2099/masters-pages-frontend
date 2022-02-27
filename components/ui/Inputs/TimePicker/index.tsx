import styles from './index.module.scss'
import RCTimePicker from 'rc-time-picker'
// theme css file
import 'rc-time-picker/assets/index.css'
interface Props {
  input: any,
  disabledHours?: () => number[]
  disabledMinutes?: () => number[]
  disabled?: boolean
}

export default function TimePicker(props: Props) {
  const { value, onChange } = props.input
  const {disabledHours, disabledMinutes, disabled} = props
  const handleChange = (v) => {
    onChange(v)
  }

  return (
    <RCTimePicker
      className={styles.input}
      showSecond={false}
      clearIcon={<div/>}
      minuteStep={5}
      disabled={disabled}
      onChange={handleChange}
      value={value}
      disabledHours={disabledHours}
      disabledMinutes={disabledMinutes}
    />
  )
}
