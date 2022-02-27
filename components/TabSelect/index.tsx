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
  key: string
}

interface Props {
  tabs: TabOption[],
  activeTab: string,
  onChange?: (item) => void
  reports?: boolean
}

export const TabSelect = ({tabs, activeTab, onChange, reports}: Props) => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const handleClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive)
  }

  return (
    <div className={styles.root}>
      <a href="#" onClick={handleClick} className={cx(styles.dropDownTrigger)}>
        {tabs.map(item => activeTab === item.key && <span>{item.name}{item.label}</span>)}
      <img src="/img/field/arrowDown.svg" alt=""/>
      </a>
       <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
       <div className={styles.option} onClick={() => setIsActive(false)}>{tabs.map((item, index) => <Tab isFirst={index === 0}  isLast={tabs.length - 1 == index} name={item.name} label={item.label} link={item.link} isActive={activeTab === item.key} onClick={onChange ? () => onChange(reports ? item.key : item) : null}/>)}</div>
       </nav>
    </div>
  )
}
