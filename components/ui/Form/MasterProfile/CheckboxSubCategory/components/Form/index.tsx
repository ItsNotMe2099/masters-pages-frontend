import AvatarInput from "components/ui/AvatarInput";
import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import Checkbox from 'components/ui/Inputs/Checkbox'
import { CheckboxList } from "components/ui/Inputs/CheckboxList";
import CheckboxListSubCategories from "components/ui/Inputs/CheckboxListSubCategories";
import Input from "components/ui/Inputs/Input";
import { useEffect, useState } from "react";
import { Field, reduxForm } from 'redux-form'
import { arrayNotEmpty, required } from "utils/validations";
import InputLocation from 'components/ui/Inputs/InputLocation'
import styles from './index.module.scss'
import InputCategory from 'components/ui/Inputs/InputCategory';
import CheckboxSubCategory from 'components/ui/Form/MasterProfile/CheckboxSubCategory';

let FormNewCategory = props => {
  const { handleSubmit } = props
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    console.log("Props Init", props)
    const categoryId = props.initialValues?.category?.value
    if(categoryId){
      setCategoryId(categoryId);
    }
  }, [])

  return (
    <form className={styles.form} >
              <Field
                name="category"
                component={InputCategory}
                label="Category"
                validate={required}
                changeWithValue={true}
                onChange={(val) => setCategoryId(val.value)}

              />
              <Field
                name="subCategories"
                component={CheckboxListSubCategories}
                label="BOD* MM / DD / YYYY"
                validate={arrayNotEmpty}
                categoryId={categoryId}
                grid={2}
                changeWithValue={true}
              />
      <Button type={'button'} className={styles.button} onClick={handleSubmit} grey={true} bold={true} size={'16px 30px'}>Save category</Button>

      </form>
  )
}

FormNewCategory = reduxForm ({
  form: 'newCategory',
}) (FormNewCategory)

export default FormNewCategory
