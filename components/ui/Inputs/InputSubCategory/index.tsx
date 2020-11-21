import SelectInput from "components/ui/Inputs/SelectInput";
import { useCallback, useEffect, useState } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubCategory } from "./actions";

interface Props {

}

export default function InputSubCategory(props) {
  const dispatch = useDispatch()
  const [value, setValue] = useState();
  const categories = useSelector((state: IRootState) => state.subCategoryInput.subCategories)
  const handleOnChange = (value) => {
    console.log("OnChangeLocValue", value)
    props.input.onChange(value);
  }
  const handleOnOpen = useCallback(() => {
    console.log('handleOnOpen')
    dispatch(fetchSubCategory(props.categoryId))
  }, [props.categoryId])
  const handleOnSearchChange = (value) => {
    console.log('handleOnSearchChange')
    if(!value){
      dispatch(fetchSubCategory(props.categoryId))
      return;
    }
    dispatch(fetchSubCategory(props.categoryId, value))
    setValue(value)
  }

  useEffect(() => {
    console.log("change CategoryId", props.categoryId);
  }, [props.categoryId])

  return (
    <SelectInput {...props} options={categories} onSearchChange={handleOnSearchChange} onOpenDropDown={handleOnOpen} isCategory={true} isTask={true}/>
  )
}
