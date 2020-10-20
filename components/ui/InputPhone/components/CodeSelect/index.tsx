import { useDetectOutsideClick } from "components/layout/Header/components/LangSelect/useDetectOutsideClick";
import { useRef, useState } from "react";
import styles from './index.module.scss'
import cx from 'classnames'

export const CodeSelect = (props) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive);
  }
  const [value, setValue] = useState(props.value);

  const handleOptionClick = (e, item) => {
    e.preventDefault();
    setValue(item);
    setIsActive(false);

    props.onChange(item);
  }
  const handleActiveOptionClick = (e) => {
    e.preventDefault();
    setIsActive(false);
  }
  return (
    <div className={styles.root}>
      <a onClick={onClick} className={styles.dropDownTrigger}>
        <img className={styles.dropdownItemIcon} src={`img/icons/ru.svg`} alt=''/>
        <span className={styles.dropdownItemLabel}>{props.formatTriggerLabel ? props.formatTriggerLabel(value) : value.label}</span>
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
          {props.options.filter(item => !value || item.value != value.value).map(item => (
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
