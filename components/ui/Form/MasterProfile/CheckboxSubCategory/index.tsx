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

  function remove (arr, indexes) {
    var arrayOfIndexes = [].slice.call(arguments, 1);  // (1)
    return arr.filter(function (item, index) {         // (2)
      return arrayOfIndexes.indexOf(index) == -1;      // (3)
    });
  }

  const handleCheckbox = (event) => {
    const value = +event.target.value
    if (event.target.checked) {
        setItems(subCategoriesList => [...subCategoriesList, value])
    }
    else{
      const index = subCategoriesList.indexOf(value)
      //setItems(subCategoriesList.splice(index, 1))
      setItems(subCategoriesList => remove(subCategoriesList, index))
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
        onClick={handleCheckbox}
        >
        </input>
        <label><span>{item.name}</span></label>
        </div>
        ))}
        <div className={styles.btnContainer}>
        <Button grey largeFont size="14px 50px" onClick={() => alert(subCategoriesList)}>Save сategory</Button>
        </div>
    </div>
    :
    null
    }
    </>
  )
}
