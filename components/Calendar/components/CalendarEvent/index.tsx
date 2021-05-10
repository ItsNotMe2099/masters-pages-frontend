import styles from './index.module.scss'
import {EventStatus, IEvent, IRootState} from 'types'
import {format} from 'date-fns'
import {getEventBgColor, getEventBorderColor, getEventColor, getEventPlannedAllowed} from 'utils/event'
import { useSelector } from 'react-redux'
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import {useState} from 'react'
import CalendarEventToolTip from 'components/Calendar/components/CalendarEventToolTip'
import Avatar from 'components/ui/Avatar'
import AvatarSvg from 'components/svg/AvatarSvg'
interface Props {
  event: IEvent
}

export default function CalendarEvent(props: Props) {

  const {event} = props;
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);
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
  });
  const getRootClass = () => {
    const color = getEventColor(event, {
      isOtherSide: false
    });

    if(event.id === 13){
      console.log("ColorEvent", color);
    }
    switch (color){
      case 'grey':
        return styles.root__grey;
      case 'green':
        return styles.root__green;
      case 'red':
        return styles.root__red;
      case 'blue':
        return styles.root__blue;
      case 'yellow':
        return styles.root__yellow;
      case 'orange':
        return styles.root__orange;
    }
  }
  const getBorderClass = () => {
    const color = getEventColor(event, {
      isOtherSide: true,
      showUnreadAlert: true
    });
    switch (color){
      case 'grey':
        return styles.border__grey;
      case 'green':
        return styles.border__green;
      case 'red':
        return styles.border__red;
      case 'blue':
        return styles.border__blue;
      case 'orange':
        return styles.border__orange;
      case 'yellow':
        return styles.border__yellow;
    }

  }
  // @ts-ignore
  return (
    <div className={`${styles.root} ${getRootClass()}`}  ref={setTriggerRef}>
      <div className={`${styles.leftBorder} ${getBorderClass()}`}></div>
      <div className={styles.wrapper}>
        <div className={styles.time}>{format(getEventPlannedAllowed(event) ? event.start : event.actualStart, 'HH:mm')} - {format(getEventPlannedAllowed(event) ? event.end :  event.actualEnd, 'HH:mm')}</div>
        <div className={`${styles.author} ${getBorderClass()}`}>
         <div className={styles.avatar}> {event.participant.photo ? <Avatar image={event.participant.photo} size={'exExSmall'} /> : <AvatarSvg/>}</div>
          <div className={styles.authorName}>{event.participant.firstName} {event.participant.lastName}</div></div>
        <div className={styles.task}>{event.task?.title}</div>
        <div className={styles.title}>{event.title}</div>
      </div>
      {visible && (
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
CalendarEvent.defaultProps = {

}
