import { confirmOpen, modalClose, taskShowOffer } from "components/Modal/actions";
import { createSkill, fetchSkillList, resetSkillForm, updateSkill } from "components/Skill/actions";
import {
  taskNegotiationAcceptTaskResponse,
  taskNegotiationCreateTaskResponse,
  taskNegotiationDeclineTaskResponse
} from "components/TaskNegotiation/actions";
import TaskOfferAcceptForm from "components/TaskNegotiation/TaskOfferAcceptModal/TaskOfferAcceptForm";
import AvatarRound from "components/ui/AvatarRound";
import Button from "components/ui/Button";

import Modal from "components/ui/Modal";
import { format } from "date-fns";
import { useRouter } from "next/router";

import { useEffect } from "react";
import * as React from "react";
import { IRootState, ITask, SkillData, SkillListItem } from "types";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import {getCurrencySymbol} from 'data/currency'
import {useTranslation, Trans} from "i18n";


interface Props {
  isOpen: boolean,
  onClose: () => void
}

const TaskOfferShowModal = ({ isOpen, onClose }: Props) => {
  const loading = useSelector((state: IRootState) => state.taskOffer.taskResponseLoading)
  const task = useSelector((state: IRootState) => state.taskOffer.currentTask)
  const response = useSelector((state: IRootState) => state.taskOffer.currentTaskNegotiation)
  const dispatch = useDispatch();
  const router = useRouter();
  const {t} = useTranslation('common')

  const handleDecline = (e) => {
    dispatch(confirmOpen({
      description: `${t('takeOfferShow.decline')} ${response.profile?.firstName} ${response.profile?.lastName}?`,
      onConfirm: () => {
        dispatch(taskNegotiationDeclineTaskResponse(response.taskId, response.id))
      },
      onCancel: () => {
        dispatch(taskShowOffer());
      }
    }));
  }
  const handleAccept = (e) => {
    dispatch(confirmOpen({
      description: `${t('takeOfferShow.accept')} ${response.profile?.firstName} ${response.profile?.lastName}?`,
      onConfirm: () => {
        dispatch(taskNegotiationAcceptTaskResponse(response))
      },
      onCancel: () => {
        dispatch(taskShowOffer());
      }
    }));
  }
  const handleMessages = () => {
    router.push(`/Chat/task-dialog/${response.taskId}/${response.profileId}`);
    dispatch(modalClose());
  }

  return (
    <Modal isOpen={isOpen} className={styles.root} loading={loading} closeClassName={styles.modalClose}
           onRequestClose={onClose}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img src={`/img/icons/message.svg`}/>
        </div>
        <div className={styles.title}>{t('taskNegotiation.coverLetter')}</div>
      </div>
      <div className={styles.task}>
        <div className={styles.taskHeader}>
          <div className={styles.taskTitle}>{task?.title}</div>
        </div>
        <div className={styles.response}>
          <div className={styles.profile}>
            <AvatarRound image={response.profile.photo} name={response.profile.firstName}/>
            <div className={styles.profileName}>{response.profile.firstName} {response.profile.lastName}</div>
          </div>
          <div className={styles.message}>{response?.message}</div>
        </div>
        <div className={styles.taskPriceDetails}>
          <div className={styles.taskPriceDetailsItem}>
            <div className={styles.taskPriceDetailsItemLabel}>{response.priceType === 'fixed' ? `${t('fixedPrice')}:` : `${t('perHour')}:`}</div>
            <div className={styles.taskPriceDetailsItemValue}>$ {response.priceType === 'fixed' ? `${getCurrencySymbol(task.currency)} ${response.budget}` : `${getCurrencySymbol(task.currency)} ${response.ratePerHour}/${t('priceRateSuffix')}`}</div>
          </div>
          <div className={styles.taskPriceDetailsItem}>
            <div className={styles.taskPriceDetailsItemLabel}>`${t('deadline')}:`</div>
            <div className={styles.taskPriceDetailsItemValue}>{response.deadline ? format(new Date(response.deadline), 'MM.dd.yyy') : 'N/A'} </div>
          </div>
        </div>
        <div className={styles.buttons}>
          {!['accepted', 'decline'].includes(response.state) && <Button className={styles.button} white={true} borderGrey={true} bold={true} size={'12px 40px'} type={'button'} onClick={handleDecline}>{t('decline')}</Button>}
          {!['accepted'].includes(response.state) && <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true} size={'12px 40px'} type={'submit'} onClick={handleAccept}>{t('accept')}</Button>}
          {['accepted', 'decline'].includes(response.state)&& <Button className={`${styles.button} ${styles.buttonSubmit}`} white={true} borderGrey={true} bold={true} size={'12px 40px'} type={'submit'} onClick={onClose}>{t('cancel')}</Button>}
          {['accepted', 'decline'].includes(response.state)&& <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true} size={'12px 40px'} type={'submit'} onClick={handleMessages}>{t('messages')}</Button>}
        </div>
      </div>

    </Modal>
  )
}

export default TaskOfferShowModal
