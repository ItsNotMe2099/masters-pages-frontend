import BaseInput from "components/ui/Inputs/Input/components/BaseInput";
import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import {CodeSelect} from "components/ui/Inputs/InputPhone/components/CodeSelect";
import {useEffect, useState} from "react";
import styles from './index.module.scss'
import Codes from './codes'
import parsePhoneNumber, {isPossiblePhoneNumber} from 'libphonenumber-js'
import { Metadata } from 'libphonenumber-js/core'
// @ts-ignore
import minMetadata from 'libphonenumber-js/metadata.min'
// @ts-ignore
const metadata = new Metadata(minMetadata)
interface Props {
  meta: any
  input: { value: string, onChange: (val) => void, name: string }
  type: string
  label: string
  disabled?: boolean
  inputLabel?: string,
  onClick: () => void
}
const codesOptions = Codes.filter(item => item.dial_code).map((item) => {
  return {value: item.dial_code, label: `${item.dial_code}`, code: item.code}
}).sort((a, b) => a.value.replace(/[^\d]/g, '') < b.value.replace(/[^\d]/g, '') ? -1 : 1 )

export default function InputPhone(props: Props) {
  const {error, touched} = props.meta ? props.meta : {error: null, touched: false}

  const {input: {value, onChange}, type, label} = props

   console.log("ValueSet", value);
  const [code, setCode] = useState(codesOptions.find((item) => value ? item.value && (value.indexOf(item.value) === 0 || value.replace('+', '').indexOf(item.value.replace('+', '')) === 0) : item.value === '+1'));

  const handleInputChange = (e) => {
    const value = e.target.value;
    const phoneNumber = parsePhoneNumber(value)
    console.log("SetValue", phoneNumber)
    onChange(value.replace(/[^\d]/g, ''))
    if (phoneNumber) {
      const codeValue = {code: phoneNumber.country, value: `+ ${phoneNumber.countryCallingCode}`, label: `+ ${phoneNumber.countryCallingCode}`};
      console.log("phoneNumber", codeValue)
      if(codeValue) {
        setTimeout(() =>       setCode(codeValue), 300)

      }
    }
    console.log("OnChange", value.replace(/[^\d]/g, ''))

  }
  const handleCodeChange = (val) => {
    console.log("HandleCodeChange", val)
    setCode(val)
    onChange(val.value.replace(/[^\d]/g, ''));
  }
  const maskBuilder = v => {
    const phoneNumber = parsePhoneNumber(`+${v}`)
    if(phoneNumber) {
      metadata.country(phoneNumber.country)
      let totalLength = metadata.numberingPlan ? Math.max(metadata.numberingPlan.possibleLengths()) : 13;

      if(!totalLength){
        totalLength = 13;
      }
      const addChars = totalLength > 0 ? Array.apply(null, { length: (totalLength - 6)}).map(i => '9').join('') : '9999999';
      console.log("addChars", addChars)
      if(totalLength < 6){
        return `+ ${Array.apply(null, { length: phoneNumber?.countryCallingCode.length }).map(i => '9').join('')} ${Array.apply(null, { length: totalLength }).map(i => '9').join('')}`
      }
      if (phoneNumber?.countryCallingCode.length === 1) {
        return `+ 9 999-999${addChars ? `-${addChars}` : ''}`
      }
      if (phoneNumber?.countryCallingCode.length === 2) {
        return `+ 99 999-999${addChars ? `-${addChars}` : ''}`;
      }
      if (phoneNumber?.countryCallingCode.length === 3) {
        return `+ 999 999-999${addChars ? `-${addChars}` : ''}`
      }
    }else if(code){
      return `+ ${Array.apply(null, { length: code.value.length - 1 }).map(i => '9').join('')} ${Array.apply(null, { length: 13 }).map(i => '9').join('')}`

    }
    return '+ 9 999-999'
  }
  console.log("Update code", code);

  const handleClick = (e) =>
  {
    console.log("HandleClick")
    if(props.onClick) {
      e.preventDefault();
      e.stopPropagation();
      props.onClick();
    }
  }
  return (
    <div className={styles.root} onClick={handleClick}>
      <div className={`${styles.inputContainer} ${(error && touched) && styles.inputError}`}>
        <label className={styles.inputLabel}>{props.label}</label>
        <div className={styles.country}>
          <CodeSelect value={code} onChange={handleCodeChange} options={codesOptions}
                      formatTriggerLabel={(value) => value.value}/>
        </div>
        <BaseInput
          withBorder={false}
          transparent={true}
          withPadding={false}
          maskChar={''}
          mask={maskBuilder(value)}
          disabled={props.disabled}
          input={{
            name: props.input.name,
            value: value,
            onChange: handleInputChange
          }}
        />
      </div>
      <ErrorInput {...props}/>
    </div>
  )
}
