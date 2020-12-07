import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import Input from "components/ui/Inputs/Input";
import BaseInput from "components/ui/Inputs/Input/components/BaseInput";
import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import { I18nContext } from "next-i18next";
import { useContext, useEffect, useRef, useState } from "react";
import styles from './index.module.scss'
import cx from 'classnames'
import nextI18 from "i18n";

interface Props {
  options: [{ value: string, label: string }],
  onSearchChange?: (string) => void,
  onOpenDropDown?: () => void;
  changeWithValue?: boolean
  allowCustomInput?: boolean,
  restrictedValues: any[],
  input?: any,
  meta?: any,
  label?: string,
  labelType?: any,

}

const SelectInput = (props: Props) => {
  const { meta: { error, touched },restrictedValues, input, options, onOpenDropDown, label, ...rest } = props;
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const valueInputRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [currentLabel, setCurrentLabel] = useState('');
  console.log("SelectValue", restrictedValues);
  const onClick = (e) => {
    e.preventDefault()
    if (!isActive && onOpenDropDown) {
      onOpenDropDown();
    }

    if (!isActive) {
      setTimeout(() => {
        console.log("SETFocus", searchInputRef.current)
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100)
    }
    setIsActive(!isActive);
  }

  const handleOptionClick = (e, item) => {
    e.preventDefault()

    if(props.changeWithValue){
      input.onChange(item);
    }else {
      input.onChange(item.value);
    }
    setIsActive(false);
    console.log("setValue", item.value)
    if (searchInputRef && searchInputRef?.current) {

      searchInputRef.current.value = '';
    }

  }
  useEffect(() => {
    if(!input){
      return;
    }
    if(props.allowCustomInput){
      setCurrentLabel(props.changeWithValue ? input.value.label :  input.value )
    }else {
      setCurrentLabel(props.options.find(item => props.changeWithValue ? input.value.value === item.value : input.value === item.value)?.label)
    }
    }, [input, options])

  const handleActiveOptionClick = (e) => {
    e.preventDefault();
    setIsActive(false);
  }
  return (
    <Input {...props} onClick={onClick}
           input={{value: currentLabel, onChange: null}}
           icon={<a>
             <img src='/img/field/arrowDown.svg' alt=''/></a>
           }>
      <div ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive, [styles.dropDownWithLabelCross]: props.labelType === 'cross' })}>
        <div className={styles.inputContainer}>
          <BaseInput onChange={(e) => {
            if(props.allowCustomInput){
              console.log("onChange", e.currentTarget.value)
              input.onChange(e.currentTarget.value)
              }
              props.onSearchChange(e.currentTarget.value)
            }}
            value={props.allowCustomInput ? input.value : null}
            withBorder={false}
            parentRef={searchInputRef}/>
          <a className={styles.dropDownTrigger}>
            <img src='/img/field/arrowDown.svg' alt=''/>
          </a>
        </div>

        <ul>
          {options.filter(item => restrictedValues.indexOf(item.value) === -1).map(item => (
            <li className={styles.dropdownItem}
            >
              <a href="" onClick={(e) => handleOptionClick(e, item)}>
                <div
                  className={`${(props.changeWithValue ? input.value.value === item.value : input.value === item.value) ? styles.circle__active : styles.circle}`}></div>
                <span className={styles.dropdownItemLabel}>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Input>

  );
};

SelectInput.defaultProps = {
  labelType: 'placeholder',
  onSearchChange: () => {},
  onOpenDropDown: () => {},
  restrictedValues: []
}
export default SelectInput
