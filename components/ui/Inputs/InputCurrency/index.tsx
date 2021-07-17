import {  fetchLocationCountries } from "components/ui/Inputs/InputCountry/actions";
import SelectInput from "components/ui/Inputs/SelectInput";
import { useEffect, useState } from "react";
import { IRootState } from "types";
import { useDebouncedCallback } from "use-debounce";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {getCurrencies} from 'data/currency'

interface Props {

}

export default function InputCurrency(props) {
const baseOptions = Object.entries(getCurrencies()).map(([key, value]) => ({label: key, value: key}))
  const [options, setOptions] = useState(baseOptions);

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
