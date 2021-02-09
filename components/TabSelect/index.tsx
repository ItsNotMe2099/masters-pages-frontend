import { useRef, useState } from "react";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import styles from './index.module.scss'
import cx from 'classnames'
import Tab from "components/ui/Tabs/Tab";
import { isTemplateExpression } from "typescript";

interface TabOption {
  name: string,
  link?: string,
  key: string
}

interface Props {
  tabs: TabOption[],
  activeTab: string,
  onChange?: (item) => void
}

export const TabSelect = ({tabs, activeTab, onChange}: Props) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const handleClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive);
  }

  return (
    <div className={styles.root}>
      <a href="#" onClick={handleClick} className={cx(styles.dropDownTrigger)}>
        {tabs.map(item => activeTab === item.key && <span>{item.name}</span>)}
      <img src="/img/field/arrowDown.svg" alt=""/>
      </a>
       <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
       <div className={styles.option} onClick={() => setIsActive(false)}>{tabs.map(item => <Tab name={item.name} link={item.link} isActive={activeTab === item.key} onClick={onChange ? () => onChange(item) : null}/>)}</div>
       </nav>
    </div>
  );
};
