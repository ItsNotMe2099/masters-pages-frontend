import {Form, FormikProvider, useFormik} from 'formik'
import {useEffect} from 'react'
import {useTranslation} from 'next-i18next'
import styles from 'components/PublicProfile/components/view/CardCategories/components/Form/index.module.scss'
import Button from 'components/PublicProfile/components/Button'
import * as React from 'react'
import ServiceCategoryField from 'components/fields/ServiceCategoryField'
import Validator from 'utils/validator'
import Modal from 'components/ui/Modal'
import { LabelStyleType } from 'types/types'
import TextField from 'components/fields/TextField'
import { useDispatch } from 'react-redux'
import { modalClose } from 'components/Modal/actions'

interface Props {
  onSubmit: (data, id) => void,
  onCancel: () => void
}

export default function ModalCategoryForm(props: Props) {
  const { t, i18n } = useTranslation('common')

  const handleSubmit =   (data) => {
    console.log("Submit", data)
    props.onSubmit(data, data.id)
  }
  const initialValues = {
    mainCategory: null,
    category: null,
    subCategory: null,
    id: ''
  }
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
  const {values, setFieldValue} = formik
  useEffect(() => {
    console.log("changeVal", values)
   setFieldValue('category', null);
    setFieldValue('subCategory', null)
  }, [values.mainCategory])
  useEffect(() => {
    setFieldValue('subCategory', null)
  }, [values.category])

  const dispatch = useDispatch()


  return (
    <Modal isOpen onRequestClose={() => dispatch(modalClose())}>
  <FormikProvider value={formik}>
  <Form>
    <ServiceCategoryField name={'mainCategory'} valueAsObject validate={Validator.required} label={t('createTask.fieldMainCategory')}/>
    <ServiceCategoryField name={'category'} valueAsObject categoryId={values.mainCategory?.id}  validate={Validator.required} label={t('createTask.fieldCategory')}/>
    <ServiceCategoryField name={'subCategory'} valueAsObject categoryId={values.category?.id} validate={Validator.required} label={t('createTask.fieldSubCategory')}/>
     <div className={styles.buttons}>
      <Button size={'small'} type={'button'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
      <Button size={'small'} type={'submit'} onClick={(e) => formik.handleSubmit(e)}>{t('task.save')}</Button>
    </div>
  </Form>
    </FormikProvider>
    </Modal>
  )
}
