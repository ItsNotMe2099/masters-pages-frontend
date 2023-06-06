import {createContext, useContext, useEffect, useState} from 'react'
import Router, { useRouter } from 'next/router'
import {IProject, ProjectStatus} from "data/intefaces/IProject";
import {DeepPartial, IPagination} from 'types/types'
import ProjectRepository from "data/repositories/ProjectRepository";
import {useAppContext} from "context/state";
import {IOrganization} from "data/intefaces/IOrganization";
import {
  confirmChangeData,
  confirmModalClose,
  confirmOpen, finishTaskAsClientOpen,
  modalClose, taskEditConditionsOpen,
  taskHireMasterOpen, taskMarkAsDoneOpen, taskOfferAcceptOpen, taskSuccessOpen
} from "components/Modal/actions";
import {useTranslation} from "next-i18next";
import {useDispatch} from "react-redux";
import OrganizationRepository from "data/repositories/OrganizationRepository";
import {IAutoMessages} from "data/intefaces/IAutoMessages";
import {ApplicationStatus, IApplication} from "data/intefaces/IApplication";
import ApplicationRepository from "data/repositories/ApplicationRepository";
import {IRootState, ITask, ITaskFormData, ITaskNegotiation, ITaskNegotiationType, ITaskStatus} from "types";
import TaskNegotiationRepository from "data/repositories/TaskNegotiationRepository";
import {
  taskNegotiationAcceptAsCompleted,
  taskNegotiationAcceptConditions,
  taskNegotiationAcceptConditionsRequest,
  taskNegotiationAcceptTaskOffer,
  taskNegotiationAcceptTaskOfferRequest,
  taskNegotiationAcceptTaskResponse,
  taskNegotiationAcceptTaskResponseRequest,
  taskNegotiationCreateTaskResponse,
  taskNegotiationDeclineConditions,
  taskNegotiationDeclineTaskOffer,
  taskNegotiationDeclineTaskResponse,
  taskNegotiationFinishFailed,
  taskNegotiationFinishSuccess,
  taskNegotiationMarkAsDoneRequest, taskNegotiationSetCurrentMessage,
  taskNegotiationSetCurrentNegotiation,
  taskNegotiationSetCurrentTask
} from "components/TaskNegotiation/actions";
import {put, select, take} from "redux-saga/effects";
import ActionTypes from "components/TaskNegotiation/const";
import ApiActionTypes from "constants/api";
import {fetchChat, fetchOneChatMessage} from "components/Chat/actions";
import {deleteTaskUser, fetchTaskResponseRequest, setPublishedTaskUser} from "components/TaskUser/actions";
import {createFeedBackMasterRequest} from "components/ProfileFeedback/actions";
import TaskRepository from "data/repositories/TaskRepository";
import {IProfile} from "data/intefaces/IProfile";
import {current} from "immer";
import ProfileRepository from "data/repositories/ProfileRepostory";

interface IState {
  negotiation: ITaskNegotiation | null,
  task: ITask | null,
  actionLoading: boolean
  acceptTaskResponse: () => void,
  declineTaskResponse: () => void,
  acceptTaskOffer: () => void,
  declineTaskOffer: () => void,
  acceptConditions: () => void,
  declineConditions: () => void,
  editConditionsOpen: () => void,
  editConditions: (data: any) => void,
  markAsDoneOpen: () => void,//Вызывается мастером или клиентеом
  markAsDone: (data?: any) => void, //Вызывается мастером или клиентеом
  acceptTaskCompletedOpen: () => void,
  acceptTaskCompleted: (data?: any) => void,
  declineTaskCompleted: () => void,
  updateTask: (data: DeepPartial<ITask>) => void
  hireMaster: () => void
  hireMasterRequest: () => void
  publishTask: () => void
  unPublishTask: () => void
  deleteTask: () => void
  createTaskResponseByMasterOpen: () => void
  createTaskResponseByMaster: (data: any) => void
  deleteSavedTask: () => void
  opponentProfile: IProfile | null

}

