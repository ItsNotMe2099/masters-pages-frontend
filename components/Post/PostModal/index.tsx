import { modalClose } from 'components/Modal/actions'
import Modal from 'components/ui/Modal'
import { useEffect } from 'react'
import * as React from 'react'
import { IProfileGalleryItem, IRootState } from 'types'
import styles from 'components/Portfolio/SkillModal/index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import PostForm from 'components/Post/PostModal/PostForm'
import { createProfileGallery, resetProfileGalleryForm, updateProfileGallery } from 'components/ProfileGallery/actions'
import { useTranslation } from 'next-i18next'
import { useAppContext } from 'context/state'
import { IApplication } from 'data/intefaces/IApplication'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import { ProfileRole } from 'data/intefaces/IProfile'
interface Props {
  isOpen: boolean,
  currentEditPost?: IProfileGalleryItem
  onClose: () => void
  projectId?: number
}
const PostModal = ({ isOpen, currentEditPost, onClose, projectId }: Props) => {
  const loading = useSelector((state: IRootState) => state.skill.formLoading)
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const appContext = useAppContext()
  useEffect(() => {
    if (isOpen) {
      dispatch(resetProfileGalleryForm())
    }
  }, [isOpen])
  const handleSubmit = (data) => {
    if (!currentEditPost) {
      dispatch(createProfileGallery({
        ...data
      }))
    } else {
      dispatch(updateProfileGallery(currentEditPost.id, {
        ...data
      }))
    }
    appContext.hideModal()
  }

  const [app, setApp] = React.useState<IApplication | null>(null)

  const fetchApplication = async () => {
    await ApplicationRepository.fetchOneByProject(projectId).then(i => {
      if (i) {
        setApp(i)
      }
    })
  }

  useEffect(() => {
    if (appContext.profile.role === ProfileRole.Volunteer) {
      fetchApplication()
    }
  }, [])


  return (
    <Modal isOpen={isOpen} className={styles.root} loading={loading} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img src={`/img/icons/${currentEditPost ? 'pencil' : 'plus'}.svg`} />
        </div>
        <div className={styles.title}>{currentEditPost ? t('follower.editPost') : t('follower.addPost')}</div>
      </div>
      <div className={styles.separator}></div>
      <PostForm projectId={projectId} onSubmit={handleSubmit} initialValues={projectId ? { ...currentEditPost, projectId: projectId, state: currentEditPost ? currentEditPost.state : 'published', commentsAllowed: currentEditPost ? currentEditPost.commentsAllowed : true } : { ...currentEditPost, state: currentEditPost ? currentEditPost.state : 'published', commentsAllowed: currentEditPost ? currentEditPost.commentsAllowed : true }} onCancel={() => dispatch(modalClose())} />
    </Modal>
  )
}

export default PostModal
