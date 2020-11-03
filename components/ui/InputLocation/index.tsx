import { fetchLocationCity } from "components/ui/InputLocation/actions";
import { SelectInput } from "components/ui/SelectInput";
import { useState } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'

interface Props {

}

export default function InputLocation(props) {
  const dispatch = useDispatch()
  const [value, setValue] = useState();
  const cities = useSelector((state: IRootState) => state.locationInput.cities)
  const handleOnChange = (value) => {
    console.log("OnChangeLocValue", value)
    props.input.onChange(value);
  }
  const handleOnSearchChange = (e) => {
    const value = e.currentTarget.value;
    if(!value){
      return;
    }
    console.log("HandleOnChange", e.currentTarget.value);
    setValue(value)
    dispatch(fetchLocationCity({
      search: value,
      page: 1,
    }))
  }
  return (
    <SelectInput {...props} options={cities} input={{value: value, onChange: handleOnChange}} onSearchChange={handleOnSearchChange} isLocation={true}/>
  )
}
