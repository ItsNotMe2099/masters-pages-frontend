import { useDetectOutsideClick } from "components/layout/Header/components/LangSelect/useDetectOutsideClick";
import { I18nContext } from "next-i18next";
import { useContext, useEffect, useRef, useState } from "react";
import styles from './index.module.scss'
import cx from 'classnames'
import nextI18 from "i18n";
interface Props {
  options: [{value: string, label: string}],
  onSearchChange?: (string) => void
}

export const SelectInput = ( {error, touched, input,options,isLocation=false, isCategory=false, isRegistration=false, isTask=false, label, type, ...rest}) => {

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const valueInputRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive);
  }
  const [value, setValue] = useState(input.value ? options.find(item => item.value === input.value) : options[0]);

  useEffect(() => {
    const currentValue = input.value ? options.find(item => item.value === input.value) : options[0];
    if(searchInputRef.current && currentValue) {
      searchInputRef.current.value = (currentValue);
    }
  })
  const handleOptionClick = (e, item) => {
    e.preventDefault()
    input.onChange(item.value);

    setIsActive(false);
    setValue(item);
    if(valueInputRef){
      valueInputRef.current.value = (item.label);
    }
    console.log(item)
    console.log(valueInputRef.current.value)
  }

  const handleActiveOptionClick = (e) => {
    e.preventDefault();
    setIsActive(false);
  }
  return (
    <div className={styles.root}>

        {error &&
        touched && (
          <div className={styles.error}>
            {error}
          </div>)}

        <div className={`${isLocation && isRegistration && styles.inputContainer} ${isTask && styles.inputContainer__category}`}>
          <input onClick={onClick}
                 ref={valueInputRef}
                 placeholder={label}
                 type={type}
            className={`${isLocation && isRegistration && styles.input} ${isTask && styles.input__category}`}/>
          <div className={`${isRegistration && styles.inputLabel} ${!isRegistration && styles.inputLabel__none}`}>Location*</div>
          <a className={`${isCategory && styles.locationImg__none}`}><img src='img/field/location.svg' alt=''/></a>
          <a className={`${isLocation && styles.categoryImg__none}`} ><img src='img/field/arrowDown.svg' alt=''/></a>
        </div>



      <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
      <div className={`${isLocation && styles.inputContainer} ${isCategory && styles.inputContainer__category}`}>
        <input
          ref={searchInputRef}
          onChange={rest.onSearchChange}
          className={styles.inputDropDown} placeholder={label}/>
          <a className={`${isLocation && styles.categoryImg__none}`} ><img src='img/field/arrowDown.svg' alt=''/></a>
        </div>
        <ul>
          {options.map(item => (
            <li className={styles.dropdownItem}
            >
              <a href="" onClick={(e) => handleOptionClick(e, item)}>
                <div className={`${valueInputRef.current !== null && item.label === valueInputRef.current.value ? styles.circle__active : styles.circle}`}></div><span className={styles.dropdownItemLabel}>{item.label}</span>
              </a>
            </li>
          ))}

        </ul>
      </nav>
    </div>
  );
};
