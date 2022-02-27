import SelectInput from 'components/ui/Inputs/SelectInput'
import { useState } from 'react'
import {getCurrencies} from 'data/currency'

interface Props {

}

export default function InputCurrency(props) {
const baseOptions = Object.entries(getCurrencies()).map(([key, value]) => ({label: key, value: key}))
  const [options, setOptions] = useState(baseOptions)

  const handleSearchChange = (value) => {
    if(!value){
      setOptions(baseOptions)

    }else{
      setOptions(baseOptions.filter(item => item.label.toLowerCase().indexOf(value.toLowerCase()) === 0))

    }
  }
  return (
    <SelectInput {...props} options={options} onSearchChange={handleSearchChange}/>
  )
}
