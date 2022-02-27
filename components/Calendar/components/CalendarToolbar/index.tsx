import styles from './index.module.scss'
import CalendarToolbarViews from 'components/Calendar/components/CalendarToolbar/CalendarToolbarViews'
import CalendarToolbarNav from 'components/Calendar/components/CalendarToolbar/CalendarToolbarNav'
import CalendarToolbarSearch from 'components/Calendar/components/CalendarToolbar/CalendarToolbarSearch'
import Bell from 'components/svg/Bell'

interface Props {
  onChangeView: (view) => void,
  currentView: string,
  onNavigate: (action) => void
  label: string
}

export default function CalendarToolbar(props: Props) {
  const {currentView, onChangeView, onNavigate, label} = props
  const handleBellClick = () => {

  }
  return (
    <div className={`${styles.root}`}>
      <CalendarToolbarNav onNavigate={onNavigate}/>

      <div className={styles.center}>
        <div className={styles.label}>{label}</div>
        <div className={styles.views}>
        <CalendarToolbarViews onChange={onChangeView} currentView={currentView}/>
        </div>
        <div className={styles.centerSpacer}/>
      </div>
      <div className={styles.right}>
        <Bell className={styles.bell} onClick={handleBellClick} />
        <CalendarToolbarSearch/></div>
    </div>
  )
}
CalendarToolbar.defaultProps = {}