const defaultValue: IState = {
  negotiation: null,
  task: null,
  actionLoading: false,
  acceptTaskResponse: () => null,
  declineTaskResponse: () => null,
  acceptTaskOffer: () => null,
  declineTaskOffer: () => null,
  acceptConditions: () => null,
  declineConditions: () => null,
  editConditionsOpen: () => null,
  editConditions: () => null,
  markAsDoneOpen: () => null,
  markAsDone: () => null,
  acceptTaskCompletedOpen: () => null,
  acceptTaskCompleted: () => null,
  declineTaskCompleted: () => null,
  updateTask: (data: ITaskFormData) => null,
  hireMaster: () => null,
  hireMasterRequest: () => null,
  publishTask: () => null,
  unPublishTask: () => null,
  deleteTask: () => null,
  createTaskResponseByMasterOpen: () => null,
  createTaskResponseByMaster: (data: any) => null,
  deleteSavedTask: () => null,
  opponentProfile: null
}

const TaskContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  negotiation: ITaskNegotiation
  task: ITask
}

export function TaskWrapper(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  const router = useRouter()
  const [negotiation, setNegotiation] = useState<ITaskNegotiation | null>(props.negotiation)
  const [task, setTask] = useState<ITask | null>(props.task)
  const [loading, setLoading] = useState<boolean>(false)
  const [actionLoading, setActionLoading] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {

    return () => {

    }
  }, [negotiation])
  useEffect(() => {
    if (props.negotiation) {
      setNegotiation(props.negotiation)
      setLoading(false)
    }
  }, [props.negotiation])
  useEffect(() => {
    if (props.task) {
      setTask(props.task)
      setLoading(false)
    }
  }, [props.task])

  const handleUpdateNegotiation = (newNegotiation: ITaskNegotiation) => {
    setNegotiation(n => ({...n, ...negotiation}))
    appContext.negotiationUpdateState$.next({before: negotiation, after: newNegotiation})
  }
  const handleUpdateNegotiationTask = (newNegotiation: ITaskNegotiation) => {
    setNegotiation(n => ({...n, ...negotiation}))
    appContext.negotiationUpdateState$.next({before: negotiation, after: newNegotiation})
  }
  const handleUpdateTask = (newTask: ITask) => {
    setTask(n => ({...n, ...negotiation}))
    appContext.taskUpdateState$.next({before: task, after: newTask})
  }

  const declineTaskOffer = async () => {
    dispatch(confirmOpen({
      description: t('task.confirmDecline'),
      onConfirm: () => {
        declineTaskOfferRequest()
      }
    }))

  }
  const acceptTaskOffer = async () => {
    dispatch(confirmOpen({
      description: t('chat.acceptOffer'),
      onConfirm: () => {
        acceptTaskOfferRequest()
      }
    }))
  }

  const declineTaskResponse = async () => {
    dispatch(confirmOpen({
      description: `${t('taskResponse.confirmDecline')} ${negotiation.profile?.firstName} ${negotiation.profile?.lastName}?`,
      onConfirm: () => {
        declineTaskResponseRequest();
      }
    }))
  }
  const acceptTaskResponse = async () => {
    dispatch(confirmOpen({
      description: `${t('taskResponse.confirmAccept')} ${negotiation.profile?.firstName} ${negotiation.profile?.lastName}?`,
      onConfirm: () => {
        acceptTaskResponseRequest()
      }
    }))
  }

  const editConditions = (data: any) => {

    editConditionRequest(data);
  }
  const editConditionsOpen = () => {
    dispatch(taskNegotiationSetCurrentTask(task))
    dispatch(taskNegotiationSetCurrentNegotiation(negotiation))
    dispatch(taskEditConditionsOpen())
  }
  const acceptConditions = () => {

    dispatch(confirmOpen({
      description: t('chat.acceptConditions'),
      onConfirm: () => {
        acceptConditionsRequest();
      }
    }))
  }

  const declineConditions = () => {
    dispatch(confirmOpen({
      description: t('chat.rejectConditions'),
      onConfirm: () => {
        declineConditionsRequest();
      }
    }))
  }

  const declineTaskResponseRequest = async () => {
    dispatch(confirmChangeData({ loading: true }))
    handleUpdateNegotiation(await TaskNegotiationRepository.declineTaskResponse(negotiation.id))
    dispatch(confirmChangeData({ loading: false }))
    dispatch(modalClose())

    router.push(`/Chat/task-dialog/${negotiation.taskId}/${negotiation.profileId}`)

  }
  const acceptTaskResponseRequest = async () => {
    dispatch(confirmChangeData({ loading: true }))

    handleUpdateNegotiation(await TaskNegotiationRepository.acceptTaskResponse(negotiation.id))

    dispatch(confirmChangeData({ loading: false }))
    dispatch(modalClose())

    router.push(`/Chat/task-dialog/${negotiation.taskId}/${negotiation.profileId}`)

  }

  const editConditionRequest = async (data: any) => {
    await TaskNegotiationRepository.editConditions(negotiation.id, data)
  }

  const acceptConditionsRequest = async () => {
    dispatch(confirmChangeData({ loading: true }))
    handleUpdateNegotiation(await TaskNegotiationRepository.acceptConditions(negotiation.id))
    dispatch(confirmChangeData({ loading: false }))
    dispatch(confirmModalClose())
    dispatch(modalClose());
  }

  const declineConditionsRequest = async () => {
    dispatch(confirmChangeData({ loading: true }))
    handleUpdateNegotiation(await TaskNegotiationRepository.declineConditions(negotiation.id))
    dispatch(confirmChangeData({ loading: false }))
    dispatch(confirmModalClose())
    dispatch(modalClose());
  }

  const acceptTaskOfferRequest = async () => {
    dispatch(confirmChangeData({ loading: true }))
    handleUpdateNegotiation(await TaskNegotiationRepository.acceptTaskOffer(negotiation.id))

    dispatch(confirmChangeData({ loading: false }))
    dispatch(confirmModalClose())
    if(appContext.profile.role === 'client'){
      router.push(`/Chat/task-dialog/${negotiation.taskId}/${negotiation.authorId}`)

    }else{
      router.push(`/Chat/task-dialog/${negotiation.taskId}/${negotiation.profileId}`)
    }
  }
  const declineTaskOfferRequest = async ()  => {
    dispatch(confirmChangeData({ loading: true }))
    handleUpdateNegotiation(await TaskNegotiationRepository.declineTaskOffer(negotiation.id))

    dispatch(confirmChangeData({ loading: false }))
    dispatch(confirmModalClose())
  }




  const markAsDone = async (data: any = null) => {

    if(appContext.profile.role === 'client'){

      await acceptTaskCompletedRequest();
    }else{
      await markAsDoneRequest()
    }
    return;
    dispatch(confirmOpen({
      description: `Are you sure that you want mark as done task «${task.title}»?`,
      onConfirm: async () => {
        dispatch(confirmChangeData({ loading: true }))
        if(appContext.profile.role === 'client'){

          await acceptTaskCompletedRequest();
        }else{
          await markAsDoneRequest()
        }
        dispatch(confirmChangeData({ loading: false }))
        dispatch(confirmModalClose())

      }
    }))


  }

  const markAsDoneOpen = async () => {
    dispatch(taskNegotiationSetCurrentTask(task))
    dispatch(taskNegotiationSetCurrentNegotiation(negotiation))

    if(appContext.profile.role === 'client'){
      dispatch(finishTaskAsClientOpen())
    }else{
      dispatch(taskMarkAsDoneOpen())
    }
  }

  const acceptTaskCompletedOpen = async () => {

    if(appContext.profile.role === 'client'){
      dispatch(confirmOpen({
        description: `Are you sure that you want accept as completed task «${task.title}»?`,
        onConfirm: async () => {
          dispatch(confirmChangeData({ loading: true }))
          await acceptMarkAsDoneRequest()
          dispatch(confirmChangeData({ loading: false }))
          dispatch(confirmModalClose())

        }
      }))

    }else{
      dispatch(confirmOpen({
        description: `Are you sure that you want accept as completed task «${task.title}»?`,
        onConfirm: async () => {
          dispatch(confirmChangeData({ loading: true }))
          await acceptAcceptAsCompletedRequest();
          dispatch(confirmChangeData({ loading: false }))
          dispatch(confirmModalClose())

        }
      }))
    }

  }
  const declineTaskCompleted = async () => {
    dispatch(confirmOpen({
      description: `${t('taskResponse.confirmDecline')} ${negotiation.profile?.firstName} ${negotiation.profile?.lastName}?`,
      onConfirm: async () => {
        dispatch(confirmChangeData({ loading: true }))
        await declineTaskCompletedRequest()
        dispatch(confirmChangeData({ loading: false }))
        dispatch(confirmModalClose())

      }
    }))

  }
  const markAsDoneRequest = async ()=> {
    handleUpdateTask({...task, lastNegotiation: await TaskNegotiationRepository.markAsDone(task.id)})
  }
  const acceptMarkAsDoneRequest = async () => {
    handleUpdateNegotiation(await TaskNegotiationRepository.acceptMarkAsDone(negotiation.id))
  }
  const acceptAcceptAsCompletedRequest = async () => {
    handleUpdateNegotiation(await TaskNegotiationRepository.acceptAcceptAsCompleted(negotiation.id))
  }
  const acceptTaskCompletedRequest = async () => {
    handleUpdateTask({...task, lastNegotiation: await TaskNegotiationRepository.acceptAsCompleted(task.id)})
  }
  const declineTaskCompletedRequest = async () => {
    handleUpdateNegotiation(await TaskNegotiationRepository.declineAcceptAsCompleted(negotiation.id))

  }

  const hireMasterRequest = async () => {
    await TaskNegotiationRepository.acceptConditions(negotiation.id);
    await TaskNegotiationRepository.hireMaster({taskId: task.id, profileId: negotiation.profileId})
    const newTask = await TaskRepository.fetchOneTaskUserRequest(task.id);
    handleUpdateTask(newTask);
    dispatch(modalClose());
  }
  const editRequest = () => {

  }

  const cancelRequest = () => {

  }

  const updateTask = async (data: DeepPartial<ITask>) => {
   const newTask = await TaskRepository.update(task.id, data);
    handleUpdateTask(newTask);
    return newTask;
  }

  const publishTask = () => {
    dispatch(confirmOpen({
      description: `${t('task.confirmPublish')} «${task.title}»?`,
      onConfirm: async () => {
        dispatch(confirmChangeData({ loading: true }))
        await updateTask({status: ITaskStatus.Published})
        dispatch(confirmChangeData({ loading: false }))
        dispatch(confirmModalClose())

      }
    }))
  }

  const unPublishTask = () => {
    dispatch(confirmOpen({
      description: `${t('task.confirmUnPublish')} «${task.title}»?`,
      onConfirm: async () => {
        dispatch(confirmChangeData({ loading: true }))
        await updateTask({status: ITaskStatus.Draft})
        dispatch(confirmChangeData({ loading: false }))
        dispatch(confirmModalClose())
      }
    }))
  }
  const hireMaster = () => {
    dispatch(taskNegotiationSetCurrentTask(task))
    dispatch(taskNegotiationSetCurrentNegotiation(negotiation))
    dispatch(taskHireMasterOpen())
  }
  const deleteTask = async () => {
    dispatch(confirmOpen({
      description: `${t('task.confirmDelete')} «${task.title}»?`,
      onConfirm: async () => {
        dispatch(confirmChangeData({ loading: true }))
        await  TaskRepository.delete(task.id);
        appContext.taskDeleteState$.next(task)
        dispatch(confirmChangeData({ loading: false }))
        dispatch(confirmModalClose())
      }
    }))
  }
  const createTaskResponseByMasterOpen = () => {
    dispatch(taskNegotiationSetCurrentTask(task))
    dispatch(taskOfferAcceptOpen())
  }
  const createTaskResponseByMaster = async (data: any) => {
    await TaskNegotiationRepository.createTaskResponseByMaster({...data, taskId: task.id})
    await deleteSavedTask();
  }
  const deleteSavedTask = async () => {
    await ProfileRepository.deleteSavedTask(task.id);
    appContext.taskDeleteState$.next(task)

  }

  const value: IState = {
    ...defaultValue,
    task,
    negotiation,
    actionLoading,
    editConditionsOpen,
    acceptTaskResponse,
    declineTaskResponse,
    acceptTaskOffer,
    declineTaskOffer,
    acceptConditions,
    declineConditions,
    editConditions,
    markAsDoneOpen,
    markAsDone,
    updateTask,
    hireMaster,
    hireMasterRequest,
    publishTask,
    unPublishTask,
    declineTaskCompleted,
    acceptTaskCompletedOpen,
    deleteTask,
    createTaskResponseByMaster,
    createTaskResponseByMasterOpen,
    deleteSavedTask,
    opponentProfile: negotiation?.profileId !== appContext.profile.id ? negotiation?.profile : negotiation?.author

  }

  return (
    <TaskContext.Provider value={value}>
      {props.children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  return useContext(TaskContext)
}
