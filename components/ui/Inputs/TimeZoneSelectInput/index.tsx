import styles from './index.module.scss'
import classNames from 'classnames'
import { useState } from 'react'
//import TimezoneSelect, { type ITimezone } from 'react-timezone-select'

interface Props {
  input: any,
  disabled?: boolean
  className?: string
}

export default function TimeZoneSelectInput(props: Props) {
  const { value, onChange } = props.input
  const { disabled } = props
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const handleChange = (v) => {
    onChange(v)
  }

  return (
    {/*<TimezoneSelect
      value={timezone}
      onChange={handleChange}
  />*/}
  )
}
