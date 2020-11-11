import { useState } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Field } from 'redux-form'
import { fetchSubCategory } from "./actions";
import { required } from "utils/validations";
import InputCategory from "components/ui/Inputs/InputCategory";
import Button from "components/ui/Button";

interface Props {

}

export default function CheckboxSubCategory(props) {
  const dispatch = useDispatch()
  const categories = useSelector((state: IRootState) => state.categoryInput.categories)
  const subCategories = useSelector((state: IRootState) => state.subCategoryCheckbox.subCategories)
  const [value, setValue] = useState();
  const [subCategoriesList, setItems] = useState([])

  const handleCheckbox = (event) => {
    if (event.target.checked) {
        console.log('checked')
        setItems([...subCategoriesList, +event.target.value])
        console.log(subCategoriesList)
    }
    else{
      console.log('not checked')
      const index = subCategoriesList.indexOf(+event.target.value)
      setItems(subCategoriesList => subCategoriesList.splice(index, 1))
      console.log(subCategoriesList)
    }
  }

  const handleInput = (value) => {
    setValue(value); 
    console.log('working', value)
    if(value){
      dispatch(fetchSubCategory(value))
      console.log('dispatch')
    }
  }

  return (
    <>
    <Field
      name="categoryId"
      component={InputCategory}
      label="Category*"
      validate={required}
      onChange={handleInput}
    />
    {value ?
    <div>
      {subCategories.map(item => (
        <div className={styles.checkbox}>
        <input
        type="checkbox"
        value={item.id}
        onChange={handleCheckbox}
        >
        </input>
        <label><span>{item.name}</span></label>
        </div>
        ))}
        <div className={styles.btnContainer}>
        <Button grey largeFont size="14px 50px">Save сategory</Button>
        </div>
    </div>
    :
    null
    }
    </>
  )
}
