import * as React from 'react'
import {useEffect, useState} from 'react'
import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import classNames from 'classnames'
import {IOrganization} from 'data/intefaces/IOrganization'
import Layout from "components/layout/Layout";
import ProjectTabs from "components/for_pages/Project/ProjectModal/ProjectTabs";
import {TabSelect} from "components/TabSelect";
import TabProjectDescription from "components/for_pages/Project/ProjectModal/Tabs/ProjectDescriptionTab";
import TabApplication from "components/for_pages/Project/ProjectModal/Tabs/TabApplication";
import TabVolunteers from "components/for_pages/Project/ProjectModal/Tabs/TabVolunteers";
import TabChat from "components/for_pages/Project/ProjectModal/Tabs/TabChat";
import ProjectAutorepliesTab from "components/for_pages/Project/ProjectModal/Tabs/ProjectAutoRepliesTab";
import TabReports from "components/for_pages/Project/ProjectModal/Tabs/TabReports";
import {IAutoMessages} from "data/intefaces/IAutoMessages";
import ProjectRepository from "data/repositories/ProjectRepository";
import OrganizationRepository from "data/repositories/OrganizationRepository";
import {ProfileRole} from "data/intefaces/IProfile";
import {signUpOpen} from "components/Modal/actions";
import {useDispatch} from "react-redux";
import Modals from "components/layout/Modals";
import { useRouter } from 'next/router'
import {ProjectWrapper} from "context/project_state";

interface Props {
  projectId: number
  initialProject?: IProject
  fullWidth?: boolean
}

const ProjectPublicPage = (props: Props) => {
  const dispatch = useDispatch()
  const [tab, setTab] = useState('description');
  const [project, setProject] = useState<IProject>(props.initialProject);
  const [organization, setOrganization] = useState<IOrganization | null>(null);
  const appContext = useAppContext()
  const profile = appContext.profile
  const autoMessagesObject = {
    projectId: props.projectId,
    applicationStatusChangeMessages: [],
    projectStatusChangeMessages: [],
    eventMessages: []
  }
  const [autoMessages, setAutomessages] = useState<IAutoMessages | null>(null)
  console.log("ProjectInModal", project)
  useEffect(() => {
    ProjectRepository.findPublicById(props.projectId).then(i => setProject(i))


  }, [props.projectId])
  useEffect(() => {
    console.log("FetchOrg", project?.corporateProfile)
    if (project?.corporateProfile?.organization) {
      OrganizationRepository.fetchOrganization(project?.corporateProfile?.organization.id).then(i => setOrganization(i))
    }
  }, [project?.corporateProfile?.organization])
  const tabs = [
    {name: 'Description', key: 'description', icon: !profile ? 'description_black' : 'description'},
  ...(!profile || profile.role === ProfileRole.Volunteer ? [{name: 'Application', key: 'application', icon: !profile ? 'application_black' : 'application'}] : []),
  ...(props.fullWidth && [{name: 'Back', key: 'back', icon: !profile ? 'back_black' : 'back'}])
  ];
  const handleSaveProject = async (data: IProject) => {
    await ProjectRepository.findById(data.id).then(i => setProject(i))
  }

  const handlePreviewProject = (data) => {
    setProject(i => ({...i, ...data}))
  }


  const roleCurrent = appContext.role

  const router = useRouter()

  const getModeClass = () => {
    switch (roleCurrent) {
      case ProfileRole.Master:
        return styles.modeMaster
      case ProfileRole.Volunteer:
        return styles.modeVolunteer
      case ProfileRole.Corporate:
        return styles.modeCorporate
      case ProfileRole.Client:
        return styles.modeClient
      default:
        return styles.modeCorporate
    }
  }
  const {t} = useTranslation('common')
  const getRoleClass = () => {
    switch (profile?.role) {
      case 'master':
        return styles.roleMaster
      case 'volunteer':
        return styles.roleVolunteer
      case 'client':
      default:
        return styles.roleClient
    }
  }
  const handleChangeTab = (item) => {
    if (!profile && item.key !== 'back') {
      dispatch(signUpOpen())
      return;
    }
    if(item.key === 'back'){
      !profile ? router.push(`/guestpage`) : router.push(`/id${profile.id}`)
    }
    else{
      setTab(item.key);
    }
  }

  return (
    <Layout showLeftMenu={false} title={<>{t('lookingAt')} <span
      className={getRoleClass()}>{t(profile?.role)} {t('profile')}</span> {t('of')} {profile?.firstName} {profile?.lastName}</>}>
  <ProjectWrapper projectId={props.projectId}  mode={'public'}>

      <div className={styles.root}>
        <div className={styles.desktop}>
          <ProjectTabs fullWidth tabs={tabs} activeTab={tab} onChange={handleChangeTab}/>
        </div>
        <div className={classNames(styles.mobile, getModeClass())}>

          <TabSelect style='projectModal' tabs={tabs} activeTab={tab} onChange={(item) => setTab(item.key)}/>
        </div>
        <div className={styles.content}>

          {(props.projectId && project) && <>
            {tab === 'description' && (organization) && <TabProjectDescription fullWidth={props.fullWidth} onClose={() => {
            }}  organization={organization} project={project} onPreview={handlePreviewProject}
                                                                               showType={'public'}/>}
            {tab === 'application' && <TabApplication/>}
            {tab === 'volunteers' && <TabVolunteers project={project}/>}
            {tab === 'messages' && <TabChat project={project}/>}
            {tab === 'autoReplies' && <ProjectAutorepliesTab project={project} autoMessages={autoMessages}/>}
            {tab === 'reports' && <TabReports project={project}/>}
          </>}
        </div>
      </div>

  </ProjectWrapper>
      <Modals/>
    </Layout>
  )
}

export default ProjectPublicPage
