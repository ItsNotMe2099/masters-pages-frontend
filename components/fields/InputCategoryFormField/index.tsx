import { Categories, IField, InputStyleType, LabelStyleType } from 'types/types'
import {useField} from 'formik'
import {useTranslation} from 'next-i18next'
import styles from './index.module.scss'
import * as React from 'react'
import {getCategoryTranslation} from 'utils/translations'
import Label from '../Label'
import classNames from 'classnames'
import FieldError from 'components/ui/FieldError'
import EditFieldComponent from 'components/EditFieldComponent'
import { useDispatch, useSelector } from 'react-redux'
import { modalClose, modalFormOpen } from 'components/Modal/actions'
import { IRootState } from 'types'
import ModalCategoryForm from './Form'

interface Props<T> extends IField<T> {
  styleType?: InputStyleType
  categoryId?: number
  label: string
  setFieldValue?: (id: string) => void
}

export default function InputCategoryField(props: Props<Categories>) {
  const [field, meta, helpers] = useField<Categories>(props)
  const { t, i18n } = useTranslation('common')

  const hasError = !!meta.error && meta.touched

  const handleSubmit =  async (data: Categories, id: string) => {
    helpers.setValue(data)
    props.setFieldValue ? props.setFieldValue(id) : null
    dispatch(modalClose())
  }

  const getClassName = () => {
    return classNames(
      styles.root,
      {
        [styles.rootWithError]: (meta.error && meta.touched),
        [styles.rootWithLabelCross]: props.labelType === 'cross',
      }
    )
  }

  const dispatch = useDispatch()

  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)

  return (
    <>
    <div className={getClassName()}>
        <Label label={props.label} style={LabelStyleType.Cross} hasError={hasError} />
        <div className={classNames(styles.title, {[styles.visibility]: field.value.mainCategory})}>
          {getCategoryTranslation(field.value.mainCategory, i18n.language)?.name}/{getCategoryTranslation(field.value.category, i18n.language)?.name}/{getCategoryTranslation(field.value.subCategory, i18n.language)?.name}
        </div>
        <EditFieldComponent onClick={() => dispatch(modalFormOpen())}/>
      <FieldError showError={hasError}>{meta?.error}</FieldError>
    </div>
    {modalKey === 'modalForm' && <ModalCategoryForm isOpen onSubmit={handleSubmit} onCancel={() => dispatch(modalClose())}/>}
    </>
    )
}
