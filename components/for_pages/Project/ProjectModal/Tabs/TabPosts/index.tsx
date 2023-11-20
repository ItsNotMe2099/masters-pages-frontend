import styles from './index.module.scss'
import { IProject } from 'data/intefaces/IProject'
import classNames from 'classnames'
import { format } from 'date-fns'
import ProjectStatusLabel from '../../ProjectStatusLabel'
import Tabs from '../TabVolunteers/Tabs'
import { useSelector, useDispatch } from 'react-redux'
import { default as React, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { IRootState } from 'types'
import PostModal from 'components/Post/PostModal'
import Button from 'components/ui/Button'
import PostList from 'components/Post/PostList'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import { ApplicationStatus, IApplication } from 'data/intefaces/IApplication'
import { ProfileRole } from 'data/intefaces/IProfile'

interface Props {
  project: IProject
}


export enum PostsTabType {
  All = 'all',
  My = 'my',
}

const TabPosts = ({ project, ...props }: Props) => {

  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [currentEditPost, setCurrentEditPost] = useState(null)
  const appContext = useAppContext()


  const handleCreate = () => {
    setCurrentEditPost(null)
    //dispatch(postEditOpen())
    appContext.showModal(ModalType.PostEditOpen)
  }
  const handleEdit = (item) => {
    setCurrentEditPost(item)
    //dispatch(postEditOpen())
    appContext.showModal(ModalType.PostEditOpen)
  }

  const tabs = ([
    { name: 'All Posts', key: PostsTabType.All },
    { name: 'My posts', key: PostsTabType.My },
  ]).map(item => {
    return {
      ...item,
      link: `/projects/${item.key}`
    }
  });
  const [currentTab, setCurrentTab] = useState(tabs[0].key)

  const handleChange = (item, miniTabs?: boolean) => {
    setCurrentTab(item.key)
  }

  const [app, setApp] = React.useState<IApplication | null>(null)

  const fetchApplication = async () => {
    await ApplicationRepository.fetchOneByProject(project.id).then(i => {
      if (i) {
        setApp(i)
      }
    })
  }

  useEffect(() => {
    fetchApplication()
  }, [])

  return (
    <div className={styles.root}>
      <div className={classNames(styles.section, styles.info)}>
        <div className={styles.top}>
          <div className={styles.left}>
            <ProjectStatusLabel status={project.status} />
            <div className={styles.title}>{project?.title || '[Project title]'}</div>
            <div className={styles.projectId}>Project id#: {project?.id}</div>
          </div>
          {project && <div className={styles.right}>
            <div className={styles.line}>Application Limit: 0/{project.applicationsLimits}</div>
            <div className={styles.line}>Vacancies: 0/{project.vacanciesLimits}</div>
          </div>}
        </div>

        <div className={styles.dates}>
          <div className={styles.dateItem}>
            <div className={styles.dateItemLabel}>Applications Deadline: </div>
            <div className={styles.date}>
              <img src={'/img/Project/calendar.svg'} />{format(new Date(project.applicationsClothingDate), 'MM.dd.yy')}</div>
          </div>
          <div className={styles.separator} />
          <div className={styles.dateItem}><div className={styles.dateItemLabel}>Project Deadline: </div>
            <div className={styles.date}>
              <img src={'/img/Project/calendar.svg'} /><span>{format(new Date(project.endDate), 'MM.dd.yy')}</span>
            </div>
          </div>

        </div>

      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <Tabs className={styles.tabs} onChange={(item) => handleChange(item)} style={'reports'} tabs={tabs} activeTab={currentTab} />
          {(appContext.profile.role === ProfileRole.Corporate || app?.status !== ApplicationStatus.Draft &&
            app?.status !== ApplicationStatus.Applied
            && app?.status !== ApplicationStatus.Shortlist && app?.status !== ApplicationStatus.Invited) &&
            <Button red={true} bold={true} size={'12px 40px'} type={'button'} onClick={handleCreate}>{t('post.createPost')}</Button>}
        </div>
        <PostList projectId={project.id} allPosts={currentTab === PostsTabType.All} onEdit={handleEdit} />
      </div>
      {appContext.modal === ModalType.PostEditOpen && <PostModal projectId={project.id} currentEditPost={currentEditPost} isOpen={true} onClose={appContext.hideModal} />}
    </div>
  )
}
export default TabPosts
