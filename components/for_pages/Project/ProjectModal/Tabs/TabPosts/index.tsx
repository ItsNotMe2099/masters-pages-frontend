import styles from './index.module.scss'
import { IProject } from 'data/intefaces/IProject'
import classNames from 'classnames'
import { format } from 'date-fns'
import ProjectStatusLabel from '../../ProjectStatusLabel'
import {getAuthServerSide} from 'utils/auth'
import { useSelector, useDispatch } from 'react-redux'
import {default as React, useState} from 'react'
import { useTranslation } from 'next-i18next'
import {useRouter} from 'next/router'
import Layout from 'components/layout/Layout'

import { IRootState} from 'types'
import PostModal from 'components/Post/PostModal'
import { modalClose, postEditOpen} from 'components/Modal/actions'
import Button from 'components/ui/Button'
import Modals from 'components/layout/Modals'
import PostList from 'components/Post/PostList'

interface Props {
  project: IProject
}

const TabPosts = ({ project, ...props }: Props) => {

  const {t} = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [currentEditPost, setCurrentEditPost] = useState(null)


  const handleCreate = () => {
    setCurrentEditPost(null)
    dispatch(postEditOpen())
  }
  const handleEdit = (item) => {
    setCurrentEditPost(item)
    dispatch(postEditOpen())
  }

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
          <Button red={true} bold={true} size={'12px 40px'} type={'button'} onClick={handleCreate}>{t('post.createPost')}</Button>
        </div>
        <PostList onEdit={handleEdit} />
      </div>
      {modalKey === 'postEditOpen' && <PostModal currentEditPost={currentEditPost} isOpen={true} onClose={() => dispatch(modalClose())} />}

      <Modals />
    </div>
  )
}
export default TabPosts
