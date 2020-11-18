import * as React from "react";
import Tab from "pages/PersonalArea/[mode]/components/Tabs/components/Tab";
import styles from './index.module.scss'
interface TabOption {
  name: string,
  link: string,
  key: string,
}
interface Props {
  tabs: TabOption[],
  activeTab: string
}
const Tabs = ({tabs, activeTab}: Props) => {
  return (
    <div className={styles.root}>
      {tabs.map(item => <Tab name={item.name} link={item.link} isActive={activeTab === item.key}/>)}
      <div className={styles.border}/>
    </div>
  )
}
export default Tabs
