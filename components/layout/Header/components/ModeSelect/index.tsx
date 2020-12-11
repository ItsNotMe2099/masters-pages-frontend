import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import { changeRole } from "components/Profile/actions";
import ArrowDropDown from "components/svg/ArrowDropDown";
import { I18nContext } from "next-i18next";
import { useContext, useRef, useState } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import cx from 'classnames'
import nextI18 from "i18n";

import { useSelector, useDispatch } from 'react-redux'
export const ModeSelect = () => {
  const role = useSelector((state: IRootState) => state.profile.role)
  const dispatch = useDispatch()

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive);
  }
  const options = [
    { value: 'client', label: 'Client' },
    { value: 'master', label: 'Master' },
    { value: 'volunteer', label: 'Volunteer' },
  ]
  const [value, setValue] = useState(options.find(item => role ? item.value === role : item.value === 'client'));

  const handleOptionClick = (e, item) => {
    e.preventDefault()
    setValue(item);
    dispatch(changeRole(item.value))
    setIsActive(false);
  }
  const handleActiveOptionClick = (e) => {
    e.preventDefault();
    setIsActive(false);
  }
  return (
    <div className={styles.root}>
      <a onClick={onClick} className={styles.dropDownTrigger}>
        <span className={styles.dropdownItemLabel}>{value.label}</span>
        <ArrowDropDown/>
      </a>
      <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        <ul>
          {value &&
          <li className={styles.dropdownItem}><a href="" onClick={handleActiveOptionClick}>
            <span className={styles.dropdownItemLabel}>{value.label}</span>
            <img className={styles.arrowActive}
                 src={`/img/icons/arrow_active.svg`}
                 alt=''/></a></li>
          }
          {options.filter(item => !value || item.value != value.value).map(item => (
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
