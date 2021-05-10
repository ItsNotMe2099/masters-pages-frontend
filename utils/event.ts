import {EventStatus, IEvent, ProfileData} from 'types'
import styles from 'components/Calendar/components/CalendarEvent/index.module.scss'
export const getEventBgColor = (event: IEvent, currentRole) => {
  if(event.isAuthor){
    if(event.status === EventStatus.Draft){
      return 'grey';
    }
    if([EventStatus.Planned].includes(event.status)){
      return 'blue';
    }
    if([EventStatus.Declined].includes(event.status)){
      return 'blue';
    }
    if([EventStatus.Confirmed].includes(event.status)){
      if(currentRole === 'client'){
        return 'blue';
      }else{
        return 'blue';
      }
    }
    if([EventStatus.Completed].includes(event.status)){
      return 'green';
    }
    if([EventStatus.Approved].includes(event.status)){
      return 'green';
    }
    if([EventStatus.Rejected].includes(event.status)){
      return 'green';
    }
    if([EventStatus.Deleted].includes(event.status)){
      return 'red';
    }
  }else{

    if(event.status === EventStatus.Draft){
      return 'grey';
    }
    if([EventStatus.Planned].includes(event.status)){
      return 'yellow';
    }
    if([EventStatus.Declined].includes(event.status)){
      return 'red';
    }
    if([EventStatus.Confirmed].includes(event.status)){
      if(currentRole === 'client'){
        return 'blue';
      }else{
        return 'blue';
      }
    }
    if([EventStatus.Completed].includes(event.status)){
      return 'orange';
    }
    if([EventStatus.Approved].includes(event.status)){
      return 'green';
    }
    if([EventStatus.Rejected].includes(event.status)){
      return 'red';
    }
    if([EventStatus.Deleted].includes(event.status)){
      return 'red';
    }
  }

}

export const getEventBorderColor = (event: IEvent, currentRole) => {

  if(event.isAuthor){
    if(event.status === EventStatus.Draft){
      return 'grey';
    }
    if([EventStatus.Planned].includes(event.status)){
      return 'yellow';
    }
    if([EventStatus.Declined].includes(event.status)){
      return 'red';
    }
    if([EventStatus.Confirmed].includes(event.status)){
      if(currentRole === 'client'){
        return 'blue';
      }else{
        return 'blue';
      }

    }
    if([EventStatus.Completed].includes(event.status) && (event.unreadMediaMessagesCount > 0 || event.unreadTextMessagesCount > 0)){
      return 'red';
    }
    if([EventStatus.Completed].includes(event.status)){
      return 'orange';
    }

    if([EventStatus.Approved].includes(event.status)){
      return 'green';
    }
    if([EventStatus.Rejected].includes(event.status)){
      return 'red';
    }
    if([EventStatus.Deleted].includes(event.status)){
      return 'red';
    }
  }else{

    if(event.status === EventStatus.Draft){
      return 'grey';
    }
    if([EventStatus.Planned].includes(event.status)){
      return 'green';
    }
    if([EventStatus.Declined].includes(event.status)){
      return 'green';
    }
    if([EventStatus.Confirmed].includes(event.status)){
      if(currentRole === 'client'){
        return 'blue';
      }else{
        return 'blue';
      }
    }
    if([EventStatus.Completed].includes(event.status)){
      return 'green';
    }
    if([EventStatus.Approved].includes(event.status)){
      return 'green';
    }
    if([EventStatus.Rejected].includes(event.status)){
      return 'red';
    }
    if([EventStatus.Deleted].includes(event.status)){
      return 'red';
    }
  }
}



interface EventColorOptions{
  isOtherSide: boolean
  showUnreadAlert?: boolean
}
export const getEventColor = (event: IEvent, {
  isOtherSide,
  showUnreadAlert = false
}: EventColorOptions) => {
  const showAuthor = !isOtherSide && event.isAuthor || isOtherSide && !event.isAuthor;
  if(showAuthor){
    if(event.status === EventStatus.Draft){
      return 'grey';
    }
    if([EventStatus.Planned].includes(event.status)){
      return 'blue';
    }
    if([EventStatus.Declined].includes(event.status)){
      return 'blue';
    }
    if([EventStatus.Confirmed].includes(event.status)){
      return 'blue';
    }
    if(isOtherSide && [EventStatus.Completed].includes(event.status) && (event.unreadMediaMessagesCount > 0 || event.unreadTextMessagesCount > 0)){
      return 'red';
    }
    if([EventStatus.Completed].includes(event.status)){
      return 'green';
    }
    if([EventStatus.Approved].includes(event.status)){
      return 'green';
    }
    if([EventStatus.Rejected].includes(event.status)){
      return 'green';
    }
    if([EventStatus.Deleted].includes(event.status)){
      return 'red';
    }
  }else{

    if(event.status === EventStatus.Draft){
      return 'grey';
    }
    if([EventStatus.Planned].includes(event.status)){
      return 'yellow';
    }
    if([EventStatus.Declined].includes(event.status)){
      return 'red';
    }
    if([EventStatus.Confirmed].includes(event.status)){
      return 'blue';
    }
    if([EventStatus.Completed].includes(event.status)){
      return 'orange';
    }
    if([EventStatus.Approved].includes(event.status)){
      return 'green';
    }
    if([EventStatus.Rejected].includes(event.status)){
      return 'red';
    }
    if([EventStatus.Deleted].includes(event.status)){
      return 'red';
    }
  }
}

export const getEventStatusName =  (event: IEvent, {
  isOtherSide,
  showUnreadAlert = false
}: EventColorOptions) => {
  const showAuthor = !isOtherSide && event.isAuthor || isOtherSide && !event.isAuthor;
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
      return 'Pending';
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
      return 'Deleted';
    }
  }
}
export const getEventPlannedAllowed = (event) => {
  return [EventStatus.Planned, EventStatus.Confirmed, EventStatus.Declined, EventStatus.Draft].includes(event?.status);
}
export const getEventCompletedAllowed = (event) => {
  return [EventStatus.Confirmed, EventStatus.Completed].includes(event?.status);
}
