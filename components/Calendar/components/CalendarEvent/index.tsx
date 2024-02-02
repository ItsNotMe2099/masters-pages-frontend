import styles from './index.module.scss'
import { IEvent } from 'types'
import { format } from 'date-fns'
import { getEventColor } from 'utils/event'
import { usePopperTooltip } from 'react-popper-tooltip'
import 'react-popper-tooltip/dist/styles.css'
import { useState } from 'react'
import CalendarEventToolTip from 'components/Calendar/components/CalendarEventToolTip'
import Avatar from 'components/ui/Avatar'
import AvatarSvg from 'components/svg/AvatarSvg'
interface Props {
  event: IEvent,
  className?: string,
  onClick?: () => void
  showDate?: boolean
}

export default function CalendarEvent(props: Props) {

  const { event } = props
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
  const getRootClass = () => {
    const color = getEventColor(event, {
      isOtherSide: false
    })

    switch (color) {
      case 'grey':
        return styles.root__grey
      case 'green':
        return styles.root__green
      case 'red':
        return styles.root__red
      case 'blue':
        return styles.root__blue
      case 'yellow':
        return styles.root__yellow
      case 'orange':
        return styles.root__orange
    }
  }
  const getBorderClass = () => {
    const color = getEventColor(event, {
      isOtherSide: true,
      showUnreadAlert: true
    })
    switch (color) {
      case 'grey':
        return styles.border__grey
      case 'green':
        return styles.border__green
      case 'red':
        return styles.border__red
      case 'blue':
        return styles.border__blue
      case 'orange':
        return styles.border__orange
      case 'yellow':
        return styles.border__yellow
    }

  }
  const unreadCount = parseInt(event.unreadTextMessagesCount, 10) + parseInt(event.unreadMediaMessagesCount, 10)

  const otherSide = event.isAuthor ? event.participant : event.author
  // @ts-ignore
  return (
    <div className={`${styles.root} ${getRootClass()} ${props.className}`} onClick={props.onClick} ref={setTriggerRef}>
      <div className={`${styles.leftBorder} ${getBorderClass()}`}></div>
      <div className={styles.wrapper}>
        <div className={styles.time}>{format(/*getEventPlannedAllowed(event) ?*/ new Date(event.start) /*: event.actualStart*/, 'HH:mm')} - {format(/*getEventPlannedAllowed(event) ?*/ new Date(event.end) /*:  event.actualEnd*/, 'HH:mm')}</div>
        <div className={`${styles.author} ${getBorderClass()}`}>
          <div className={styles.avatar}>
            {unreadCount > 0 && <div className={styles.notification}>{unreadCount > 10 ? '!' : unreadCount}</div>}
            {unreadCount === 0 && <>  {otherSide.photo ? <Avatar image={otherSide.photo} size={'exExSmall'} /> : <AvatarSvg />}</>}

          </div>
          <div className={styles.authorName}>{otherSide.firstName} {otherSide.lastName}</div></div>
        {event.task && <div className={styles.task}>{event.task?.title}</div>}
        <div className={styles.title}>{event.title}</div>
      </div>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container' }) as any}
        >
          <CalendarEventToolTip event={event} />
          <div {...getArrowProps({ className: 'tooltip-arrow' }) as any} />
        </div>
      )}
    </div>
  )
}
CalendarEvent.defaultProps = {

}
