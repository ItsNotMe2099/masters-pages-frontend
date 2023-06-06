import TaskActionButton from 'components/Task/components/ActionButton'
import {default as React, useEffect, useState} from 'react'
import {ITask, ITaskNegotiation, ITaskNegotiationState, ITaskNegotiationType, ITaskStatus} from 'types'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {useTaskContext} from "context/task_state";
import Button from "components/ui/Button";


enum TaskAction {
  //ReadMore = 'readMore',
  Edit = 'edit',
  Delete = 'delete',
  Publish = 'publish',
  UnPublish = 'unPublish',

  Cancel = 'cancel',

  MarkAsCompleted = 'markAsCompleted',
  Share = 'share',
  Save = 'save',
  FeedbackToClient = 'feedbackToClient',

  HireMaster = 'hireMaster',
  AcceptOffer = 'acceptOffer',
  DeclineOffer = 'declineOffer',

  AcceptResponse = 'AcceptResponse',
  DeclineResponse = 'DeclineResponse',
  DeleteResponse = 'deleteResponse',

  AcceptConditions = 'AcceptConditions',
  DeclineConditions = 'DeclineConditions',
  DeleteConditions = 'DeleteConditions',


  DeleteNegotiation = 'DeleteNegotiation',
  CounterOffer = 'CounterOffer',
  EditConditions = 'editConditions',
  ReportViolation = 'reportViolation',
  CancelRequest = 'cancelRequest',
  CompletedAccepted = 'CompletedAccepted',
  CompletedDeclined = 'CompletedDeclined',
  Recommend = 'Recommend'
}

interface Props {
  type: 'client' | 'master' | 'public'
}

