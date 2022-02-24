import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick';
import {FieldConfig, useField, useFormikContext} from 'formik'
import { useRef } from 'react';
import styles from './index.module.scss'
import cx from 'classnames'
interface IOption{
  value: any
  label: string
}
interface Props {
  options: IOption[]
  label?: string
  placeholder?: string
  disabled?: boolean
}

export const Select = (props: Props & FieldConfig) => {
  const {label, placeholder, options, disabled} = props;
  const [field, meta] = useField(props)
  const {value} = field;
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const handleClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive);
  }
  const handleChange = (value) => {
    if(disabled){
      return;
    }
    setFieldValue(props.name, value)
    setIsActive(false)
  }
  const currentItem = options.find(i => i.value === value);
  const hasError = !!meta.error && meta.touched;
  return (
    <div className={cx(styles.root, {[styles.hasError]: !!meta.error && meta.touched})}>
      <div className={styles.input}>
      <div  onClick={handleClick} className={cx(styles.dropDownTrigger)}>
        <div className={styles.placeholder}>{currentItem ? currentItem?.label : (placeholder || '')}</div>
        <img src="/img/Order/select.svg" alt=""/>
      </div>
      <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
       {options.map(item => <div className={cx(styles.option, {[styles.optionActive]: currentItem?.value === item.value })} onClick={() => handleChange(item.value)}>{item.label}</div>)}
       </nav>
      </div>
    </div>
  )
}
Select.defaultProps = {
  placeholder: 'Выберите'
}
