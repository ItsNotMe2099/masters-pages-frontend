import {createContext, useContext, useEffect, useState} from 'react'
import {CookiesType, ModalType, SnackbarType} from 'types/enums'
import ReactModal from 'react-modal'
import {SnackbarData} from 'types/types'
import Cookies from 'js-cookie'
import {Subject} from 'rxjs'
import {IProfile, ProfileRole} from 'data/intefaces/IProfile'
import {IUser} from 'data/intefaces/IUser'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import UserRepository from 'data/repositories/UserRepostory'
import { useRouter } from 'next/router'
import {IProject, ProjectStatus} from "data/intefaces/IProject";
import {DeepPartial} from "redux";
import ProjectRepository from "data/repositories/ProjectRepository";
import {useAppContext} from "context/state";
import {IOrganization} from "data/intefaces/IOrganization";
import {confirmChangeData, confirmModalClose, confirmOpen, modalClose} from "components/Modal/actions";
import {useTranslation} from "next-i18next";
import {useDispatch} from "react-redux";
import OrganizationRepository from "data/repositories/OrganizationRepository";
import {IAutoMessages} from "data/intefaces/IAutoMessages";
import {ApplicationStatus, IApplication} from "data/intefaces/IApplication";
import ApplicationRepository from "data/repositories/ApplicationRepository";

interface IState {
  application: IApplication | null,
  update: (data: DeepPartial<IApplication>) => void,
  create: (data: DeepPartial<IApplication>) => void,
  changeStatus: (status: ApplicationStatus, isCancel?: boolean) => void
  delete: () => void
  loading: boolean
}

const defaultValue: IState = {
  application: null,
  update: (data: DeepPartial<IApplication>) => null,
  create: (data: DeepPartial<IApplication>) => null,
  changeStatus: (status: ApplicationStatus, isCancel?: boolean) => null,
  delete: () => null,
  loading: false
}

const ApplicationContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  projectId?: number
  applicationId?: number
  application?: IApplication
 // mode: 'public' | 'private'
}

export function ApplicationWrapper(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  const [application, setApplication] = useState<IApplication | null>(props.application)
  const [applicationId, setApplicationId] = useState<number | null>(props.applicationId)
  const [loading, setLoading] = useState<boolean>(true)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (props.application) {
      setApplication(props.application)
      setLoading(false)
    }
  }, [props.application])
  useEffect(() => {
    console.log("FetchData111", props.projectId, props.applicationId)
    if (!props.application && (props.applicationId || props.projectId)) {
      fetch()
    }
  }, [props.applicationId, props.application, props.projectId])
  const handleUpdate = (data: DeepPartial<IApplication>) => {
    setApplication(b => ({...b, ...data as IApplication}))
    appContext.applicationUpdateState$.next({...application, ...data as IApplication})
  }

  const fetch = async (_applicationId?: number) => {
    let app;
    if(_applicationId) {
      app = await ApplicationRepository.findById(_applicationId);
    }else if(applicationId){
      app = await ApplicationRepository.findById(applicationId);
    }else if(props.projectId){
      app = await ApplicationRepository.fetchOneByProject(props.projectId);
    }
    console.log("FetchApp", app)
    setApplicationId(app?.id)
    setApplication(app);
    setLoading(false)
    return app;
  }

  const create = async (data: DeepPartial<IApplication>) => {
    const application = await ApplicationRepository.create({...data, projectId: props.projectId})
    setApplicationId(application.id)
    const res = await  fetch(application.id)
    try {
      await ProfileRepository.deleteFromSavedProjects({profileId: appContext.profile?.id}, props.projectId)
    }catch (e) {

    }
    appContext.applicationCreateState$.next(res)

  }
  const update = async (data: DeepPartial<IApplication>) => {
    try {
      setEditLoading(true)
      const res = await ApplicationRepository.update(applicationId, data)
      handleUpdate( {...res, ...data})
      appContext.hideModal()
    } catch (err) {
      appContext.showSnackbar(err.message, SnackbarType.error)


    }
    setEditLoading(false)
  }
  const statusConfirmText = (newStatus: ApplicationStatus, isCancel?: boolean) => {
    switch(newStatus){

      case ApplicationStatus.Completed:
        if(appContext.profile.role === 'volunteer'){
          return 'Your involvement will be marked as “completed” and will be ended. Do you want to proceed?'
        }
        else{
          return 'Volunteer involvement will be marked as “completed” and will be ended. Do you want to proceed?'
        }
      case ApplicationStatus.CompleteRequest:
        if(appContext.profile.role === 'volunteer'){
          return 'Your involvement will be marked as “completed” and will be ended. Do you want to proceed?'
        }
        else{
          return 'Volunteer involvement will be marked as “completed” and will be ended. Do you want to proceed?'
        }
      case ApplicationStatus.Invited:
        return 'Invitation to join the project will be sent to the applicant. Do you want to proceed?'
      case ApplicationStatus.Shortlist:
        if(isCancel){
          return 'Invitation to join the project will be withdrawn. Do you want to proceed?'
        }
        else{
          return 'The application will be “shortlisted”. Do you want to proceed?'
        }
      case ApplicationStatus.Execution:
        return 'Accept invitation?'
      case ApplicationStatus.RejectedByCompany:
        return 'Volunteer involvement will be cancelled. Do you want to proceed?'
      case ApplicationStatus.RejectedByVolunteer:
        return 'Your participation in the project will be ended. Do you want to proceed?'
    }
  }

  const handleChangeStatus = (status: ApplicationStatus, isCancel?: boolean) => {
    dispatch(confirmOpen({
      description: statusConfirmText(status, isCancel),
      onConfirm: async () => {
        dispatch(confirmChangeData({loading: true}))
        await ApplicationRepository.update(applicationId, {status});
        setApplication(i => ({...i, status}));
        appContext.applicationUpdateState$.next({...application, status})
        dispatch(confirmModalClose())
      }
    }))
  }
  const handleDelete = () => {
    dispatch(confirmOpen({
      description: 'Do you want to proceed?',
      onConfirm: async () => {
        dispatch(confirmChangeData({loading: true}))
        await ApplicationRepository.delete(application.id)
        console.log("Deleted111")
        appContext.applicationDeleteState$.next(application)
        dispatch(confirmModalClose())
      }
    }))
  }
  const value: IState = {
    ...defaultValue,
    application,
    create,
    update,
    loading,
    changeStatus: handleChangeStatus,
    delete: handleDelete,


  }

  return (
    <ApplicationContext.Provider value={value}>
      {props.children}
    </ApplicationContext.Provider>
  )
}

export function useApplicationContext() {
  return useContext(ApplicationContext)
}
