import { SelectInput } from "components/ui/Inputs/SelectInput";
import { useCallback, useEffect, useState } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubCategory } from "./actions";
import { Field } from 'redux-form'
import Checkbox from "components/ui/Inputs/Checkbox";
import { fetchCategory } from "components/ui/Inputs/InputCategory/actions";

interface Props {

}

export default function CheckboxSubCategory(props) {
  const dispatch = useDispatch()
  const categories = useSelector((state: IRootState) => state.categoryInput.categories)
  const subCategories = useSelector((state: IRootState) => state.subCategoryInput.subCategories)
  const [category, setCategory] = useState('')

  return (
    <>
    <div onClick={() => {dispatch(fetchCategory())}}>
      <SelectInput {...props} options={categories}/>
    </div>
      {subCategories.map(item => (
        <Field
        component={Checkbox}
        ><span>{item.label}</span>
        </Field>))}
    </>
  )
}
