import styles from './index.module.scss'
import {IEvent} from 'types'
import {format} from 'date-fns'
import AvatarSvg from 'components/svg/AvatarSvg'

interface Props {
  event: IEvent
}

export default function CalendarEventMonth(props: Props) {
  const {event} = props;
  const getRootClass = () => {
    return styles.root__green;
  }
  const getBorderClass = () => {
    return styles.border__green;
  }
  return (
    <div className={`${styles.root} ${getRootClass()}`}>
      <div className={`${styles.leftBorder} ${getBorderClass()}`}>
        <AvatarSvg/>
      </div>
        <div className={`${styles.author}`}>Jane cooper</div>

    </div>
  )
}
CalendarEventMonth.defaultProps = {

}
