
import { useCallback, useState } from 'react'
import styles from './index.module.scss'
import {FieldConfig, useField, useFormikContext} from 'formik'

import {SingleOTPInputComponent} from 'components/fields/OtpCodeField/components/SingleInput'
import FieldError from 'components/ui/FieldError'
import cx from 'classnames'
import { useAuthContext } from 'context/auth_state'

interface Props {
  length: number,
  center?: boolean
  onComplete?: (code) => void
  error?: boolean
}

export default function OtpCodeField(props: Props & FieldConfig) {
  const {length, onComplete, error} = props
  const [field, meta] = useField(props)
  const {value} = field
  const { setFieldValue} = useFormikContext()
  const hasError = !!meta.error && meta.touched
  const isNumberInput = true
  const [activeInput, setActiveInput] = useState(0)
  const [otpValues, setOTPValues] = useState(Array<string>(length).fill(''))

  // Helper to return OTP from inputs
  const handleOtpChange = (otp: string[]) => {
      const otpValue = otp.join('')
    setFieldValue(props.name, otpValue)
    if(otpValue?.length === length && onComplete){
      onComplete(otpValue)
    }
    }

  // Helper to return value with the right type: 'text' or 'number'
  const getRightValue = useCallback(
    (str: string) => {
      let changedValue = str
      if (!isNumberInput) {
        return changedValue
      }
      return !changedValue || /\d/.test(changedValue) ? changedValue : ''
    },
    [isNumberInput],
  )

  // Change OTP value at focussing input
  const changeCodeAtFocus = useCallback(
    (str: string) => {
      const updatedOTPValues = [...otpValues]
      updatedOTPValues[activeInput] = str[0] || ''
      setOTPValues(updatedOTPValues)
      handleOtpChange(updatedOTPValues)
    },
    [activeInput, handleOtpChange, otpValues],
  )

  // Focus `inputIndex` input
  const focusInput = useCallback(
    (inputIndex: number) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0)
      setActiveInput(selectedIndex)
    },
    [length],
  )

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1)
  }, [activeInput, focusInput])

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1)
  }, [activeInput, focusInput])

  // Handle onFocus input
  const handleOnFocus = useCallback(
    (index: number) => () => {
      focusInput(index)
    },
    [focusInput],
  )

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = getRightValue(e.currentTarget.value)
      if (!val) {
        e.preventDefault()
        return
      }
      changeCodeAtFocus(val)
      focusNextInput()
    },
    [changeCodeAtFocus, focusNextInput, getRightValue],
  )

  // Hanlde onBlur input
  const onBlur = useCallback(() => {
    setActiveInput(-1)
  }, [])

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Backspace':
        case 'Delete': {
          e.preventDefault()
          if (otpValues[activeInput]) {
            changeCodeAtFocus('')
          } else {
            focusPrevInput()
          }
          break
        }
        case 'ArrowLeft': {
          e.preventDefault()
          focusPrevInput()
          break
        }
        case 'ArrowRight': {
          e.preventDefault()
          focusNextInput()
          break
        }
        case ' ': {
          e.preventDefault()
          break
        }
        default:
          break
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues],
  )

  const handleOnPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pastedData = e.clipboardData
        .getData('text/plain')
        .trim()
        .slice(0, length - activeInput)
        .split('')
      if (pastedData) {
        let nextFocusIndex = 0
        const updatedOTPValues = [...otpValues]
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = getRightValue(pastedData.shift() || val)
            if (changedValue) {
              updatedOTPValues[index] = changedValue
              nextFocusIndex = index
            }
          }
        })
        setOTPValues(updatedOTPValues)
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1))
      }
    },
    [activeInput, getRightValue, length, otpValues],
  )

  const authContext = useAuthContext()

  return (
    <div className={styles.root}>
      <div className={cx(styles.inputs, { [styles.additional]: props.center })}>
      {Array(length)
        .fill('')
        .map((_, index) => (<div className={styles.input} key={index}>
          <SingleOTPInputComponent
            key={`SingleInput-${index}`}
            focus={activeInput === index}
            value={otpValues && otpValues[index]}
            autoFocus={true}
            error={hasError || error}
            onFocus={handleOnFocus(index)}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            onBlur={onBlur}
            onPaste={handleOnPaste}
            placeholder=''
          />
          </div>
        ))}
      </div>
      <FieldError showError={hasError}>{meta?.error}</FieldError>
    </div>
  )
}
