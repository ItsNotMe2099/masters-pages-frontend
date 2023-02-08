import { ChangeEvent, ComponentType, useState } from 'react'
import styles from 'components/fields/BaseTextField/index.module.scss'

import { WrappedFieldProps } from 'redux-form'

import InputMask from 'react-input-mask'
import _uniqueId from 'lodash/uniqueId'
import classNames from 'classnames'
type OnChange = (evt: React.ChangeEvent<HTMLInputElement>) => any;

interface Indexed {
  [key: string]: any;
}

interface OuterProps extends WrappedFieldProps, Indexed {
  ownerComponent: ComponentType<WrappedFieldProps & Indexed>,
  wait?: number,
}

interface Props {
  type?: any,
  input?: any,
  meta?: any,
  placeholder?: string,
  withIcon?: boolean,
  onClick?: (any) => void,
  parentRef?: any,

  value?: any,
  size?: any
  mask?: string
  disabled?: boolean
  alwaysShowMask?: boolean
  maskChar?: string
  inputClassName?: string
  withBorder: boolean,
  transparent: boolean,
  withPadding: boolean,
  debounce?: number
  hasError: boolean
  onChange: (value) => void
  min?: string
  max?: string
  //onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function BaseTextField(props: Props) {
  const { error, touched } = props.meta ? props.meta : { error: null, touched: false }

  const [name] = useState(_uniqueId('input-'))
  const { mask } = props
  const hasError = !!error && touched

  const getSizeClass = (size) => {
    switch (size) {
      case 'small':
        return styles.inputSmall
      case 'normal':
      default:
        return styles.inputNormal
    }
  }

  const renderInput = (inputProps) => {
    return (<input {...inputProps} min={props.type === 'number' ? props.min : null}
      max={props.type === 'number' ? props.max : null} className={
        classNames({
          [styles.input]: true,
          [styles.inputSmall]: props.size === 'small',
          [styles.inputNormal]: props.size === 'small',
          [styles.withIcon]: props.withIcon,
          [styles.inputError]: hasError
        })} type={props.type || 'text'} disabled={props.disabled} />)
  }
  return mask ? (
    <InputMask mask={mask} disabled={props.disabled} value={props.value} onChange={props.onChange} maskPlaceholder={null} alwaysShowMask={props.alwaysShowMask} maskChar={props.maskChar}>
      {(inputProps) => renderInput(inputProps)}
    </InputMask>
  ) : renderInput(props)

}
BaseTextField.defaultProps = {
  withBorder: true,
  transparent: false,
  withPadding: true,
  size: 'small'
}
