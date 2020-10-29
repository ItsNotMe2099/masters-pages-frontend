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

export const SelectInput = ({error, touched, input,options, ...rest}) => {

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


        <div className={styles.inputContainer}>
          <input onClick={onClick}
                 ref={valueInputRef}
            className={styles.input}/>
          <div className={styles.inputLabel}>Location*</div>
          <a><img src='img/field/location.svg' alt=''/></a>
        </div>

      <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        <input
          ref={searchInputRef}
          onChange={rest.onSearchChange}
          className={styles.inputDropDown} placeholder={'Enter'}/>
        <ul>

          {options.map(item => (
            <li className={styles.dropdownItem}
            >
              <a href="" onClick={(e) => handleOptionClick(e, item)}>
                <span className={styles.dropdownItemLabel}>{item.label}</span>
              </a>
            </li>
          ))}

        </ul>
      </nav>
    </div>
  );
};
