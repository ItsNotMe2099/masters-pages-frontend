import styles from 'components/fields/PasswordField/index.module.scss'
import {FieldConfig, useField} from 'formik'
import cx from 'classnames'
import {ReactElement, useState} from 'react'
import ErrorInput from 'components/ui/Formik/components/ErrorInput'
import TextField from 'components/fields/TextField'
import FieldError from 'components/ui/FieldError'
import {LabelStyleType} from 'types/types'

interface Props {
  label?: string,
  placeholder?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  hasAutoComplete?: boolean
  icon?: ReactElement
  name?: string
  variant?: 'normal' | 'shadow' | 'large'
  labelType: LabelStyleType
}

export default function PasswordField(props: Props & FieldConfig) {
  const {label, placeholder, className, inputClassName, hasAutoComplete, icon, variant, labelType} = props
  const [field, meta] = useField(props)
  const [showRaw, setShowRaw] = useState(false)
  const [isShown, setIsShown] = useState(false)


  return (
      <TextField size='normal' label={label}  labelType={labelType} {...field} type={isShown ? 'text' :'password'} icon={
      isShown ?
        (<a onClick={() => setIsShown(false)}><img src='/img/field/show.svg' alt=''/></a>)
        :
        (<a onClick={() => setIsShown(true)}><img src='/img/field/hide.svg' alt=''/></a>)
    }/>
  )
}
