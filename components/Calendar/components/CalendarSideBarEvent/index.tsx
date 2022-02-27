import styles from './index.module.scss'
import {IEvent, IRootState} from 'types'
import {format} from 'date-fns'
import { getEventColor} from 'utils/event'
import { useSelector } from 'react-redux'
import {useState} from 'react'
import {usePopperTooltip} from 'react-popper-tooltip'
import CalendarEventToolTip from 'components/Calendar/components/CalendarEventToolTip'
interface Props {
  event: IEvent,
  onClick: (event) => void
}

export default function CalendarSideBarEvent(props: Props) {
  const currentProfile = useSelector((state: IRootState) => state.profile.currentProfile)

  const {event, onClick} = props
  const [isToolTipVisible, setIsToolTipVisible] = useState(false)
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    trigger: 'hover',
    offset: [10, 10],
    closeOnOutsideClick: false,
    visible: isToolTipVisible,
    onVisibleChange: setIsToolTipVisible,
  })

  const getCircleClass = (color) => {
    switch (color){
      case 'grey':
        return styles.circleSide__grey
      case 'green':
        return styles.circleSide__green
      case 'blue':
        return styles.circleSide__blue
      case 'red':
        return styles.circleSide__red
      case 'orange':
        return styles.circleSide__orange
      case 'yellow':
        return styles.circleSide__yellow
    }
  }

  // @ts-ignore
  return (
    <div className={`${styles.root}`} ref={setTriggerRef} onClick={onClick ? () => onClick(event) : null}>
      <div className={`${styles.circle}`}>
        <div className={`${styles.circleSide} ${styles.circleLeft} ${getCircleClass(getEventColor(event, {isOtherSide: currentProfile.role !== 'client'}))}`}/>
        <div className={`${styles.circleSide} ${styles.circleRight} ${getCircleClass(getEventColor(event, {isOtherSide: currentProfile.role === 'client'}))}`}/>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.time}>{format(event.actualStart, 'HH:mm')} - {format(event.actualEnd, 'HH:mm')}</div>
        <div className={styles.title}>{event.title}</div>
      </div>
      {visible  && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container' }) as any}
        >
          <CalendarEventToolTip event={event}/>
          <div {...getArrowProps({ className: 'tooltip-arrow' }) as any} />
        </div>
      )}
    </div>
  )
}
CalendarSideBarEvent.defaultProps = {

}
