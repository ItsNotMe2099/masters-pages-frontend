import { ChangeEvent, ComponentType, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.scss'

import { WrappedFieldProps } from 'redux-form';
import debounce from 'lodash.debounce';

import InputMask from 'react-input-mask'
import _uniqueId from 'lodash/uniqueId';
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
  //onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function BaseInput(props: Props) {
  const { error, touched } = props.meta ? props.meta : {error: null, touched: false}

  const [name] = useState(_uniqueId('input-'));
  const {mask} = props;
  const getSizeClass = (size) => {
    switch (size) {
      case 'small':
        return styles.inputSmall;
      case 'normal':
      default:
        return styles.inputNormal;
    }
  }

  const renderInput = (inputProps) => {
    return  ( <input className={`${styles.input} ${getSizeClass(props.size)} ${styles.inputClassName} ${(error && touched) && styles.inputError} ${(props.withIcon) && styles.withIcon} ${(props.withPadding) && styles.withPadding} ${(props.transparent) && styles.transparent} ${(props.withBorder) && styles.withBorder}`}
                     type={props.type || 'text'}/>)
  }
  return mask ? (
    <InputMask mask={mask}  disabled={props.disabled}   value={props.value} onChange={props.onChange}   maskPlaceholder={null}  alwaysShowMask={props.alwaysShowMask}   maskChar={props.maskChar}>
      {(inputProps) => renderInput(inputProps)}
    </InputMask>
  ) : renderInput(props.input);

}
BaseInput.defaultProps = {
  withBorder: true,
  transparent: false,
  withPadding: true,
  size: 'small'
}
