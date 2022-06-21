import BaseInput from 'components/ui/Inputs/Input/components/BaseInput'
import ErrorInput from 'components/ui/Inputs/Input/components/ErrorInput'
import {CodeSelect} from 'components/ui/Inputs/InputPhone/components/CodeSelect'
import {useEffect, useState} from 'react'
import styles from './index.module.scss'
import parsePhoneNumber from 'libphonenumber-js'
import {Metadata} from 'libphonenumber-js/core'
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

const codeDoubles = {
  '1': ['CA', 'US'],
  '590': 'FR',
  '47': 'NO',
  '290': 'SH',
  '262': 'RE',
  '44': 'GB',
  '61': 'AU',
}

const codesOptions = Object.keys(metadata.metadata.countries).map((key) => {
  const value = metadata.metadata.countries[key]
  return {
    value: key,
    label: `+${value[0]}`,
    phoneCode: value[0].replace(/[^\d]/g, ''),
    code: key,
    sort: parseInt(value[0], 10)
  }
}).sort((a, b) => a.sort < b.sort ? -1 : 1)
  .filter(item => !codeDoubles[item.phoneCode] || (codeDoubles[item.phoneCode] && !Array.isArray(codeDoubles[item.phoneCode]) && codeDoubles[item.phoneCode] === item.value) || (codeDoubles[item.phoneCode] && Array.isArray(codeDoubles[item.phoneCode]) && codeDoubles[item.phoneCode].includes(item.value)))
const findCountryCode = (value) => {
  const cleanValue = value.replace(/[^\d]/g, '')
  const codes = metadata.metadata.country_calling_codes
  const key = Object.keys(codes).reverse().find(key => cleanValue.indexOf(key) === 0)
  if (key) {
    const val = codeDoubles[key] ? (Array.isArray(codeDoubles[key]) ? codeDoubles[key][0] : codeDoubles[key]) : codes[key][0]
    return {value: val, label: `+${key}`, code: val, sort: 0}
  }
}

export default function InputPhone(props: Props) {
  const {error, touched} = props.meta ? props.meta : {error: null, touched: false}
  const [changed, setChanged] = useState(false)
  const {input: {value, onChange}, type, label} = props
  const [code, setCode] = useState(findCountryCode(value) || findCountryCode('1'))

  useEffect(() => {
    if(value) {
      calcCode(value)
    }
  }, [value])
  const calcCode = (value) => {
    const phoneNumber = parsePhoneNumber(`+${value}`)

    if (phoneNumber) {

      const country = phoneNumber.country ? phoneNumber.country : null
      const codeValue = country ? {
        code: country,
        value: country,
        label: `+ ${phoneNumber.countryCallingCode}`,
        sort: 0
      } : findCountryCode(value)
      if (codeValue) {
        setTimeout(() => setCode(codeValue), 200)
      }
    } else {
      const codeValue = findCountryCode(value)
      if (codeValue) {
        setTimeout(() => setCode(codeValue), 200)
      }
    }
    setChanged(true)
  }
  const handleInputChange = (e) => {
    onChange(e.target.value.replace(/[^\d]/g, ''))

  }
  const handleCodeChange = (val) => {
    setChanged(true)
    setCode(val)
    onChange(val.label.replace(/[^\d]/g, ''))
  }
  const maskBuilder = v => {
    const phoneNumber = parsePhoneNumber(`+${v}`)
    if (phoneNumber) {
      metadata.country(phoneNumber.country)
      let totalLength = metadata.numberingPlan ? Math.max(metadata.numberingPlan.possibleLengths()) : 13

      if (!totalLength) {
        totalLength = 13
      }
      const addChars = totalLength > 0 ? Array.apply(null, {length: (totalLength - 6)}).map(i => '9').join('') : '9999999'
      if (totalLength < 6) {
        return `+ ${Array.apply(null, {length: phoneNumber?.countryCallingCode.length}).map(i => '9').join('')} ${Array.apply(null, {length: totalLength}).map(i => '9').join('')}`
      }
      if (phoneNumber?.countryCallingCode.length === 1) {
        return `+ 9 999-999${addChars ? `-${addChars}` : ''}`
      }
      if (phoneNumber?.countryCallingCode.length === 2) {
        return `+ 99 999-999${addChars ? `-${addChars}` : ''}`
      }
      if (phoneNumber?.countryCallingCode.length === 3) {
        return `+ 999 999-999${addChars ? `-${addChars}` : ''}`
      }
    } else if (code) {
      return `+ ${Array.apply(null, {length: code.value.length - 1}).map(i => '9').join('')} ${Array.apply(null, {length: 13}).map(i => '9').join('')}`

    }
    return '+ 9 999-999'
  }

  const handleClick = (e) => {
    if (props.onClick) {
      e.preventDefault()
      e.stopPropagation()
      props.onClick()
    }
  }
  return (
    <div className={styles.root} onClick={handleClick}>
      <div className={`${styles.inputContainer} ${(error && touched) && styles.inputError}`}>
        <label className={styles.inputLabel}>{props.label}</label>
        <div className={styles.country}>
          <CodeSelect disabled={props.disabled} value={code} onChange={handleCodeChange} options={codesOptions}
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
            value: !value && !changed && code ? code.label.replace(/[^\d]/g, '') : value,
            onChange: handleInputChange
          }}
        />
      </div>
      <ErrorInput {...props}/>
    </div>
  )
}
