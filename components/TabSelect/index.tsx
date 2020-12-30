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
  const handleOptionClick = (item) => {
    console.log(item)
  }


  return (
    <div className={styles.root}>
      <a href="#" onClick={handleClick} className={cx(styles.dropDownTrigger)}>
      {activeTab === "personal" ? <span>Personal information</span> :
      activeTab === "portfolio" ? <span>My portfolio</span> :
      activeTab === "reviews" ? <span>Rewiews and rating</span> :
      activeTab === "orders" ? <span>Orders</span> :
      activeTab === "messages" ? <span>Messages</span> :
      activeTab === "saved" ? <span>Saved</span> :
      activeTab === "settings" ? <span>Settings</span> :
      null }
      <img src="/img/field/arrowDown.svg" alt=""/>
      </a>
       <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
       {tabs.map(item => <Tab name={item.name} link={item.link} isActive={activeTab === item.key} onClick={onChange ? () => onChange(item) : null}/>)}
       </nav>
    </div>
  );
};
