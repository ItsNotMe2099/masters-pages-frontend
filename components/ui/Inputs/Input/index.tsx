import BaseInput from "components/ui/Inputs/Input/components/BaseInput";
import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import { ReactElement, useState } from 'react'
import styles from './index.module.scss'

interface Props {
  label?: string
  meta?: any
  input?: any
  type?: string
  placeholder?: string
  children?: any
  icon?: ReactElement
  noMargin?: boolean
  labelType: 'placeholder' | 'cross' | 'static',
  onClick?: (any) => void
  onIconClick?: (e) => void
  hidden?: boolean
}

export default function Input({children, ...props}: Props) {
  const { error, touched } = props.meta ? props.meta : {error: null, touched: false}
  return (
    <div className={`${styles.root} ${props.noMargin && styles.noMargin} ${(error && touched) && styles.rootWithError} ${props.labelType === 'cross' && styles.rootWithLabelCross} ${props.hidden && styles.hidden}`}>
      {props.labelType === 'static' && <label className={styles.labelStatic}>{props.label}</label>}
      <div className={styles.inputContainer}>
        <BaseInput  {...props} placeholder={props.labelType === 'placeholder' ?  props.label : props.placeholder} withIcon={!!props.icon} />
        {props.labelType === 'cross' && <label className={styles.labelCross}>{props.label}</label>}
        {props.icon && <div className={styles.icon} onClick={props.onIconClick}> {props.icon}</div>}
       </div>
      {children}
      <ErrorInput {...props} />
    </div>
  )
}
Input.defaultProps = {
  labelType: 'cross'
}
