import { ReactElement, useState } from 'react'
import styles from './index.module.scss'

interface Props {
  type?: any,
  input?: any,
  meta?: any,
  placeholder?: string,
  withIcon?: boolean,
  onClick?: (any) => void,
  parentRef?: any,
  onChange?: any,
  value?: any,
  size?: any
  inputClassName?: string
  withBorder: boolean,
  transparent: boolean,
  withPadding: boolean,
  //onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function BaseInput(props: Props) {
  const { error, touched } = props.meta ? props.meta : {error: null, touched: false}
  const getSizeClass = (size) => {
    switch (size) {
      case 'small':
        return styles.inputSmall;
      case 'normal':
      default:
        return styles.inputNormal;
    }
  }
  return ( <input className={`${styles.input} ${getSizeClass(props.size)} ${styles.inputClassName} ${(error && touched) && styles.inputError} ${(props.withIcon) && styles.withIcon} ${(props.withPadding) && styles.withPadding} ${(props.transparent) && styles.transparent} ${(props.withBorder) && styles.withBorder}`}
   autocomplete="off"
   type={props.type || 'text'}
   ref={props.parentRef}
   {...props}
   {...props.input}/>)
}
BaseInput.defaultProps = {
  withBorder: true,
  transparent: false,
  withPadding: true,
  size: 'normal'
}
