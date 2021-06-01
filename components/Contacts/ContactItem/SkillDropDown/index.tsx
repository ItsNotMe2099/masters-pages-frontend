import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import { I18nContext } from "next-i18next";
import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import styles from './index.module.scss'
import cx from 'classnames'
import nextI18 from "i18n";
import ArrowDownSmall from 'components/svg/ArrowDownSmall'
import ArrowDropDown from 'components/svg/ArrowDropDown'
interface OptionItem{
  label: string
  value: string
}
interface Props {
  children: ReactElement[]
  onChange?: (item) => void,
  value?: any,
  dropdownClassName?: string
}
export const SkillDropDown = (props: Props) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive);
  }


  return (
    <div className={styles.root}>
      <a onClick={onClick} className={`${styles.dropDownTrigger} ${isActive && styles.dropDownTriggerActive}`}>
        +{props.children.length} <ArrowDropDown/>
      </a>
      <nav ref={dropdownRef} className={cx(styles.dropDown, props.dropdownClassName, { [styles.dropDownActive]: isActive })}>
        {props.children}
      </nav>
    </div>
  );
};
