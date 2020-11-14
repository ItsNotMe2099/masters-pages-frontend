import { useState } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Field } from 'redux-form'
import { fetchSubCategory } from "./actions";
import { required } from "utils/validations";
import InputCategory from "components/ui/Inputs/InputCategory";
import Button from "components/ui/Button";
import { isTemplateExpression } from "typescript";

interface Props {

}

export default function CheckboxSubCategory(props) {
  const dispatch = useDispatch()
  const categories = useSelector((state: IRootState) => state.categoryInput.categories)
  const subCategories = useSelector((state: IRootState) => state.subCategoryCheckbox.subCategories)
  const [value, setValue] = useState();
  const [subCategoriesList, setItems] = useState([])
  const [categoriesList, setCategories] = useState([])
  const [isSaved, setIsSaved] = useState(false)

  function remove (arr, indexes) {
    var arrayOfIndexes = [].slice.call(arguments, 1);  // (1)
    return arr.filter(function (item, index) {         // (2)
      return arrayOfIndexes.indexOf(index) == -1;      // (3)
    });
  }

  const handleCheckbox = (event) => {
    const value = event.target.value
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
      label={"Category*"}
      validate={required}
      onChange={handleInput}
    />
    {value && !isSaved ?
    <div>
      {subCategories.map(item => (
        <div className={styles.checkbox}>
        <input
        type="checkbox"
        value={item.name}
        onClick={handleCheckbox}
        >
        </input>
        <label><span>{item.name}</span></label>
        </div>
        ))}
        <div className={styles.btnContainer}>
        <a className={styles.btn} onClick={() => subCategoriesList.length !== 0 ? setIsSaved(true) : null}>Save сategory</a>
        </div>
    </div>
    :
    null
    }
    {isSaved ?
    <ol className={styles.list}>
      <li>
        <div className={styles.listContent}>
        <span>{subCategoriesList.join(', ')}</span>
        <div>
          <a><img src="img/icons/pencil.svg"/></a>
          <a onClick={() => setIsSaved(false)}><img src="img/icons/delete.svg"/></a>
        </div>
       </div>
      </li>
    </ol>
    :
    null}
    </>
  )
}

