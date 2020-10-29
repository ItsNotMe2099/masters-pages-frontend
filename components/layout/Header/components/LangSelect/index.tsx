import { useDetectOutsideClick } from "components/layout/Header/components/LangSelect/useDetectOutsideClick";
import { I18nContext } from "next-i18next";
import { useContext, useRef, useState } from "react";
import styles from './index.module.scss'
import cx from 'classnames'
import nextI18 from "i18n";
export const LangSelect = () => {
  const { i18n: { language } } = useContext(I18nContext)
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive);
  }
  const options = [
    { value: 'ru', label: 'RU' },
    { value: 'en', label: 'EN' },
    { value: 'fr', label: 'FR' },
  ]
  const [value, setValue] = useState(options.find(item => item.value === language));

  const handleOptionClick = (e, item) => {
    e.preventDefault()
    console.log("SetLang", item.value);
    setValue(item);
    nextI18.i18n.changeLanguage(item.value)
    setIsActive(false);
  }
  const handleActiveOptionClick = (e) => {
    e.preventDefault();
    setIsActive(false);
  }
  return (
    <div className={styles.root}>
      <a onClick={onClick} className={styles.dropDownTrigger}>
        <img className={styles.dropdownItemIcon} src={`img/icons/ru.svg`} alt=''/>
        <span className={styles.dropdownItemLabel}>{value.label}</span>
        <img className={styles.arrow} src={`img/icons/arrow.svg`} alt=''/>
      </a>
      <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        <ul>
          {value &&
          <li className={styles.dropdownItem}><a href="" onClick={handleActiveOptionClick}>
            <img className={styles.dropdownItemIcon} src={`img/icons/ru.svg`} alt=''/>
            <span className={styles.dropdownItemLabel}>{value.label}</span>
            <img className={styles.arrowActive}
                 src={`img/icons/arrow_active.svg`}
                 alt=''/></a></li>
          }
          {options.filter(item => !value || item.value != value.value).map(item => (
            <li className={styles.dropdownItem}
            >
              <a href="" onClick={(e) => handleOptionClick(e, item)}>
                <img className={styles.dropdownItemIcon} src={`img/icons/ru.svg`} alt=''/>
                <span className={styles.dropdownItemLabel}>{item.label}</span>
              </a>
            </li>
          ))}

        </ul>
      </nav>
    </div>
  );
};
