import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import styles from './index.module.scss'
import cx from 'classnames'
import ArrowDropDown from 'components/svg/ArrowDropDown'
import Link from 'next/link';
interface OptionItem{
  label: string
  link: string
}
interface Props {
  role?: string
  onChange?: (item) => void,
  value?: any,
  items: OptionItem[]
}
export const SkillDropDown = (props: Props) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive);
  }
  const getDropDownClass = () => {
    switch (props.role){
      case 'master':
        return styles.master;
      case 'client':
        return styles.client;
      case 'volunteer':
        return styles.volunteer;
    }
  }

  return (
    <div className={cx(styles.root)}>
      <a onClick={onClick} className={`${styles.dropDownTrigger} ${isActive && styles.dropDownTriggerActive}`}>
        Categories +{props.items.length} <ArrowDropDown/>
      </a>
      <nav ref={dropdownRef} className={cx(styles.dropDown,  getDropDownClass(), { [styles.dropDownActive]: isActive })}>
        {props.items.map(item => <Link href={item.link}><a className={styles.skill}>{item.label}</a></Link>)}
      </nav>
    </div>
  );
};
