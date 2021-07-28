import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import { ReactElement, useState } from "react";
import styles from './index.module.scss'
import _uniqueId from 'lodash/uniqueId';
import ReactCheckbox from "react-custom-checkbox";
interface Props {
  meta?: any
  input: any
  children?: string,
  label: ReactElement | string
  className?: string
  //value: string
  //onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function Checkbox(props: Props) {
  const { error, touched } = props.meta
  const { input } = props

  const [id] = useState(_uniqueId('prefix-'));
  return (
    <div className={`${styles.root} ${props.className}`}>
    <div className={styles.wrapper}>

        <ReactCheckbox
          checked={input.value}
          icon={<img src={'/img/icons/checkbox-checked.svg'} style={{ width: 21, height: 21 }} alt="" />}
          borderColor="#e6e6e6"
          borderRadius={2}
          size={21}
          containerClassName={`${styles.checkboxContainer}`}
          labelClassName={styles.checkboxLabel}
          labelStyle={{}}
          label={typeof props.label === 'string' ? props.label : null}
          onChange={input.onChange}
        />
        {typeof props.label !== 'string' && props.label ? <div className={styles.checkboxLabel} onClick={() => input.onChange(!input.value)} >{props.label}</div> : null}
    </div>
    <ErrorInput {...props}/>
    </div>
  )
}
