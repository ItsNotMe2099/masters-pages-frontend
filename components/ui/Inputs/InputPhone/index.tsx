import BaseInput from "components/ui/Inputs/Input/components/BaseInput";
import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import { CodeSelect } from "components/ui/Inputs/InputPhone/components/CodeSelect";
import { useState } from "react";
import styles from './index.module.scss'
import Codes from './codes'
interface Props {
  meta: any
  input: {value: string, onChange: (val) => void}
  type: string
  label: string
  inputLabel?: string
}

export default function InputPhone(props: Props) {
  const { error, touched } = props.meta ? props.meta : {error: null, touched: false}

  const { input: {value, onChange}, type, label } = props

  const codesOptions = Codes.map((item) => {
    return {value: item.dial_code, label: `${item.dial_code} ${item.name}`, code: item.dial_code}
  })
  const [code, setCode] = useState(codesOptions.find((item) => value ? item.value && (value.indexOf(item.value) === 0 || value.replace('+', '').indexOf(item.value.replace('+', '')) === 0) : item.value === '+7'));
  const handleInputChange = (e) => {
    onChange(`${code.value}${e.target.value}`)
  }
  const handleCodeChange = (val) => {
    setCode(val)
  }
  return (
    <div className={styles.root}>
    <div className={`${styles.inputContainer} ${(error && touched) && styles.inputError}`}>
      <label className={styles.inputLabel}>{props.label}</label>
      <div className={styles.country}>
        <CodeSelect value={code} onChange={handleCodeChange} options={codesOptions} formatTriggerLabel={(value) => value.code}/>
      </div>
      <BaseInput
        {...props}
        withBorder={false}
        transparent={true}
        withPadding={false}
        input={{
          value: value.replace(code?.value, ''),
          onChange: handleInputChange
        }}
      />
    </div>
      <ErrorInput {...props}/>
    </div>
  )
}
