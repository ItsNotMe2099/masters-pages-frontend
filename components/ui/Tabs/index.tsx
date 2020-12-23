import Tab from "components/ui/Tabs/Tab";
import * as React from "react";

import styles from './index.module.scss'
interface TabOption {
  name: string,
  link?: string,
  key: string,
}
interface Props {
  tabs: TabOption[],
  activeTab: string,
  onChange?: (item) => void
  style?: 'fullwidth' | 'round' | 'roundSmall' | 'outline'
}
const Tabs = ({tabs, activeTab, onChange, style}: Props) => {
  const handleChange = (item: TabOption) => {
    if(onChange){
      onChange(item);
    }
  }
  return (
    <div className={`${styles.root} ${style === 'fullwidth' && styles.fullWidth} ${(style === 'round' || style === 'roundSmall') && styles.round} ${style === 'outline' && styles.outline}`}>
      {tabs.map(item => <Tab name={item.name} link={item.link} isActive={activeTab === item.key} onClick={onChange ? () => onChange(item) : null} style={style}/>)}
      <div className={styles.border}/>
    </div>
  )
}
Tabs.defaultProps = {
  style: 'fullwidth'
}
export default Tabs
