import styles from 'components/fields/TextField/index.module.scss'
import { FieldConfig, useField } from 'formik'
import BaseTextField from 'components/fields/BaseTextField'
import React, { ReactElement, useEffect } from 'react'
import FieldError from 'components/ui/FieldError'
import Label from 'components/fields/Label'
import { LabelStyleType } from 'types/types'
import classNames from 'classnames'
import EditFieldComponent from 'components/EditFieldComponent'
import { getCurrencySymbol } from 'data/currency'

interface Props {
  label?: string,
  placeholder?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  hasAutoComplete?: boolean
  icon?: ReactElement
  name?: string
  variant?: 'normal' | 'shadow' | 'large' | 'currency'
  labelType?: LabelStyleType
  onIconClick?: (e) => void
  children?: React.ReactNode
  noMargin?: boolean
  hidden?: boolean
  size?: 'normal'
  type?: 'text' | 'password' | 'number'
  onClick?: () => void
  editable?: boolean
  min?: string
  max?: string
  isNumbersOnly?: boolean
  currency?: string
}

export default function TextField(props: Props & FieldConfig) {
  const { label, placeholder, className, inputClassName, hasAutoComplete, icon, variant } = props
  const [field, meta, helpers] = useField(props)
  const hasError = !!meta.error && meta.touched


  const getClassName = () => {
    return classNames(
      styles.root,
      className,
      {
        [styles.noMargin]: props.noMargin,
        [styles.rootWithError]: (meta.error && meta.touched),
        [styles.rootWithLabelCross]: props.labelType === 'cross',
        [styles.hidden]: props.hidden
      }
    )
  }
  
  return (
    <div className={getClassName()}>
      {props.labelType === LabelStyleType.Static && <Label label={label} style={props.labelType} hasError={hasError} />}
      <div className={styles.inputContainer}>
        {variant === 'currency' && !field.value ?
          <div className={styles.symbol}>{getCurrencySymbol(props.currency)}</div> : null}
        <BaseTextField isNumbersOnly={props.isNumbersOnly} min={props.min} max={props.max} size={props.size} {...field} meta={meta} placeholder={props.labelType === LabelStyleType.Placeholder ? props.label : props.placeholder} withIcon={!!props.icon} hasError={hasError} type={props.type} />
        {props.labelType === LabelStyleType.Cross && <Label label={label} style={props.labelType} hasError={hasError} />}
        {props.icon && <div className={styles.icon} onClick={props.onIconClick}> {props.icon}</div>}
        {props.editable ? <EditFieldComponent className={styles.edit} onClick={props.onClick} /> : null}
      </div>
      {props.children}
      <FieldError showError={hasError}>{meta?.error}</FieldError>
    </div>
  )
}
TextField.defaultProps = {
  labelType: LabelStyleType.Static
}
