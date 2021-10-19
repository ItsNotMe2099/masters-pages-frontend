import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import { changeRole } from "components/Profile/actions";
import ArrowDropDown from "components/svg/ArrowDropDown";
import { useContext, useEffect, useRef, useState } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import cx from 'classnames'
import nextI18 from "i18n";

import { useSelector, useDispatch } from 'react-redux'
import {useTranslation, withTranslation} from "i18n";
import {getProfileRoleByRoute} from 'utils/profile'
import {useRouter} from 'next/router'

interface Props {
  onClick?: () => void
}

 const ModeSelect = (props: Props) => {
   const { t } = useTranslation('common');
   const {route: currentRoute} = useRouter();
   const roleCurrent = useSelector((state: IRootState) => state.profile.role)
   const role =  getProfileRoleByRoute(currentRoute)  || roleCurrent;
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

  useEffect(() => {
    setValue(options.find(item => role ? item.value === role : item.value === 'client'));
  }, [role]);
  const handleOptionClick = (e, item) => {
    e.preventDefault()
    setValue(item);
    dispatch(changeRole(item.value))
    setIsActive(false);
    if(props.onClick) {
    props.onClick()
    }
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

   const getTextColor = () => {
    switch (value?.value) {
      case 'master':
        return styles.modeMasterText;
      case 'volunteer':
        return styles.modeVolunteerText;
      case 'client':
      default:
        return styles.modeClientText;
    }
  }

  return (
    <>
    <div className={`${styles.root} ${getModeClass()}`}>
      <a onClick={onClick} className={`${styles.dropDownTrigger} ${getTextColor()}`}>
        <div className={`${styles.dropdownItemLabel} ${getTextColor()}`}>{value.label}</div>
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
    <div className={styles.menuSeparator}></div>
    </>
  );
};
export default ModeSelect
