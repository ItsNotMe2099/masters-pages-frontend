import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import { changeRole } from "components/Profile/actions";
import ArrowDropDown from "components/svg/ArrowDropDown";
import { I18nContext } from "next-i18next";
import { useContext, useEffect, useRef, useState } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import cx from 'classnames'
import nextI18 from "i18n";

import { useSelector, useDispatch } from 'react-redux'
import {useTranslation, withTranslation} from "react-i18next";

 const ModeSelect = () => {
   const { t } = useTranslation('common');
  const role = useSelector((state: IRootState) => state.profile.role)
  const dispatch = useDispatch()

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive);
  }

  const options = [
    { value: 'client', label: t('personalArea.profile.modeClient') },
    { value: 'master', label: t('personalArea.profile.modeMaster') },
    { value: 'volunteer', label: t('personalArea.profile.modeVolunteer') },
  ]
  const [value, setValue] = useState(options.find(item => role ? item.value === role : item.value === 'client'));

  console.log("InitValue", value);
  useEffect(() => {
    setValue(options.find(item => role ? item.value === role : item.value === 'client'));
  }, [role]);
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

   const getModeClass = () => {
     switch (value?.value) {
       case 'master':
         return styles.modeMaster;
       case 'volunteer':
         return styles.modeVolunteer;
       case 'client':
       default:
         return styles.modeClient;
     }
   }

  return (
    <div className={`${styles.root} ${getModeClass()}`}>
      <a onClick={onClick} className={styles.dropDownTrigger}>
        <div className={styles.dropdownItemLabel}>{value.label}</div>
        <ArrowDropDown/>
      </a>
      <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        <ul>
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
export default ModeSelect
