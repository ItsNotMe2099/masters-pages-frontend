import styles from './index.module.scss'
import Tab from './Tab'

interface TabOption {
  name: string,
  link?: string,
  key: string,
  badge?: number
}
interface Props {
  tabs: TabOption[],
  onChange?: (item) => void
  style?: 'fullwidth' | 'round' | 'roundSmall' | 'outline' | 'fullWidthRound' | 'reports' | 'mini'
  tabClassName?: string
  activeTab: string
}
const Tabs = ({tabs, onChange, style, tabClassName, activeTab}: Props) => {
  
  return (
    <div className={`${styles.root} ${style === 'mini' && styles.mini} ${style === 'reports' && styles.reports} ${style === 'fullwidth' && styles.fullWidth} ${style === 'fullWidthRound' && styles.fullWidth} ${(style === 'round' || style === 'roundSmall') && styles.round} ${style === 'outline' && styles.outline}`}>
      {tabs.map((item, index) => <Tab isFirst={index === 0}  isLast={tabs.length - 1 === index} name={item.name} badge={item.badge} link={item.link} isActive={activeTab === item.key} onClick={() => onChange(item)} className={tabClassName} style={style}/>)}
      <div className={styles.border}/>
    </div>
  )
}
Tabs.defaultProps = {
  style: 'fullwidth'
}
export default Tabs
