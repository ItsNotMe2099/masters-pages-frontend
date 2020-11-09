import { SelectInput } from "components/ui/Inputs/SelectInput";
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
  const handleOnSearchChange = (value) => {
    if(!value){
      return;
    }
    setValue(value)
    //dispatch(fetchCategory())
  }
  return (
    <div onClick={() => {dispatch(fetchCategory())}}>
      <SelectInput {...props} options={categories} onSearchChange={handleOnSearchChange} isCategory={true} isTask={true}/>
    </div>
  )
}
