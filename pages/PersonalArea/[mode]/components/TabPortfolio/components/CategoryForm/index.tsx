import Button from "components/ui/Button";
import FormError from "components/ui/Form/FormError";
import CheckboxListSubCategories from "components/ui/Inputs/CheckboxListSubCategories";
import InputCategory from "components/ui/Inputs/InputCategory";

import { useEffect, useState } from "react";
import * as React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from "types";
import { arrayNotEmpty, required } from "utils/validations";
import styles from './index.module.scss'
import { Field, reduxForm } from 'redux-form'

let CategoryForm = (props) => {
  const error = useSelector((state: IRootState) => state.profile.formError)
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const categoryId = props.initialValues?.categoryId
    if(categoryId){
      setCategoryId(categoryId);
    }
  }, [])

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>

      <div className={styles.container}>
          <Field
            name="categoryId"
            component={InputCategory}
            label="Category"
            validate={required}
            onChange={(val) =>{
              setCategoryId(val)}
            }
          />
          <Field
            name="subCategories"
            component={CheckboxListSubCategories}
            label="BOD* MM / DD / YYYY"
            validate={arrayNotEmpty}
            categoryId={categoryId}
            grid={2}
          />

      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button className={styles.button} white={true} borderGrey={true} bold={true} size={'12px 40px'} type={'button'} onClick={props.onCancel}>Cancel</Button>
        <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true} size={'12px 40px'} type={'submit'}>Save</Button>
      </div>
      </div>
    </form>
  )
}


CategoryForm  = reduxForm({
  form: 'skillCategoryForm',

}) (CategoryForm )


export default CategoryForm
