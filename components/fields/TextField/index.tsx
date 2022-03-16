import styles from 'components/fields/TextField/index.module.scss'
import {FieldConfig, useField} from 'formik'
import BaseTextField from 'components/fields/BaseTextField'
import React, {ReactElement} from 'react'
import FieldError from 'components/ui/FieldError'
import Label from 'components/fields/Label'
import {LabelStyleType} from 'types/types'

interface Props {
  label?: string,
  placeholder?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  hasAutoComplete?: boolean
  icon?: ReactElement
  name?: string
  variant?: 'normal' | 'shadow' | 'large'
  labelType?: LabelStyleType
  onIconClick?: (e) => void
  children?: React.ReactNode
  noMargin?: boolean
  hidden?: boolean
  size?: 'normal'
  type?: 'text' | 'password'
}

export default function TextField(props: Props & FieldConfig) {
  const {label, placeholder, className, inputClassName,hasAutoComplete, icon, variant} = props
  const [field, meta] = useField(props)
  const hasError = !!meta.error && meta.touched
  console.log("props.labelType", props.labelType);
  return (
    <div className={`${styles.root} ${props.noMargin && styles.noMargin} ${(meta.error && meta.touched) && styles.rootWithError} ${props.labelType === 'cross' && styles.rootWithLabelCross} ${props.hidden && styles.hidden}`}>
      {props.labelType === LabelStyleType.Static && <Label label={label} style={props.labelType} hasError={hasError} />}
      <div className={styles.inputContainer}>
        <BaseTextField size={props.size} {...field} meta={meta} placeholder={props.labelType === LabelStyleType.Placeholder ?  props.label : props.placeholder} withIcon={!!props.icon} hasError={hasError} type={props.type}/>
        {props.labelType === LabelStyleType.Cross && <Label label={label} style={props.labelType} hasError={hasError} />}
        {props.icon && <div className={styles.icon} onClick={props.onIconClick}> {props.icon}</div>}
       </div>
      {props.children}
      <FieldError showError={hasError}>{meta?.error}</FieldError>
    </div>
  )
}
TextField.defaultProps = {
  labelType: LabelStyleType.Static
}
