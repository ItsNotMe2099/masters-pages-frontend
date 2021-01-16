import { ChangeEvent, ComponentType, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.scss'

import { WrappedFieldProps } from 'redux-form';
import debounce from 'lodash.debounce';

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
  onChange?: any,
  value?: any,
  size?: any
  inputClassName?: string
  withBorder: boolean,
  transparent: boolean,
  withPadding: boolean,
  debounce?: number
  //onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function BaseInput(props: Props) {
  const { error, touched } = props.meta ? props.meta : {error: null, touched: false}

  console.log("props1111", props)
  const getSizeClass = (size) => {
    switch (size) {
      case 'small':
        return styles.inputSmall;
      case 'normal':
      default:
        return styles.inputNormal;
    }
  }
  const [ debounceFieldValue, setDebounceFieldValue ] = useState('');
  const [ debouncing, setDebouncing ] = useState(false);
  const lastInputValue = useRef(props.input?.value);

  useEffect(() => {
    if (debouncing) {
      return;
    }

    if (props.input?.value === lastInputValue.current) {
      setDebounceFieldValue(props.input?.value);
      return;
    }
    lastInputValue.current = props.input.value;
    setDebounceFieldValue(props.input.value);
  }, [ debouncing, props.input?.value ]);

  const call = useMemo(() => debounce((
    onChange: OnChange,
    evt: ChangeEvent<HTMLInputElement>,
  ) => {
    setDebouncing(false);
    if(onChange){
      onChange(evt);
    }
  }, props.debounce || 0), [ setDebouncing, props.debounce ]);

  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    evt.persist();
    setDebouncing(true);
    call(props.input?.onChange, evt);
    setDebounceFieldValue(evt.target.value);
  }, [ setDebouncing, call, setDebounceFieldValue ]);

  const onBlur = useCallback((evt: FocusEvent<HTMLInputElement>) => {
    call.cancel();
    setDebouncing(false);
    if(props.input?.onChange) {
      props.input?.onChange(evt);
    }
    if(props.input?.onBlur) {
      props.input?.onBlur(evt);
    }
  }, [ call, setDebouncing, props.input?.onChange, props.input?.onBlur ]);

  const onKeyDown = useCallback((evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.keyCode === 13) {
      call.cancel();
      setDebouncing(false);
      if(props.input?.onChange) {
        props.input?.onChange(evt);
      }
    }
  }, [ call, setDebouncing, props.input?.onChange ]);

  return ( <input className={`${styles.input} ${getSizeClass(props.size)} ${styles.inputClassName} ${(error && touched) && styles.inputError} ${(props.withIcon) && styles.withIcon} ${(props.withPadding) && styles.withPadding} ${(props.transparent) && styles.transparent} ${(props.withBorder) && styles.withBorder}`}
                  autocomplete="off"
                  type={props.type || 'text'}
                  ref={props.parentRef}
                  {...props}
                  {...props.input}
                  value={debounceFieldValue}
    {...(props.debounce > 0 ? {value: debounceFieldValue, onChange, onBlur, onKeyDown} :

      {})}/>)
}
BaseInput.defaultProps = {
  withBorder: true,
  transparent: false,
  withPadding: true,
  size: 'normal'
}
