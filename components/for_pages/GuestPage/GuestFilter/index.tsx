import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import InputSearch from 'components/ui/Inputs/InputSearch'
import { useState } from 'react'
import classNames from 'classnames'
import Filter from '../FilterForm'


interface Props {

}
const GuestFilter = (props: Props) => {

  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <InputSearch/>
        <div className={classNames(styles.filtersBtn, {[styles.visible]: isVisible})} onClick={() => setIsVisible(isVisible ? false : true)}>
          <div className={styles.icon}><img src='/img/icons/filter.svg' alt=''/></div>
          <div className={styles.text}>Filters</div>
        </div>
      </div>
      {isVisible &&
      <div className={styles.panel}>
        <Filter/>
      </div>}
    </div>
  )
}
export default GuestFilter
