import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import Input from "components/ui/Inputs/Input";
import BaseInput from "components/ui/Inputs/Input/components/BaseInput";
import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import { I18nContext } from "next-i18next";
import { useContext, useEffect, useRef, useState } from "react";
import styles from './index.module.scss'
import cx from 'classnames'
import nextI18 from "i18n";
import {useTranslation} from "react-i18next";

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
  size?: any,
  withIcon?: boolean,
  showEmpty?: boolean,
  emptyText?: string

}

const SelectInput = (props: Props) => {
  const {t} = useTranslation()
  const { meta: { error, touched },restrictedValues, input, options, onOpenDropDown, label, ...rest } = props;
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const valueInputRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [currentLabel, setCurrentLabel] = useState('');

  const getSizeClass = (size) => {
    switch (size) {
      case 'small':
        return styles.dropDownSmall;
      case 'normal':
      default:
        return styles.dropDownNormal;
    }
  }
  const onClick = (e) => {
    e?.preventDefault()
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
  const handleOptionEmptyClick = (e) => {
    e.preventDefault()
    input.onChange(null);
    setIsActive(false);
    if (searchInputRef && searchInputRef?.current) {
      searchInputRef.current.value = '';
    }
    setCurrentLabel('');
  }
  useEffect(() => {
    if(!input){
      return;
    }
    let _setCurrentLabel = null;
    if(props.allowCustomInput){
      _setCurrentLabel = (props.changeWithValue ? input.value.label :  input.value )
    }else {
      _setCurrentLabel = (options.find(item => props.changeWithValue ? input.value.value === item.value : input.value === item.value)?.label)
    }
    console.log("_setCurrentLabel", _setCurrentLabel)

    setCurrentLabel(_setCurrentLabel);
    }, [input, options])

  const handleActiveOptionClick = (e) => {
    e.preventDefault();
    setIsActive(false);
  }
  return (
    <Input {...props} onClick={onClick}
           input={{value: currentLabel, onChange: null, name: props.input.name}}
           onIconClick={onClick}
           icon={
             <img src={`/img/field/${props.size === 'small' ? 'arrowDownRed' : 'arrowDown'}.svg`} alt=''/>
           }>
      <div ref={dropdownRef} className={`${cx(styles.dropDown, { [styles.dropDownActive]: isActive, [styles.dropDownWithLabelCross]: props.labelType === 'cross' })} ${getSizeClass(props.size)}`}>
        <div className={styles.inputContainer}>
          <BaseInput onChange={(e) => {
            if(props.allowCustomInput){
              console.log("onChange", e.currentTarget.value)
              input.onChange(e.currentTarget.value)
              }
              props.onSearchChange(e.currentTarget.value)
            }}
            value={props.allowCustomInput ? input.value : null}
                     input={{
                       name: props.input.name
                     }}
            withBorder={false}
            parentRef={searchInputRef}/>
          <div className={styles.dropDownTrigger}>
            <img src={`/img/field/${props.size === 'small' ? 'arrowDownRed' : 'arrowDown'}.svg`} alt=''/>
          </div>
        </div>

        <ul>
          {props.showEmpty && <li className={styles.dropdownItem}>
            <a href="" onClick={handleOptionEmptyClick}>
              {props.withIcon && <div
                className={`${input.value ? styles.circle__active : styles.circle}`}></div>}
              <span className={styles.dropdownItemLabel}>{props.emptyText || t('forms.selectInput.emptyActionText')}</span>
            </a>
          </li>}
          {options.filter(item => restrictedValues.indexOf(item.value) === -1).map(item => (
            <li className={styles.dropdownItem}
            >
              <a href="" onClick={(e) => handleOptionClick(e, item)}>
                {props.withIcon && <div
                  className={`${(props.changeWithValue ? input.value.value === item.value : input.value === item.value) ? styles.circle__active : styles.circle}`}></div>}
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
  restrictedValues: [],
  withIcon: true
}
export default SelectInput
