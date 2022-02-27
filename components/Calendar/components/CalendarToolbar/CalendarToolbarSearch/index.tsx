import styles from './index.module.scss'
import Search from 'components/svg/Search'

interface Props {
  onSearch?: (value) => void
}

export default function CalendarToolbarSearch(props: Props) {
  const { onSearch} = props

  return (
    <div className={styles.root}>
      <Search className={styles.icon}/>
      <input className={styles.input} onChange={onSearch}/>
    </div>
  )
}
CalendarToolbarSearch.defaultProps = {

}
