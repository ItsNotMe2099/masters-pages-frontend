import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import { changeRole } from "components/Profile/actions";
import ArrowDropDown from "components/svg/ArrowDropDown";
import Avatar from "components/ui/Avatar";
import NotificationBadge from "components/ui/NotificationBadge";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import cx from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import {useTranslation} from "react-i18next";
import {logout} from "../../../../Auth/actions";

const ProfileSelect = (props) => {
  const { t } = useTranslation('common');
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
    { value: 'profile', label: t('menu.profile'), link: `/me` },
    { value: 'messages', badge: profile.notificationMessageCount, label: t('menu.messages'), link: `/Chat` },
    { value: 'reviews', label: t('menu.reviews'), badge: profile.notificationFeedbackCount,  link: `/PersonalArea/reviews` },
    { value: 'orders', label: t('menu.orders'), badge: profile.notificationTaskResponseDeclinedCount + profile.notificationTaskOfferDeclinedCount + profile.notificationTaskResponseCount + profile.notificationTaskOfferCount,  link: `/orders` },
    { value: 'settings', label: t('menu.settings'), link: `/PersonalArea/settings` },
    { value: 'calendar', label: t('menu.calendar'), link: `/PersonalArea/calendar` },
    { value: 'logout', label: t('menu.logout') },
  ]
  const [value, setValue] = useState(options.find(item => role ? item.value === role : item.value === 'client'));

  const handleOptionClick = (e, item) => {
    e.preventDefault()
    if(item.value === 'logout'){
      dispatch(logout());
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
        <div className={styles.photo}>{profile?.notificationTotalCount > 0 && <NotificationBadge amount={profile?.notificationTotalCount}/>} <Avatar size={'small'} image={profile?.photo}/></div>
        <ArrowDropDown/>

      </a>
      {isActive && <div className={styles.mobileSelectBg}/>}
      <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        <ul>
          {options.filter(item => !value || item.value != value.value).map(item => (
            <li className={styles.dropdownItem}>
              <a href="" onClick={(e) => handleOptionClick(e, item)}>
                <span className={styles.dropdownItemLabel}>{item.label}       {item.badge > 0 && <NotificationBadge border={false} right={'-16px'} top={'3px'} amount={item.badge}/>}</span>

              </a>
            </li>
          ))}

        </ul>
      </nav>
    </div>
  );
};
export default ProfileSelect
