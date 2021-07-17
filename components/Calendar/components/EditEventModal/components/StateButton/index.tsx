import {useRouter} from "next/router";
import * as React from "react";
import styles from './index.module.scss'
import {EventStatus, IEvent, IRootState} from 'types'
import MarkIcon from 'components/svg/MarkIcon'

import {useSelector} from 'react-redux'
import {getEventBgColor, getEventBorderColor, getEventColor} from 'utils/event'

interface Props {
  event: IEvent,
  type: 'client' | 'master'

}
const StateButton = ({event, type}: Props) => {
  const currentProfile = useSelector((state: IRootState) => state.profile.currentProfile);
  const isOtherSide =  (currentProfile.role !== type)
  const showAuthor = type === currentProfile.role && event.isAuthor || type !== currentProfile.role && !event.isAuthor;
  const isOverdue = event.isOverdue && currentProfile.role !== 'client' && type === 'master'
  const router = useRouter();
  const handleClick = (e) => {

  }


  const isMarkVisible = () => {
    const color = getEventColor(event, {
      isOtherSide: type !== currentProfile.role,
      isOverdue
    });
    return ['green', 'blue'].includes(color);
  }
  const getClass = () => {
    const color = getEventColor(event, {
      isOtherSide: type !== currentProfile.role,
      isOverdue
    });
    console.log("getColorEventState", showAuthor,currentProfile.role, type, event.isAuthor,color)
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
        return styles.root__orange;
      case 'orange':
        return styles.root__orange;
    }


  }
  const getTypeName = () => {
    switch (type){
      case 'client':
        return 'Client'
      case 'master':
        return 'Master';
    }
  }
  const getStatusName = () => {
      if(!showAuthor){
        if(event.status === EventStatus.Draft){
          return 'Draft';
        }
        if([EventStatus.Planned].includes(event.status)){
          return 'Pending';
        }
        if([EventStatus.Declined].includes(event.status)){
          return 'Declined';
        }
        if([EventStatus.Confirmed].includes(event.status)){
           return 'Planned';
        }
        if(isOverdue){
          return 'Overdue'
        }

        if([EventStatus.Completed].includes(event.status)){
          return 'Pending';
        }

        if([EventStatus.Approved].includes(event.status)){
          return 'Finished';
        }
        if([EventStatus.Rejected].includes(event.status)){
          return 'Rejected';
        }
        if([EventStatus.Deleted].includes(event.status)){
          return 'Deleted';
        }
      }else{

        if(event.status === EventStatus.Draft){
          return 'Draft';
        }
        if([EventStatus.Planned].includes(event.status)){
          return 'Planned';
        }
        if([EventStatus.Declined].includes(event.status)){
          return 'Planned';
        }
        if([EventStatus.Confirmed].includes(event.status)){
            return 'Planned';
        }
        if(isOverdue){
          return 'Overdue'
        }
        if([EventStatus.Completed].includes(event.status)){
          return 'Completed';
        }
        if([EventStatus.Approved].includes(event.status)){
          return 'Finished';
        }
        if([EventStatus.Rejected].includes(event.status)){
          return 'Rejected';
        }
        if([EventStatus.Deleted].includes(event.status)){
          return 'Pending';
        }
      }
  }
  return (
    <div className={`${styles.root} ${getClass()}`}>
      <div className={styles.type}>{getTypeName()}</div>
      {isMarkVisible() && <MarkIcon className={styles.icon} color={'#ffffff'}/>}
      <div className={styles.status}>{getStatusName()}</div>
    </div>
  )
}


export default StateButton
