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
  labelType: 'placeholder' | 'cross' | 'static',
  onClick?: (any) => void
}

export default function Input({children, ...props}: Props) {
  const { error, touched } = props.meta ? props.meta : {error: null, touched: false}
  return (
    <div className={`${styles.root} ${(error && touched) && styles.rootWithError} ${props.labelType === 'cross' && styles.rootWithLabelCross}`}>
      {props.labelType === 'static' && <label className={styles.labelStatic}>{props.label}</label>}
      <div className={styles.inputContainer}>
        <BaseInput  {...props} placeholder={props.labelType === 'placeholder' ?  props.label : props.placeholder} withIcon={!!props.icon} />
        {props.labelType === 'cross' && <label className={styles.labelCross}>{props.label}</label>}
        {props.icon && <div className={styles.icon}> {props.icon}</div>}
       </div>
      {children}
      <ErrorInput {...props} />
    </div>
  )
}
Input.defaultProps = {
  labelType: 'cross'
}
