import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import Input from "components/ui/Inputs/Input";
import BaseInput from "components/ui/Inputs/Input/components/BaseInput";
import InputPriceFilterForm from "components/ui/Inputs/InputPriceFilter/components/InputPriceFilterForm";
import SelectInput from "components/ui/Inputs/SelectInput";
import { useEffect, useRef, useState } from "react";
import styles from './index.module.scss'
import cx from 'classnames'

interface Props {
  input?: any,
  meta?: any,
  label?: string,
  labelType?: any,
  size?: any,
  type: string
  formKey?: string
  inputLabel?: string
}

export default function InputPriceFilter(props: Props) {
  const { error, touched } = props.meta ? props.meta : {error: null, touched: false}

  const { input } = props
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [val, setVal] = useState(null);

  console.log("PROPSFORM", props.formKey);
  useEffect(() => {
    console.log("SetInputValue", input.value)
    setVal(input.value);
  }, [input.value])
  useEffect(() => {
    if(!isActive && val){
      console.log("setonChange", val)
      input.onChange(val);
    }
  }, [isActive])
  const onClick = (e) => {
    e?.preventDefault()
    setIsActive(!isActive);
  }
  const handleOnChange = (data) => {
    console.log("onCHange", data);
    setVal(data)
  }
  const formatVal = (data) => {
    if(!data){
      return '';
    }
    console.log("FormatVal", data);
    if(!data.min && !data.max){
      return '';
    }
    if(!data.max){
      return `From $${data.min}`
    }
    if(!data.min && data.max){
      console.log("FFF", data);
      return `Under $${data.max}`
    }


    return `$${data.min} - $${data.max}`
  }
  console.log("input.value", input.value)

  return (
    <Input {...props} onClick={onClick}
           input={{value: formatVal(val), onChange: null}}
           onIconClick={onClick}
           icon={
             <img src={`/img/field/${props.size === 'small' ? 'arrowDownRed' : 'arrowDown'}.svg`} alt=''/>
           }>
      <div ref={dropdownRef} className={`${cx(styles.dropDown, { [styles.dropDownActive]: isActive, [styles.dropDownWithLabelCross]: props.labelType === 'cross' })}`}>
        <div className={styles.inputContainer}>
          <BaseInput
                     value={formatVal(val)}
                     withBorder={false}
                     parentRef={searchInputRef}/>
          <div className={styles.dropDownTrigger}>
            <img src={`/img/field/${props.size === 'small' ? 'arrowDownRed' : 'arrowDown'}.svg`} alt=''/>
          </div>
        </div>
        <div className={styles.container}>
       <InputPriceFilterForm form={`${props.formKey}InputPriceFilterForm`} onChange={handleOnChange} initialValues={input.value}/>
        </div>
      </div>
    </Input>
  )
}
InputPriceFilter.defaultProps = {
  labelType: 'placeholder',
}
