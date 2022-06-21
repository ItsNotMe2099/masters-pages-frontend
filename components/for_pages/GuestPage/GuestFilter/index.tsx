import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import { ReactElement, useState } from 'react'
import classNames from 'classnames'
import Filter from '../FilterForm'


interface Props {
  state?: boolean
  onClick?: () => void
  filter?: 'projects' | 'companies'
  search?: () => ReactElement
}
const GuestFilter = (props: Props) => {

  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(props.state)

  const handleClick = () => {
    setIsVisible(isVisible ? false : true)
    props.onClick && props.onClick()
  }

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        {props.search && props.search()}
        <div className={classNames(styles.filtersBtn, {[styles.visible]: isVisible})} onClick={handleClick}>
          <div className={styles.icon}><img src='/img/icons/filter.svg' alt=''/></div>
          <div className={styles.text}>{t('findCompanies.filter.filters')}</div>
        </div>
      </div>
      {isVisible &&
      <div className={styles.panel}>
        <Filter filter={props.filter}/>
      </div>}
    </div>
  )
}
export default GuestFilter
