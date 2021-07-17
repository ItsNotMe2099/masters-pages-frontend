import AvatarInput from "components/ui/AvatarInput";
import FormError from "components/ui/Form/FormError";
import Input from "components/ui/Inputs/Input";
import * as React from "react";
import { useSelector, useDispatch, connect } from 'react-redux'
import { IRootState } from "types";
import styles from './index.module.scss'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import {useTranslation, withTranslation} from "react-i18next";
import TextArea from 'components/ui/Inputs/TextArea'
import Button from 'components/PublicProfile/components/Button'
import {useEffect, useState} from 'react'
import InputCategory from 'components/ui/Inputs/InputCategory'
import {arrayNotEmpty, required} from 'utils/validations'
import CheckboxListSubCategories from 'components/ui/Inputs/CheckboxListSubCategories'
import InputSubCategory from 'components/ui/Inputs/InputSubCategory'
interface Props{
  onCancel: () => void,
  handleSubmit?: () => void,
  onSubmit?: (data) => void,
  initialValues?: any
}
let CardCategoryForm = (props: Props) => {
  const { t } = useTranslation('common');
  const error = useSelector((state: IRootState) => state.profile.formError)
  const [categoryId, setCategoryId] = useState(null);
  const [mainCategoryId, setMainCategoryId] = useState(null);

  useEffect(() => {
    const categoryId = props.initialValues?.categoryId
    if(categoryId){
      setCategoryId(categoryId);
    }
  }, [])

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <Field
        name="mainCategoryId"
        component={InputSubCategory}
        size={'small'}
        label="Main Category"
        onChange={(val) =>{

          setMainCategoryId(val)}
        }
      />
      {mainCategoryId && <Field
        name="categoryId"
        component={InputSubCategory}
        size={'small'}
        label="Category"

        categoryId={mainCategoryId}
        onChange={(val) =>{
          console.log("SetCateogry", val);
          setCategoryId(val)}
        }
      />}
      {categoryId && <Field
        name="subCategoryId"
        component={InputSubCategory}
        size={'small'}
        label="Sub Category"
        categoryId={categoryId}
        grid={2}
      />}

      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button size={'small'} type={'button'} onClick={props.onCancel}>Cancel</Button>
        <Button size={'small'} type={'submit'}>Save</Button>
      </div>

    </form>
  )
}

CardCategoryForm  = reduxForm({
  form: 'cardCategoryForm',

}) (CardCategoryForm)

export default CardCategoryForm
