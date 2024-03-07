import styles from './index.module.scss'
import Search from 'components/svg/Search'
import classNames from 'classnames'
import NewCloseSvg from 'components/svg/NewCloseSvg'

interface Props {
  onSearch?: (value) => void
  className?: string
  isClose?: boolean
  onClose?: () => void
}

export default function CalendarToolbarSearch(props: Props) {
  const { onSearch } = props

  return (
    <div className={classNames(styles.root, props.className)}>
      <Search className={styles.icon} />
      <input className={styles.input} onChange={onSearch} />
      {props.isClose && <NewCloseSvg className={styles.close} onClick={props.onClose} />}
    </div>
  )
}
CalendarToolbarSearch.defaultProps = {

}
