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
import {
  confirmChangeData,
  confirmModalClose,
  confirmOpen,
  modalClose,
  projectVolunteerFeedBackOpen,
  skillModalOpen
} from "components/Modal/actions";
import {useTranslation} from "next-i18next";
import {useDispatch} from "react-redux";
import OrganizationRepository from "data/repositories/OrganizationRepository";
import {IAutoMessages} from "data/intefaces/IAutoMessages";
import AutoMessagesRepository from "data/repositories/AutoMessagesRepository";

interface IState {
  project: IProject | null,
  projectId?: number | null
  organization: IOrganization | null
  autoMessages: IAutoMessages | null
  loading?: boolean
  editLoading?: boolean
  autoMessageLoading: boolean
  modal: ModalType | null
  modalArguments: any
  fetch: () => void
  changeStatus: (status: ProjectStatus) => Promise<boolean>,
  update: (data: DeepPartial<IProject>) => void,
  create: (data: DeepPartial<IProject>) => void,
  saveToFavorite: () => void,
  delete: () => void,
  fetchAutoMessages: () => void
  showModal: (type: ModalType, args?: any) => void
  hideModal: () => void
}

const loginState$ = new Subject<boolean>()

const defaultValue: IState = {
  organization: null,
  project: null,
  projectId: null,
  autoMessages: null,
  loading: false,
  editLoading: false,
  autoMessageLoading: false,
  modal: null,
  modalArguments: null,
  fetch: () => null,
  changeStatus: (status: ProjectStatus) => null,
  update: (data: DeepPartial<IProject>) => null,
  create: (data: DeepPartial<IProject>) => null,
  saveToFavorite: () => null,
  delete: () =>null,
  fetchAutoMessages: () => null,
  showModal: (type, args) => null,
  hideModal: () => null,
}

const ProjectContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  projectId: number
  project?: IProject
  organization?: IOrganization
  mode: 'public' | 'private'
}

export function ProjectWrapper(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  const [organization, setOrganization] = useState<IOrganization>(props.organization)
  const [project, setProject] = useState<IProject | null>(props.project)
  const [projectId, setProjectId] = useState<number | null>(props.projectId)
  const [autoMessages, setAutoMessages] = useState<IAutoMessages | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [autoMessageLoading, setAutoMessageLoading] = useState<boolean>(true)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const [modal, setModal] = useState<ModalType | null>(null)
  const [modalArguments, setModalArguments] = useState<any>(null)

  const dispatch = useDispatch()
  useEffect(() => {
    console.log("FetchOrg", project?.corporateProfile)
    if(!props.projectId){
      OrganizationRepository.fetchCurrentOrganization().then(data => setOrganization(data))

    }else if(project?.corporateProfile?.organization) {
      OrganizationRepository.fetchOrganization(project?.corporateProfile?.organization.id).then(i => setOrganization(i))
    }
  }, [project?.corporateProfile?.organization, props.projectId])
  useEffect(() => {
    if (props.organization) {
      setOrganization(props.organization)
    }
  }, [props.organization])
  useEffect(() => {
    if (props.project) {
      setProject(props.project)
      setLoading(false)
    }
  }, [props.project])
  useEffect(() => {
    if (!props.project && props.projectId) {
      fetch()
    }
  }, [props.projectId, props.project])

  const fetchAutoMessages = async () => {
    setAutoMessageLoading(true);
    const res = await AutoMessagesRepository.getProjectAutoMessagesByProjectId(projectId);
    setAutoMessages(res);
    setAutoMessageLoading(false);

  }
  const fetch = async (_projectId?: number) => {
    const res = props.mode === 'public' ? await ProjectRepository.findPublicById(_projectId ?? projectId) : await ProjectRepository.findById(_projectId ?? projectId)
    if (res) {
      setProject(res)
    }
    setLoading(false)
    return res;
  }
  const handleUpdate = (data: DeepPartial<IProject>) => {
    setProject(b => ({...b, ...data as IProject}))
    appContext.projectUpdateState$.next({...project, ...data as IProject})
  }
  const create = async (data: DeepPartial<IProject>) => {
    setEditLoading(true)
    try {
      const project = await ProjectRepository.create(data)
      setProjectId(project.id)
      const res = await fetch(project.id)
      appContext.projectCreateState$.next(res)
    }catch (e) {

    }
    setEditLoading(false)

  }
  const update = async (data: DeepPartial<IProject>) => {
    try {
      setEditLoading(true)
      const res = await ProjectRepository.update(props.projectId, data)
      handleUpdate( {...res, ...data})
      appContext.hideModal()
    } catch (err) {
        appContext.showSnackbar(err.message, SnackbarType.error)


    }
    setEditLoading(false)
  }
  const handleDelete = () => {
    dispatch(confirmOpen({
      description: `${t('task.confirmDelete')} «${project.title}»?`,
      onConfirm: async () => {
        dispatch(confirmModalClose())
        await ProjectRepository.delete(project.id)
      }
    }))
  }

  const statusConfirmText = (newStatus: ProjectStatus) => {
    switch(newStatus){
      case ProjectStatus.Published:
        return `${t('task.confirmPublish')}`
      case ProjectStatus.Draft:
        return `${t('task.confirmPublish')}`
      case ProjectStatus.Paused:
        return 'Project will be put on hold. No actions will be possible until project is resumed. Do you want to proceed?'
      case ProjectStatus.Execution:
        return 'Project will be moved to “execution” mode. Do you want to proceed?'
      case ProjectStatus.Canceled:
        return 'Project will be moved to "cancelled" folder. Do you want to proceed?'
      case ProjectStatus.Completed:
        return 'Project will be closed for “execution”. Do you want to proceed?'
    }
  }
  const handleChangeStatus = async (status: ProjectStatus): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      dispatch(confirmOpen({
        description: statusConfirmText(status),
        onConfirm: async () => {
          dispatch(confirmChangeData({loading: true}))
          await ProjectRepository.update(props.projectId, {status});
          setProject(i => ({...i, status}));
          appContext.projectUpdateState$.next({...project, status})
          dispatch(confirmModalClose())
          resolve(true)
        },
        onCancel: () => {
          dispatch(confirmModalClose())
          resolve(false)
        }
      }))
    })

  }
  const saveToFavorite = async () => {
   await ProfileRepository.addToSavedProjects({projectId: project.id})
  }
  const  showModal = (type: ModalType, args?: any) => {
    console.log("ShowModal", type)
    setModalArguments(args)
    setModal(type)
  };
  const  hideModal = () => {
    setModal(null)
  };
  const value: IState = {
    ...defaultValue,
    project,
    projectId,
    organization,
    modal,
    modalArguments,
    fetch,
    autoMessageLoading,
    autoMessages,
    fetchAutoMessages,
    loading,
    editLoading,
    update,
    create,
    delete: handleDelete,
    changeStatus: handleChangeStatus,
    saveToFavorite,
    showModal,
    hideModal,
  }

  return (
    <ProjectContext.Provider value={value}>
      {props.children}
    </ProjectContext.Provider>
  )
}

export function useProjectContext() {
  return useContext(ProjectContext)
}
