import { fetchLocationCity } from "components/ui/Inputs/InputLocation/actions";
import SelectInput from "components/ui/Inputs/SelectInput";
import { useEffect, useState } from "react";
import { IRootState } from "types";
import { useDebouncedCallback } from "use-debounce";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  input?: {
    value: any,
    name: any
    onChange: (val) => void
  }
  countryCode?: string,
}

export default function InputLocation(props: Props) {
  const dispatch = useDispatch()
  const [value, setValue] = useState();
  const cities = useSelector((state: IRootState) => state.locationInput.cities)
  const handleOnChange = (value) => {
    console.log("OnChangeLocValue", value)
    props.input.onChange(value);
  }
  useEffect(() => {
    dispatch(fetchLocationCity({
      page: 1,
      id: props.input.value,
      country: props.countryCode
    }))
  }, [props.countryCode])
  const handleOnSearchChange = useDebouncedCallback((value) => {

    console.log("search change", value)
    if(!value){
      return;
    }
    setValue(value)
    dispatch(fetchLocationCity({
      search: value,
      page: 1,
      country: props.countryCode
    }))
  }, 400);

  return (
    <SelectInput {...props} options={cities} onSearchChange={(e) => handleOnSearchChange.callback(e)} />
  )
}
