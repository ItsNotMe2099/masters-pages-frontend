import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import {default as React, useRef, useState} from 'react'
import {IRootState, NotificationType} from 'types'
import styles from './index.module.scss'
import cx from 'classnames'

import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import Bell from 'components/svg/Bell'
import request from 'utils/request'
import queryString from 'query-string'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useRouter} from 'next/router'
import {useAppContext} from 'context/state'

interface Props {
  color?: string
}


 const NotificationSelect = (props: Props) => {
   const { t } = useTranslation('common')
   const router = useRouter()
   const appContext = useAppContext();
   const profile = appContext.profile
   const [items, setItems] = useState([])
   const [total, setTotal] = useState(0)
   const [loading, setLoading] = useState(false)
   const [page, setPage] = useState(1)

   const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)

  const onClick = () => {
    setIsActive(!isActive)
    setPage(1)
    loadItems(1)
  }

  const handleOptionClick = (e, item) => {
    e.preventDefault()
  }
  const handleActiveOptionClick = (e) => {
    e.preventDefault()
    setIsActive(false)
  }
  const loadItems = async  (page) => {
    setLoading(true)
    const res = await request({url: `/api/notification?${queryString.stringify({page})}`, method: 'GET'})

    setItems(items => [...items, ...res.data.data])
    setTotal(res.data.total)
    setLoading(false)
  }
  const handleScrollNext = () => {
    setPage(page + 1)
    loadItems(page + 1)
  }
  const handleEventClick = (item) => {
      switch (item.type){
        case NotificationType.Messages:
          router.push(`/Chat/${item.chatId}`)
          break
        case NotificationType.TaskOffer:
          router.push('/orders/offers')
          break
        case NotificationType.TaskResponse:
          router.push('/orders/published')
          break
        case NotificationType.TaskOfferDeclined:
          router.push('/orders/published')
          break
        case NotificationType.TaskResponseDeclined:
          router.push('/orders/declined_responses')
          break
        case NotificationType.Feedback:
          router.push('/orders/closed')
          break
        case NotificationType.RegistrationCompleted:
          break
        case NotificationType.EmailVerification:
          break
        case NotificationType.EventPlanned:
          router.push(`/Calendar?eventId=${item.eventId}`)

          break
        case NotificationType.EventStatusChanged:
          router.push(`/Calendar?eventId=${item.eventId}`)
          break
        case NotificationType.EventRemind:
          router.push(`/Calendar?eventId=${item.eventId}`)
          break
        case NotificationType.News:
          router.push('/News')
          break
      }
    setIsActive(false)
   }
   const notificationCount =  profile.notificationNewsCount + profile.notificationMessageCount + profile.notificationEventCount + profile.notificationTaskResponseDeclinedCount + profile.notificationTaskOfferDeclinedCount + profile.notificationTaskResponseCount + profile.notificationTaskOfferCount

  return (
    <div className={styles.root}>
      <Bell className={styles.bell} onClick={onClick} color={props.color}/>
      {notificationCount > 0 && <div className={styles.badge}/>}
      <div ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
       <div className={styles.items} id={'notifications-dropdown'}>
        {(loading && total === 0) && <Loader/>}
        {items.length > 0 && <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={handleScrollNext}
          scrollableTarget={'notifications-dropdown'}
          hasMore={total > items.length}
         loader={ null}
        >
          {items.map(item => <div className={styles.item} onClick={() => handleEventClick(item)}><div className={styles.description} dangerouslySetInnerHTML={{ __html: item.description }}/></div>)}
        </InfiniteScroll>}
       </div>
      </div>
    </div>
  )
}
export default NotificationSelect
