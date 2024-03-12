import { DropDown } from 'components/ui/DropDown'
import { useState } from 'react'

interface OptionItem {
  label: string
  value: string
}
interface Props {

}

export default function InputTimezone(props) {
  const timezones = [
    {
      label: 'GMT -11',
      value: '-11:00'
    },

  ]
  const [options, setOptions] = useState<OptionItem[]>(timezones)

  return (
    <DropDown options={options} item={(item) => <div>{item?.label}</div>} />
  )
}
