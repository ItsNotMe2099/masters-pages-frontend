import {projectOpen} from 'components/Modal/actions'
import {useRouter} from 'next/router'
import * as React from 'react'
import {useEffect, useMemo, useState} from 'react'
import {IRootState} from 'types'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import Layout from 'components/layout/Layout'
import {getAuthServerSide} from 'utils/auth'
import Modals from 'components/layout/Modals'
import {ProfileRole} from 'data/intefaces/IProfile'
import ProjectModal from 'components/for_pages/Project/ProjectModal'
import {useAppContext} from 'context/state'
import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import {IProjectCounts} from 'data/intefaces/IProjectCounts'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import {IOrganization} from 'data/intefaces/IOrganization'
import ProjectList from "components/for_pages/Project/ProjectList";
import ApplicationList from "components/for_pages/Project/ApplicationList";

interface Props {
}

const ProjectsPage = (props: Props) => {
  const {t} = useTranslation('common')
  const router = useRouter()
  const dispatch = useDispatch()
  const appContext = useAppContext()
  const currentProfile = appContext.profile

  const role = appContext.role
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null)
  useEffect(() => {
    if (router.query.projectId) {
      if (currentProfile.role === ProfileRole.Corporate) {
        setCurrentProjectId(parseInt(router.query.projectId as string, 10))
        dispatch(projectOpen())
      } else {
        setCurrentProjectId(parseInt(router.query.projectId as string, 10))
      }
    }
  }, [router.query.projectId])

  const [initialProjectTab, setInitialProjectTab] = useState<string | null>(null)


  const [isEdit, setIsEdit] = useState(false)

  const handleModalOpen = (project: IProject, type: 'create' | 'view' | 'edit' | 'application') => {
    console.log("handleModalOpen", type)
    switch (type) {
      case "create":
        setInitialProjectTab(null)
        setCurrentProjectId(null)
        setIsEdit(false)
        break;
      case "view":
        setInitialProjectTab(null)
        setCurrentProjectId(project.id)
        setIsEdit(false)
        break;
      case "edit":
        setInitialProjectTab(null)
        setCurrentProjectId(project.id);
        dispatch(projectOpen())
        setIsEdit(true)
        break;
      case "application":
        setInitialProjectTab('application')
        setCurrentProjectId(project.id);
        break;
    }
    dispatch(projectOpen())
  }

  return (
    <Layout>
      {currentProfile.role === 'corporate' ? <ProjectList onModalOpen={handleModalOpen}/> :
        <ApplicationList onModalOpen={handleModalOpen}/>}
      {modalKey === 'projectModal' &&
        <ProjectModal isEdit={isEdit} projectId={currentProjectId}
                      initialTab={initialProjectTab} showType={role === ProfileRole.Corporate ? 'client' : 'public'}
                      isOpen={true}/>}

      <Modals/>
    </Layout>
  )
}
export default ProjectsPage
export const getServerSideProps = getAuthServerSide({redirect: true})
