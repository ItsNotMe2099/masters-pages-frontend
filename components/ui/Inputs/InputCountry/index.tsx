import {  fetchLocationCountries } from "components/ui/Inputs/InputCountry/actions";
import { SelectInput } from "components/ui/Inputs/SelectInput";
import { useEffect, useState } from "react";
import { IRootState } from "types";
import { useDebouncedCallback } from "use-debounce";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'

interface Props {

}

export default function InputCountry(props) {
  const dispatch = useDispatch()
  const [value, setValue] = useState();
  const countries = useSelector((state: IRootState) => state.countryInput.countries)
  const handleOnChange = (value) => {
    console.log("OnChangeLocValue", value)
    props.input.onChange(value);
  }
  useEffect(() => {
    dispatch(fetchLocationCountries({
      page: 1,
    }))
  }, [])
  const handleOnSearchChange = useDebouncedCallback((value) => {

    console.log("search change", value)
    if(!value){
      return;
    }
    setValue(value)
    dispatch(fetchLocationCountries({
      search: value,
      page: 1,
    }))
  }, 400);

  return (
    <SelectInput {...props} options={countries} onSearchChange={(e) => handleOnSearchChange.callback(e)} isLocation={true}/>
  )
}
