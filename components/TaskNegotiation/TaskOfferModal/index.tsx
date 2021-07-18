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
import {useTranslation, Trans} from "react-i18next";
interface Props {
  isOpen: boolean,
  onClose: () => void
}
const TaskOfferModal = ({isOpen, onClose}: Props) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('tasks')
  const currentProfile = useSelector((state: IRootState) => state.taskOffer.currentProfile)

  const sendOfferLoading = useSelector((state: IRootState) => state.taskOffer.sendOfferLoading)
  const {t} = useTranslation('common')
  const tabs = [
    { name: t('taskNegotiation.availableTasks'), key: 'tasks' },
    { name: t('taskNegotiation.privateTasks'), key: 'newTask' },
  ];
  const handleChangeTab = (item) => {
    setActiveTab(item.key);
  }

  const handleSubmitNewOrder = (data) => {
    console.log('handleSubmitNewOrder', data)
    dispatch(taskNegotiationSendOfferCreateTask(data, currentProfile.id));
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
        {!sendOfferLoading && <Tabs tabs={tabs} activeTab={activeTab} onChange={handleChangeTab}/>}
      {activeTab === 'tasks' && <TaskOfferOrderList onCancel={onClose}/>}
      {activeTab === 'newTask' && <TaskOfferNewOrder onCancel={onClose} initialValues={{offerPriceType: 'fixed'}} onSubmit={handleSubmitNewOrder}/>}
      </div>

     </Modal>
  )
}

export default TaskOfferModal
