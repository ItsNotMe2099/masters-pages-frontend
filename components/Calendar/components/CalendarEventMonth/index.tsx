import styles from './index.module.scss'
import {IEvent, IRootState} from 'types'
import AvatarSvg from 'components/svg/AvatarSvg'
import { getEventColor} from 'utils/event'
import { useSelector } from 'react-redux'
import Avatar from 'components/ui/Avatar'
import {useRef, useState} from 'react'
import {usePopperTooltip} from 'react-popper-tooltip'
import CalendarEventToolTip from 'components/Calendar/components/CalendarEventToolTip'
import {findDOMNode} from 'react-dom'
interface Props {
  event: IEvent
}

export default function CalendarEventMonth(props: Props) {
  const currentProfile = useSelector((state: IRootState) => state.profile.currentProfile)
  const ref = useRef(null)
  const {event} = props
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
    onVisibleChange: (visible) => {
      setIsToolTipVisible(visible)
      if(ref && ref.current) {
        const el = findDOMNode(ref.current)?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode
        if(el){
          if(visible){
            el.style.zIndex = 50
          }else{
            el.style.zIndex = 4
          }
        }
      }
    },
  })
  const getRootClass = () => {
    const color = getEventColor(event, {
      isOtherSide: false
    })
    switch (color){
      case 'grey':
        return styles.root__grey
      case 'green':
        return styles.root__green
      case 'red':
        return styles.root__red
      case 'blue':
        return styles.root__blue
      case 'orange':
        return styles.root__orange
      case 'yellow':
        return styles.root__yellow
    }
  }
  const getBorderClass = () => {
    const color = getEventColor(event, {
      isOtherSide: true,
      showUnreadAlert: true
    })
    switch (color){
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
    <div className={`${styles.root} ${getRootClass()}`} ref={setTriggerRef}>
      <div className={`${styles.leftBorder} ${getBorderClass()}`} ref={ref}>
        {unreadCount > 0 && <div className={styles.notification}>{unreadCount > 10 ? '!' : unreadCount}</div>}
        {unreadCount === 0  && <>  {otherSide.photo ? <Avatar image={otherSide.photo} size={'exExSmall'} /> : <AvatarSvg/>}</>}
       </div>
        <div className={`${styles.author}`}>
          <div className={styles.authorName}>{otherSide.firstName} {otherSide.lastName}</div></div>
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
CalendarEventMonth.defaultProps = {

}
