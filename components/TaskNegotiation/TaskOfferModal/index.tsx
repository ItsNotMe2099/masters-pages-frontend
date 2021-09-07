import { put } from "@redux-saga/core/effects";
import { modalClose } from "components/Modal/actions";
import { createSkill, fetchSkillList, resetSkillForm, updateSkill } from "components/Skill/actions";
import {
  taskNegotiationCreateTaskResponse, taskNegotiationEditConditions,
  taskNegotiationEditConditionsRequest, taskNegotiationSendOfferCreateTask
} from "components/TaskNegotiation/actions";
import TaskEditConditionsForm from "components/TaskNegotiation/TaskEditConditionsModal/TaskEditConditionsForm";
import TaskOfferNewOrder from "components/TaskNegotiation/TaskOfferModal/components/TaskOfferNewOrder";
import TaskOfferOrderList from "components/TaskNegotiation/TaskOfferModal/components/TaskOfferOrderList";
import { fetchTaskSearchList, resetTaskSearchList, setUseLocationFilter } from "components/TaskSearch/actions";
import { fetchTaskUserListRequest, resetTaskUserList } from "components/TaskUser/actions";

import Modal from "components/ui/Modal";
import Tabs from "components/ui/Tabs";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import * as React from "react";
import { IRootState, ITask, SkillData, SkillListItem } from "types";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import {useTranslation, Trans} from "i18n";
interface Props {
  isOpen: boolean,
  onClose: () => void
}
const TaskOfferModal = ({isOpen, onClose}: Props) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('tasks')
  const currentProfile = useSelector((state: IRootState) => state.taskOffer.currentProfile)
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)

  const sendOfferLoading = useSelector((state: IRootState) => state.taskOffer.sendOfferLoading)
  const taskListTotal = useSelector((state: IRootState) => state.taskUser.total)
  const taskListLoading = useSelector((state: IRootState) => state.taskUser.listLoading)
  const {t} = useTranslation('common')

  useEffect(() => {
    if(currentProfile.role === 'client') {
      dispatch(fetchTaskUserListRequest({
        status: 'published',
        page: 1,
        limit: 10
      }));
    }
    return () => {
      dispatch(resetTaskUserList());
    }
  }, [])

  const tabs = [
    { name: t('taskNegotiation.availableTasks'), key: 'tasks' },
    { name: t('taskNegotiation.privateTask'), key: 'newTask' },
  ];
  const handleChangeTab = (item) => {
    setActiveTab(item.key);
  }

  const handleSubmitNewOrder = (data) => {
    dispatch(taskNegotiationSendOfferCreateTask({...data, visibilityType: 'private', profileId: currentProfile.id}, currentProfile.id));
  }

  return (
    <Modal isOpen={isOpen} className={styles.root} loading={false} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img  src={`/img/icons/dollar.svg`}/>
        </div>
        <div className={styles.title}>{t('taskNegotiation.offerTask')}</div>
      </div>
      <div className={styles.body}>
        {!sendOfferLoading && !taskListLoading && taskListTotal > 0 && <Tabs tabs={tabs} activeTab={activeTab} onChange={handleChangeTab}/>}
      {activeTab === 'tasks' && taskListTotal > 0 && <TaskOfferOrderList onCancel={onClose}/>}
      {(activeTab === 'newTask' || taskListTotal === 0) && <TaskOfferNewOrder onCancel={onClose} initialValues={{
        priceType: 'fixed',
        masterRole: currentProfile.role === 'client' ? profile.role : currentProfile.role,
        countryCode: profile?.geoname?.country,
        geonameid: profile?.geonameid,
      }} onSubmit={handleSubmitNewOrder}/>}
      </div>

     </Modal>
  )
}

export default TaskOfferModal
