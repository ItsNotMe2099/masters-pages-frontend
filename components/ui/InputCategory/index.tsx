import { SelectInput } from "components/ui/SelectInput";
import { useState } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategory } from "./actions";

interface Props {

}

export default function InputCategory(props) {
  const dispatch = useDispatch()
  const [value, setValue] = useState();
  const categories = useSelector((state: IRootState) => state.categoryInput.categories)
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
    dispatch(fetchCategory())
  }
  return (
    <SelectInput {...props} options={categories} input={{value: value, onChange: handleOnChange}} onSearchChange={handleOnSearchChange} isCategory={true} onClick={dispatch(fetchCategory())}/>
  )
}
