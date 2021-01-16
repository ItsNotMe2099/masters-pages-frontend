import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import { changeRole } from "components/Profile/actions";
import ArrowDropDown from "components/svg/ArrowDropDown";
import Avatar from "components/ui/Avatar";
import { I18nContext } from "next-i18next";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import { IRootState } from "types";
import { getMediaPath } from "utils/media";
import styles from './index.module.scss'
import cx from 'classnames'
import nextI18 from "i18n";

import { useSelector, useDispatch } from 'react-redux'
import cookie from "js-cookie";
import Router from "next/router";
export const ProfileSelect = () => {
  const role = useSelector((state: IRootState) => state.profile.role)
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)

  const dispatch = useDispatch()
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive);
  }
  const options = [
    { value: 'profile', label: 'Your profile', link: `/PersonalArea` },
    { value: 'messages', label: 'Messages', link: `/PersonalArea/${role}/messages` },
    { value: 'settings', label: 'Settings', link: `/PersonalArea/${role}/settings` },
    { value: 'orders', label: 'Orders', link: `/PersonalArea/${role}/orders` },
    { value: 'logout', label: 'Logout' },
  ]
  const [value, setValue] = useState(options.find(item => role ? item.value === role : item.value === 'client'));

  const handleOptionClick = (e, item) => {
    e.preventDefault()
    if(item.value === 'logout'){
      cookie.remove("token");
      Router.push('/');
      return;
    }
    console.log("SetLang", item.value);
    if (item.link) {
      router.push(item.link)
    }
    setIsActive(false);
  }

  return (
    <div className={styles.root}>
      <a onClick={onClick} className={cx(styles.dropDownTrigger, { [styles.dropDownTriggerActive]: isActive })}>
        <div className={styles.photo}><Avatar size={'small'} image={profile?.photo}/></div>
        <ArrowDropDown/>

      </a>
      {isActive && <div className={styles.mobileSelectBg}/>}
      <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        <ul>
          {options.filter(item => !value || item.value != value.value).map(item => (
            <li className={styles.dropdownItem}>
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
