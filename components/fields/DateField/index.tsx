import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import { FieldConfig, useField, useFormikContext } from 'formik'
import React, { useRef } from 'react'
import styles from './index.module.scss'
import DatePicker from 'react-date-picker/dist/entry.nostyle'

import { format, formatISO } from 'date-fns'
import Label from 'components/fields/Label'
import FieldError from 'components/ui/FieldError'
import {useTranslation} from 'next-i18next'
import {LabelStyleType} from 'types/types'

interface Props {
  label?: string
  placeholder?: string
  disabled?: boolean
  labelType?: LabelStyleType
}

export const DateField = (props: Props & FieldConfig) => {
  const { label, labelType, placeholder, name, disabled } = props
  const [field, meta] = useField(props)
  const { value } = field
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const {t, i18n} = useTranslation()
  const handleChange = (value) => {
    setFieldValue(props.name, value)
    setIsActive(false)
  }
  const showError = !!meta.error && meta.touched
  return (
    <div className={styles.root}>
      <Label label={label} style={labelType} hasError={showError} />
      <DatePicker
        className={styles.datePicker}
        locale={i18n.language}
        onChange={(value) => {
          if(!value){
            handleChange(null)
            return
          }
          try {
           if (isNaN(value.getTime()) || value.getFullYear() < 1000) {
              return
            }
            handleChange(format(value, 'y-MM-dd'))
          }catch (e){

          }
        }}
        format={'dd.MM.y'}
        value={value ? new Date(value) : value}
      />
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
DateField.defaultProps = {

}
