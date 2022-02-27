import styles from './index.module.scss'
import {FieldConfig, useField} from 'formik'
import BaseInput from 'components/ui/Formik/BaseInput'
import {ReactElement} from 'react'
import ErrorInput from 'components/ui/Formik/components/ErrorInput'

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
  labelType: 'placeholder' | 'cross' | 'static'
  onIconClick?: (e) => void
  children?: React.ReactNode
  noMargin?: boolean
  hidden?: boolean
  size?: 'normal'
  type?: 'text' | 'password'
}

export default function Input(props: Props & FieldConfig) {
  const {label, placeholder, className, inputClassName,hasAutoComplete, icon, variant} = props
  const [field, meta] = useField(props)
  const hasError = !!meta.error && meta.touched
  return (
    <div className={`${styles.root} ${props.noMargin && styles.noMargin} ${(meta.error && meta.touched) && styles.rootWithError} ${props.labelType === 'cross' && styles.rootWithLabelCross} ${props.hidden && styles.hidden}`}>
      {props.labelType === 'static' && <label className={styles.labelStatic}>{props.label}</label>}
      <div className={styles.inputContainer}>
        <BaseInput size={props.size} {...field} placeholder={props.labelType === 'placeholder' ?  props.label : props.placeholder} withIcon={!!props.icon} hasError={hasError} type={props.type}/>
        {props.labelType === 'cross' && <label className={styles.labelCross}>{props.label}</label>}
        {props.icon && <div className={styles.icon} onClick={props.onIconClick}> {props.icon}</div>}
       </div>
      {props.children}
      <ErrorInput {...meta} />
    </div>
  )
}
