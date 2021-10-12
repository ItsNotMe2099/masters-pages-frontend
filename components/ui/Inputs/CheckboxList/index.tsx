import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styles from './index.module.scss'
import Checkbox from "react-custom-checkbox";

interface Props {
  options: [{ value: string, label: string }],
  onSearchChange?: (string) => void,
  onOpenDropDown?: () => void;
  allowCustomInput?: boolean,
  input: any
  changeWithValue?: boolean
  restrictedValues: any[],
  grid: number
  flex: string
  checkboxClassName?: string
}

export const CheckboxList = (props) => {
  const { meta: { error, touched }, input,restrictedValues, options, label, type, ...rest } = props;

  const handleCheckboxChanged = useCallback((item, isChecked) => {
    if(isChecked){
      input.onChange([...input.value, props.changeWithValue ? item : item.value]);
    }else{
      input.onChange(input.value.filter(val => props.changeWithValue ? val.value !== item.value : val !== item.value));
    }
  }, [input.value])

  return (
    <div className={`${styles.root} ${props.flex === 'row' && styles.flexRow}  ${props.flex === 'float' && styles.flexFloat} ${props.flex === 'column' && styles.flexColumn}`} style={{
   ...(props.grid ? {display: 'grid',
     gridTemplateColumns: props.grid ? Array.from({ length: props.grid }, (_, i) => '1fr').join(' ') : '',
     gridGap: '1vw'} : {}),

    }}>
      {options.filter(item => restrictedValues.indexOf(item.value) === -1).map(item => (
        <div className={styles.checkbox}>
          <Checkbox
            checked={input.value && input.value.find && (props.changeWithValue ? !!input.value.find((it) => it.value == item.value) : input.value.indexOf(item.value) >= 0) }
            icon={<img src={'/img/icons/checkbox-checked.svg'} style={{ width: 21 }} alt="" />}
            borderColor="#e6e6e6"
            borderRadius={2}
            size={21}
            containerClassName={`${styles.checkboxContainer} ${!props.grid && styles.checkboxNoGrid} ${props.checkboxClassName}`}
            labelClassName={styles.checkboxLabel}
            labelStyle={{}}
            label={item.label}
            onChange={(checked) => handleCheckboxChanged(item, checked)}
          />
        </div>
      ))}
      <div className={styles.error}><ErrorInput {...props}/></div>
      </div>

  );
};

CheckboxList.defaultProps = {
  labelType: 'static',
  restrictedValues: []
}
