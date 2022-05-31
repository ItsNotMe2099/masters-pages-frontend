import styles from './index.module.scss'
import Tab from 'components/ui/Tabs/Tab'
import * as React from 'react'

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
       {tabs.map((item, index) => <Tab isFirst={index === 0}  isLast={tabs.length - 1 == index} name={item.name} link={item.link} isActive={activeTab === item.key} onClick={onChange ? () => onChange(item) : null}/>)}
    </div>
  )
}