const TaskActions = (props: Props) => {
  const type = props.type;
  const taskContext = useTaskContext();
  const task = taskContext.task
  const negotiation = taskContext.negotiation
  const actions = []
  const { t } = useTranslation('common')
  if (type === 'public') {
    actions.push('share')
    actions.push('save')

  } else {
    if(task.status === ITaskStatus.Draft){
      actions.push(TaskAction.Publish)
      actions.push(TaskAction.Delete)
    }else if(task.status === ITaskStatus.Published && !negotiation){
      actions.push(TaskAction.UnPublish)
      actions.push(TaskAction.Delete)
    }else if(negotiation?.type === ITaskNegotiationType.TaskOffer && negotiation?.state === ITaskNegotiationState.SentToClient){
      switch (type){
        case "master":
          actions.push(TaskAction.EditConditions)
          actions.push(TaskAction.Delete)
          break;
        case "client":
          actions.push(TaskAction.AcceptOffer)
          actions.push(TaskAction.DeclineOffer)
          break;
      }
    }else if(negotiation?.type === ITaskNegotiationType.TaskOffer && negotiation?.state === ITaskNegotiationState.SentToMaster){
      switch (type){
        case "master":
          actions.push(TaskAction.AcceptOffer)
          actions.push(TaskAction.DeclineOffer)
          break;
        case "client":
          actions.push(TaskAction.EditConditions)
          actions.push(TaskAction.Delete)
          break;
      }
    }else if(negotiation?.type === ITaskNegotiationType.TaskOffer && negotiation?.state === ITaskNegotiationState.Accepted){
      switch (type){
        case "master":
          actions.push(TaskAction.EditConditions)
          actions.push(TaskAction.Delete)
          break;
        case "client":
          actions.push(TaskAction.CounterOffer)
          actions.push(TaskAction.HireMaster)
          actions.push(TaskAction.DeclineOffer)
          break;
      }
    }else if(negotiation?.type === ITaskNegotiationType.TaskNegotiation && negotiation?.state === ITaskNegotiationState.SentToMaster){
      switch (type){
        case "master":
          actions.push(TaskAction.AcceptConditions)
          actions.push(TaskAction.DeclineConditions)
          actions.push(TaskAction.CounterOffer)

          break;
        case "client":
          actions.push(TaskAction.DeclineConditions)
          break;
      }
    }else if(negotiation?.type === ITaskNegotiationType.MasterAssigned && [ ITaskNegotiationState.SentToMaster,  ITaskNegotiationState.SentToClient].includes( negotiation?.state)){
      switch (type){
        case "master":
          actions.push(TaskAction.MarkAsCompleted)
          actions.push(TaskAction.Cancel)
          actions.push(TaskAction.ReportViolation)
          break;
        case "client":
          actions.push(TaskAction.MarkAsCompleted)
          actions.push(TaskAction.Cancel)
          actions.push(TaskAction.ReportViolation)
          break;
      }
    }else if(negotiation?.type === ITaskNegotiationType.MarkAsDone && negotiation?.state === ITaskNegotiationState.SentToClient){
      switch (type){
        case "master":
          actions.push(TaskAction.CancelRequest)
          actions.push(TaskAction.ReportViolation)
          break;
        case "client":
          actions.push(TaskAction.CompletedAccepted)
          actions.push(TaskAction.CompletedDeclined)
          break;
      }
    }else if(negotiation?.type === ITaskNegotiationType.MarkAsDone && negotiation?.state === ITaskNegotiationState.SentToMaster){
      switch (type){
        case "master":
          actions.push(TaskAction.CompletedAccepted)
          actions.push(TaskAction.CompletedDeclined)
          break;
        case "client":

          actions.push(TaskAction.CancelRequest)
          actions.push(TaskAction.ReportViolation)
          break;
      }
    }else if(negotiation?.type === ITaskNegotiationType.MarkAsDone && negotiation?.state === ITaskNegotiationState.Accepted){
      switch (type){
        case "master":
          if(!task.feedbacks.find(f => f.target === 'client')){
            actions.push(TaskAction.FeedbackToClient)
          }
          actions.push(TaskAction.Recommend)
          actions.push(TaskAction.Delete)
          break;
        case "client":
          actions.push(TaskAction.Recommend)
          actions.push(TaskAction.Delete)
          break;
      }
    }else if(negotiation?.type === ITaskNegotiationType.ResponseToTask && negotiation?.state === ITaskNegotiationState.SentToClient){
      switch (type){
        case "master":
          actions.push(TaskAction.EditConditions)
          actions.push(TaskAction.DeleteResponse)
          break;
        case "client":
          actions.push(TaskAction.AcceptResponse)
          actions.push(TaskAction.DeclineResponse)
          break;
      }
    }else if(negotiation?.type === ITaskNegotiationType.ResponseToTask && negotiation?.state === ITaskNegotiationState.Accepted){
      switch (type){
        case "master":
          actions.push(TaskAction.CounterOffer)
          actions.push(TaskAction.CancelRequest)
          break;
        case "client":
          actions.push(TaskAction.HireMaster)
          actions.push(TaskAction.DeclineResponse)
          break;
      }
    }else if( negotiation?.type === ITaskNegotiationType.ResponseToTask && negotiation?.state === ITaskNegotiationState.SentToClient){
      switch (type){
        case "master":
          actions.push(TaskAction.AcceptResponse)
          actions.push(TaskAction.DeclineResponse)
          break;
        case "client":
          break;
      }
    }else if(negotiation?.type === ITaskNegotiationType.TaskNegotiation && negotiation?.state === ITaskNegotiationState.SentToClient) {
      switch (type) {
        case "master":
          actions.push(TaskAction.AcceptConditions)
          actions.push(TaskAction.DeclineConditions)
          actions.push(TaskAction.CounterOffer)
          break;
        case "client":
          actions.push(TaskAction.EditConditions)
          actions.push(TaskAction.AcceptConditions)
          actions.push(TaskAction.DeclineConditions)
          actions.push(TaskAction.HireMaster)
          break;
      }
    }

    }


  const renderActionButton = (action: TaskAction) => {

    /*
     acceptTaskResponse,
    declineTaskResponse,
    acceptTaskOffer,
    declineTaskOffer,
    acceptConditions,
    declineConditions,
    editConditions
     */
    switch (action) {
      case TaskAction.Publish:
        return <Button className={styles.btn} bold smallFont transparent size='16px 0' onClick={() => taskContext.publishTask()}>Publish</Button>

      case TaskAction.UnPublish:
        return <Button className={styles.btn} bold smallFont transparent size='16px 0' onClick={() => taskContext.unPublishTask()}>Unpublish</Button>
      case TaskAction.Delete:
        return <Button className={styles.btn} bold smallFont transparent size='16px 0' onClick={taskContext.deleteTask}>Delete</Button>
      case TaskAction.HireMaster:
        return <Button className={styles.btn} bold smallFont transparent size='16px 0' onClick={() => taskContext.hireMaster()}>Hire Master</Button>

      case TaskAction.AcceptOffer:
        return <Button className={styles.btn} bold smallFont transparent size='16px 0' onClick={taskContext.acceptTaskOffer}>Accept offer</Button>
      case TaskAction.DeclineOffer:
        return <Button className={styles.btn} bold smallFont transparent size='16px 0' onClick={taskContext.declineTaskOffer}>Decline offer</Button>
      case TaskAction.AcceptResponse:
        return <Button className={styles.btn} bold smallFont transparent size='16px 0'onClick={taskContext.acceptTaskResponse}>Accept response</Button>
      case TaskAction.DeclineResponse:
        return <Button className={styles.btn} bold smallFont transparent size='16px 0' onClick={taskContext.declineTaskResponse}>Decline response</Button>
      case TaskAction.AcceptConditions:
        return <Button className={styles.btn} bold smallFont transparent size='16px 0' onClick={taskContext.acceptConditions}>Accept conditions</Button>
      case TaskAction.DeclineConditions:
        return <Button className={styles.btn} bold smallFont transparent size='16px 0' onClick={taskContext.declineConditions}>Decline conditions</Button>
      case TaskAction.CounterOffer:
        return <Button className={styles.btn} bold smallFont transparent size='16px 0' onClick={taskContext.editConditionsOpen}>Counter offer</Button>
      case TaskAction.EditConditions:
        return <Button className={styles.btn} bold smallFont transparent size='16px 0' onClick={taskContext.editConditionsOpen}>Edit conditions</Button>
      case TaskAction.MarkAsCompleted:
        return <Button className={styles.btn} bold smallFont transparent size='16px 0' onClick={taskContext.markAsDoneOpen}>Mark as done</Button>
      case TaskAction.CompletedAccepted:
        return <Button className={styles.btn} bold smallFont transparent size='16px 0'onClick={taskContext.acceptTaskCompletedOpen}>Accept Completed</Button>
      case TaskAction.CompletedDeclined:
        return <Button className={styles.btn} bold smallFont transparent size='16px 0' onClick={taskContext.declineTaskCompleted}>Decline Completed</Button>
    }
  }



  return (
    <div
      className={styles.root}>
      {actions.map(i => renderActionButton(i))}
      </div>
  )
}


export default TaskActions
