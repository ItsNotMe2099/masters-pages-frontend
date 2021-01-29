import { useRef, useState } from "react";
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

  return (
    <div className={styles.root}>
       {tabs.map(item => <Tab name={item.name} link={item.link} isActive={activeTab === item.key} onClick={onChange ? () => onChange(item) : null}/>)}
    </div>
  );
};
