import styles from './index.module.scss'
import {FieldConfig, useField} from 'formik'
import cx from 'classnames';
import {ReactElement, useState} from 'react'
import ErrorInput from 'components/ui/Formik/components/ErrorInput'
import Input from 'components/ui/Formik/Input'

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
  labelType: 'placeholder' | 'cross' | 'static'
}

export default function InputPassword(props: Props & FieldConfig) {
  const {label, placeholder, className, inputClassName, hasAutoComplete, icon, variant, labelType} = props;
  const [field, meta] = useField(props)
  const hasError = !!meta.error && meta.touched;
  const [showRaw, setShowRaw] = useState(false)
  const [isShown, setIsShown] = useState(false)
  const handleShowClick = (e) => {
    e.preventDefault()
    setShowRaw(i => !i);
  }

  return (
    <div className={cx(styles.root, className, {[styles.hasError]: !!meta.error && meta.touched})}>
      <Input label={label} labelType={labelType} {...field} type={isShown ? 'text' :'password'} icon={
      isShown ?
        (<a onClick={() => setIsShown(false)}><img src='/img/field/show.svg' alt=''/></a>)
        :
        (<a onClick={() => setIsShown(true)}><img src='/img/field/hide.svg' alt=''/></a>)
    }/>
      <ErrorInput {...meta}/>
    </div>
  )
}
