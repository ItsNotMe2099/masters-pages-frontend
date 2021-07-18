import styles from './index.module.scss'
import {IEvent} from 'types'
import {format} from 'date-fns'
import {Calendar, Views, momentLocalizer} from "react-big-calendar";
import CalendarToolbarViewButton from 'components/Calendar/components/CalendarToolbar/CalendarToolbarViewButton'
import {useTranslation, withTranslation} from "react-i18next";


interface Props {
  onChange: (view) => void,
  currentView: string
}

export default function CalendarToolbarViews(props: Props) {
  const {currentView, onChange} = props;
  const { t } = useTranslation('common');
  const options = [
    {label: t('day'), value: Views.DAY},
    {label: t('week'), value: Views.WEEK},
    {label: t('month'), value: Views.MONTH},
    {label: t('agenda'), value: Views.AGENDA},
  ]
  return (
    <div className={`${styles.root}`}>
      {options.map(item => <CalendarToolbarViewButton label={item.label} value={item.value} isActive={currentView === item.value} onClick={() => onChange(item.value)}/>)}
    </div>
  )
}
CalendarToolbarViews.defaultProps = {

}
