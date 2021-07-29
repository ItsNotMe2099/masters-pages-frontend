
import ChatMessage from "components/Chat/ChatMessage";
import { taskNegotiationSendOffer } from "components/TaskNegotiation/actions";
import {
  fetchTaskUserList,
  fetchTaskUserListRequest,
  resetTaskUserList,
  setPageTaskUser
} from "components/TaskUser/actions";
import Button from "components/ui/Button";
import Radio from "components/ui/Inputs/RadioList/Radio";
import Loader from "components/ui/Loader";

import Modal from "components/ui/Modal";
import { useEffect, useState } from "react";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IRootState, ITask, SkillData, SkillListItem } from "types";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import {getCurrencySymbol} from 'data/currency'
import {useTranslation, Trans} from "i18n";
interface Props {
  onCancel: () => void
}
const TaskOfferOrderList = (props: Props) => {
  const dispatch = useDispatch();
  const [activeTask, setActiveTask] = useState(null);
  const total = useSelector((state: IRootState) => state.taskUser.total)
  const page = useSelector((state: IRootState) => state.taskUser.page)
  const list = useSelector((state: IRootState) => state.taskUser.list)
  const loading = useSelector((state: IRootState) => state.taskUser.listLoading)
  const sendOfferLoading = useSelector((state: IRootState) => state.taskOffer.sendOfferLoading)
  const currentProfile = useSelector((state: IRootState) => state.taskOffer.currentProfile)
  const {t} = useTranslation('common')

  const handleSubmit = (data) => {
    if(!activeTask){
      return;
    }
    dispatch(taskNegotiationSendOffer(activeTask.id, currentProfile.id));

  }
  const handleScrollNext = () => {
    dispatch(setPageTaskUser(page + 1))
    dispatch(fetchTaskUserListRequest({
      filter: {
        status: 'published'
      },
      page: page + 1,
      limit: 10
    }));
  }
  const handleChange = (item) => {
    setActiveTask(item);
  }

  return (
    <div className={styles.root}>
     {((loading && total === 0) || sendOfferLoading) && <Loader/>}
      {total > 0 && !sendOfferLoading && <div className={styles.orders} id={'task-offer-orders'}>
       <InfiniteScroll
       dataLength={list.length} //This is important field to render the next data
       next={handleScrollNext}
       scrollableTarget={"task-offer-orders"}
       hasMore={total > list.length}
       loader={<Loader/>}>
       {list.map(item => <Radio className={styles.radioItem} value={item} isActive={activeTask && activeTask.id === item.id}  onChange={handleChange}>
         <div className={styles.radioItemTitle}>{item.title}</div>
         <div className={styles.radioItemPrice}>{item.priceType === 'fixed' ? (item.budget ? `${getCurrencySymbol(item.currency)}  ${item.budget}` : `free`) : `${getCurrencySymbol(item.currency)} ${item.ratePerHour}/h`}</div>
       </Radio>)}
     </InfiniteScroll>
     </div>}
      {!sendOfferLoading && <div className={styles.buttons}>
        <Button className={styles.button} white={true} borderGrey={true} bold={true} size={'12px 20px'} type={'button'} onClick={props.onCancel}>{t('cancel')}</Button>
        <Button className={`${styles.button} ${styles.buttonSubmit}`} disabled={!activeTask} red={true} bold={true} size={'12px 20px'} type={'submit'} onClick={handleSubmit}>{t('taskNegotiation.sendOffer')}</Button>
      </div>}
    </div>
  )
}

export default TaskOfferOrderList
