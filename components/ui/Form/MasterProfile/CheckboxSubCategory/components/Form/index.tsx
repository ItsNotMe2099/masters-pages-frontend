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
import InputSubCategory from 'components/ui/Inputs/InputSubCategory'
import {useTranslation, Trans} from "i18n";

const categoryRequired = (value) => {
  return  !value || !value.value ? 'required' : ''
}
const subCategoryRequired = (value) => {
  return  !value || value.length === 0 ? 'selectSubCategory' : ''
}



let FormNewCategory = props => {
  const {t} = useTranslation()
  const { handleSubmit } = props
  const [categoryId, setCategoryId] = useState(null);

  const [mainCategoryId, setMainCategoryId] = useState(null);

  useEffect(() => {
    const categoryId = props.initialValues?.category?.value
    if(categoryId){
      setCategoryId(categoryId);
    }
  }, [])

  return (
    <form className={styles.form} >

      <Field
        name="mainCategory"
        component={InputSubCategory}
        label={t('mainCategory')}
        validate={categoryRequired}
        changeWithValue={true}
        onChange={(val) => {
          props.change('category', null);
          props.change('subCategories', []);
          setMainCategoryId(val.value)
          setCategoryId(null);
        }
        }

      />
      <Field
        name="category"
        component={InputSubCategory}
        label={t('category')}
        validate={categoryRequired}
        categoryId={mainCategoryId}
        changeWithValue={true}
        onChange={(val) => {
          props.change('subCategories', []);
          setCategoryId(val.value)
        }}

      />
      {categoryId &&
      <Field
                name="subCategories"
                component={CheckboxListSubCategories}
                label={t('subCategories')}
                validate={[subCategoryRequired]}
                categoryId={categoryId}
                grid={2}
                changeWithValue={true}
              />}
      <Button type={'button'} className={styles.button} onClick={handleSubmit} grey={true} bold={true} size={'16px 30px'}>{t('portfolio.addCategory')}</Button>

      </form>
  )
}

FormNewCategory = reduxForm ({
  form: 'newCategory',
}) (FormNewCategory)

export default FormNewCategory
