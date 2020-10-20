import { CodeSelect } from "components/ui/InputPhone/components/CodeSelect";
import { useState } from "react";
import styles from './index.module.scss'
import Codes from './codes'
interface Props {
  meta: any
  input: {value: string, onChange: (val) => void}
  type: string
  label: string
}

export default function InputPhone(props: Props) {
  const { error, touched } = props.meta
  const { input: {value, onChange}, type, label } = props
  const codesOptions = Codes.map((item) => {
    return {value: item.dial_code, label: `${item.dial_code} ${item.name}`, code: item.dial_code}
  })
  const [code, setCode] = useState(codesOptions.find((item) => item.value === '+7'));
  const handleInputChange = (e) => {
    onChange(`${code.value}${e.target.value}`)
  }
  const handleCodeChange = (val) => {
    setCode(val)
  }
  return (
    <>
    <div className={styles.inputContainer}>
      <div className={styles.inputLabel}>Phone number*</div>
      <div className={styles.country}>
        <CodeSelect value={code} onChange={handleCodeChange} options={codesOptions} formatTriggerLabel={(value) => value.code}/>
      </div>
      <input
        className={styles.input}
        placeholder={label}
        type={type}
        onChange={handleInputChange}
      >
      </input>
    </div>
      {error &&
        touched && (
        <div className={styles.error}>
          {error}
        </div>)}
    </>
  )
}
