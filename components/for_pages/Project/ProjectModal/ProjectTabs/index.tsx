import * as React from 'react'
import styles from './index.module.scss'
import ProjectTabItem from 'components/for_pages/Project/ProjectModal/ProjectTabs/Tab'
import cx from 'classnames'

interface TabOption {
  name: string,
  key: string,
  icon: string
  badge?: number
}
interface Props {
  tabs: TabOption[],
  activeTab: string,
  onChange?: (item) => void
  tabClassName?: string
}
const ProjectTabs = ({tabs, activeTab, onChange, tabClassName}: Props) => {
  const handleChange = (item: TabOption) => {
    if(onChange){
      onChange(item)
    }
  }
  return (
    <div className={cx(styles.root)}>
      {tabs.map((item, index) => <ProjectTabItem isFirst={index === 0}  isLast={tabs.length - 1 == index} name={item.name} badge={item.badge}  icon={item.icon} isActive={activeTab === item.key} onClick={() => handleChange(item)} className={tabClassName}/>)}
    </div>
  )
}

export default ProjectTabs
