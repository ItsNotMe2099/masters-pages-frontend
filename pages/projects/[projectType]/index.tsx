import {modalClose, projectOpen} from 'components/Modal/actions'
import Task from 'components/Task'

import Loader from 'components/ui/Loader'
import Tabs from 'components/ui/Tabs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IRootState, ITask } from 'types'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { TabSelect } from 'components/TabSelect'
import { useTranslation } from 'next-i18next'
import Layout from 'components/layout/Layout'
import {getAuthServerSide} from 'utils/auth'
import Modals from 'components/layout/Modals'
import Button from 'components/ui/Button'
import {ProfileRole} from 'data/intefaces/IProfile'
import ProjectModal from 'components/for_pages/Project/ProjectModal'
import {useAppContext} from 'context/state'
interface Props {
}
const TabOrders = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const dispatch = useDispatch()

  const { projectType } = router.query
  const appContext = useAppContext();
  const profile = appContext.profile
  const loading = false
  const tasks = []
  const total = 0
  const page =1
  const stat = useSelector((state: IRootState) => state.taskUser.stat)
  const role = appContext.role
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [currentProjectEdit, setCurrentTaskEdit] = useState(null)

  console.log('profileEweqe', profile)
  const tabs = profile.role === ProfileRole.Corporate ? [
    {name: t('personalArea.tabProjects.menu.draft'), key: 'draft'},
    {name: t('personalArea.tabProjects.menu.intake'), key: 'published'},
    {name: t('personalArea.tabProjects.menu.paused'), key: 'paused'},
    {name: t('personalArea.tabProjects.menu.execution'), key: 'in_progress'},
    {name: t('personalArea.tabProjects.menu.completed'), key: 'closed'},
    {name: t('personalArea.tabProjects.menu.cancelled'), key: 'cancelled'},
  ] : [
    {name: t('personalArea.tabProjects.menu.saved'), key: 'saved'},
    {name: t('personalArea.tabProjects.menu.applied'), key: 'applied'},
    {name: t('personalArea.tabProjects.menu.invited'), key: 'invited'},
    {name: t('personalArea.tabProjects.menu.execution'), key: 'execution'},
    {name: t('personalArea.tabProjects.menu.completed'), key: 'closed'},
    {name: t('personalArea.tabProjects.menu.rejected'), key: 'rejected'},
  ].map(item => {
    return{
      ...item,
      link: `/projects/${item.key}`
    }})
  useEffect(() => {

  }, [projectType])
  useEffect(() => {
    return () => {


    }
  }, [])
  const handleScrollNext = () => {

  }
  const handleTaskEdit = (task: ITask) => {

  }
  const handleCreateProject = () => {
    dispatch(projectOpen())
  }

  return (
    <Layout>
    <div className={styles.root}>
      <div className={styles.actions}>
      <Button  red={true} bold={true} size={'12px 40px'}
              type={'button'} onClick={handleCreateProject}>{t('personalArea.tabProjects.menu.create')}</Button>
      </div>
      <div className={styles.desktop}>
        <Tabs style={'fullWidthRound'} tabs={tabs.map((tab => {
        const statResult = stat.find(item => item.task_status === tab.key)

        return {...tab, name: tab.key === 'saved' ? `${tab.name}` : `${tab.name} (${statResult ? statResult.count : 0})`}
      }))} activeTab={projectType as string}/>
      </div>
      <div className={styles.mobile}>
        <TabSelect tabs={tabs.map((tab => {
        const statResult = stat.find(item => item.task_status === tab.key)

        return  {...tab, name: tab.key === 'saved' ? `${tab.name}` : `${tab.name} (${statResult ? statResult.count : 0})`}
      }))} activeTab={projectType as string}/>

        </div>
      <div className={styles.tasks}>
        {(loading && total === 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={tasks.length} //This is important field to render the next data
          next={handleScrollNext}
          hasMore={total > tasks.length}
          loader={loading ? <Loader/> : null}>
          {tasks.map(task => <Task key={task.id} onEdit={handleTaskEdit} task={task} actionsType={projectType === 'saved'? 'public' : role === 'client' ? 'client' : 'master'} showProfile={false}/>)}
        </InfiniteScroll>}
      </div>
      <ProjectModal project={currentProjectEdit} isOpen={modalKey === 'projectModal'} onClose={() => dispatch(modalClose())}/>

    </div>
      <Modals/>
    </Layout>
  )
}
export default TabOrders
export const getServerSideProps = getAuthServerSide({redirect: true})
