import styles from './index.module.scss'
import {IEvent} from 'types'
import {format} from 'date-fns'
import {Calendar, Views, momentLocalizer} from "react-big-calendar";
import CalendarToolbarViewButton from 'components/Calendar/components/CalendarToolbar/CalendarToolbarViewButton'

interface Props {
  onChange: (view) => void,
  currentView: string
}

export default function CalendarToolbarViews(props: Props) {
  const {currentView, onChange} = props;
  const options = [
    {label: 'Day', value: Views.DAY},
    {label: 'Week', value: Views.WEEK},
    {label: 'Month', value: Views.MONTH},
    {label: 'Agenda', value: Views.AGENDA},
  ]
  return (
    <div className={`${styles.root}`}>
      {options.map(item => <CalendarToolbarViewButton label={item.label} value={item.value} isActive={currentView === item.value} onClick={() => onChange(item.value)}/>)}
    </div>
  )
}
CalendarToolbarViews.defaultProps = {

}
