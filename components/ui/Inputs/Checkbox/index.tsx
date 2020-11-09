import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import { useState } from "react";
import styles from './index.module.scss'
import _uniqueId from 'lodash/uniqueId';
interface Props {
  meta: any
  input: string
  type: string
  children?: string
  //value: string
  //onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function Checkbox(props: Props) {
  const { error, touched } = props.meta
  const { input } = props

  const [id] = useState(_uniqueId('prefix-'));
  console.log("checkbox meta",  props.meta)
  return (
    <div className={styles.root}>
    <div>
      <input
      type='checkbox'
      id={id}
      {...input}
      >
      </input>
      <label htmlFor={id}>{props.children}</label>
    </div>
    <ErrorInput {...props}/>
    </div>
  )
}
