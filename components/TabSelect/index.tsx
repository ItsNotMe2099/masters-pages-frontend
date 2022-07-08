import { useRef } from 'react'
import { useDetectOutsideClick } from './useDetectOutsideClick'
import styles from './index.module.scss'
import cx from 'classnames'
import Tab from 'components/ui/Tabs/Tab'
import * as React from 'react'

interface TabOption {
  name?: string,
  label?: string,
  link?: string,
  key: string,
  icon?: string
}

interface Props {
  tabs: TabOption[],
  activeTab: string,
  onChange?: (item) => void
  reports?: boolean
  style?: 'projectModal'
}

export const TabSelect = ({tabs, activeTab, onChange, reports, style}: Props) => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const handleClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive)
  }

const rootClass = {
  [styles.projectModal]: style === 'projectModal'
}

  return (
    <div className={styles.root}>
      <a href="#" onClick={handleClick} className={cx(styles.dropDownTrigger, rootClass)}>
        {tabs.map(item => activeTab === item.key && <div className={styles.withIcon}>{item.icon && <img className={styles.icon} src={`/img/Project/menu/${item.icon}.svg`}/>} <span>{item.name}{item.label}</span></div>)}
      <img src="/img/field/arrowDown.svg" alt=""/>
      </a>
       <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
       <div className={styles.option} onClick={() => setIsActive(false)}>{tabs.map((item, index) => <Tab isFirst={index === 0}  isLast={tabs.length - 1 == index} name={item.name} label={item.label} link={item.link} isActive={activeTab === item.key} onClick={onChange ? () => onChange(reports ? item.key : item) : null}/>)}</div>
       </nav>
    </div>
  )
}
