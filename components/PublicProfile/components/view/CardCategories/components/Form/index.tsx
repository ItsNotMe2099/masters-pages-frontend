import FormError from 'components/ui/Form/FormError'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from 'types'
import styles from './index.module.scss'
import { Field, reduxForm } from 'redux-form'
import { useTranslation } from 'next-i18next'
import Button from 'components/PublicProfile/components/Button'
import {useEffect, useState} from 'react'
import { required} from 'utils/validations'
import InputSubCategory from 'components/ui/Inputs/InputSubCategory'
interface Props{
  onCancel: () => void,
  handleSubmit?: () => void,
  onSubmit?: (data) => void,
  initialValues?: any
  change?: (name, val) => void
}
let CardCategoryForm = (props: Props) => {
  const { t } = useTranslation('common')
  const error = useSelector((state: IRootState) => state.skill.formError)
  const [categoryId, setCategoryId] = useState(null)
  const [mainCategoryId, setMainCategoryId] = useState(null)

  useEffect(() => {
    const categoryId = props.initialValues?.categoryId
    if(categoryId){
      setCategoryId(categoryId)
    }
  }, [])

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <Field
        name="mainCategoryId"
        component={InputSubCategory}
        size={'small'}
        label={t('createTask.fieldMainCategory')}
        validate={[required]}
        onChange={(val) =>{
          props.change('categoryId', null)
          props.change('subCategoryId', null)
          setMainCategoryId(val)}
        }
      />
      {mainCategoryId && <Field
        name="categoryId"
        component={InputSubCategory}
        size={'small'}
        label={t('createTask.fieldCategory')}
        validate={[required]}
        categoryId={mainCategoryId}
        onChange={(val) =>{
          props.change('subCategoryId', null)
          setCategoryId(val)}
        }
      />}
      {categoryId && <Field
        name="subCategoryId"
        component={InputSubCategory}
        validate={[required]}
        size={'small'}
        label={t('createTask.fieldSubCategory')}
        categoryId={categoryId}
        grid={2}
      />}

      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button size={'small'} type={'button'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
        <Button size={'small'} type={'submit'}>{t('task.save')}</Button>
      </div>

    </form>
  )
}

CardCategoryForm  = reduxForm({
  form: 'cardCategoryForm',

}) (CardCategoryForm)

export default CardCategoryForm
