import { modalClose } from 'components/Modal/actions'
import Modal from 'components/ui/Modal'
import { useEffect } from 'react'
import * as React from 'react'
import {IProfileGalleryItem, IRootState} from 'types'
import styles from 'components/Portfolio/SkillModal/index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import PostForm from 'components/Post/PostModal/PostForm'
import {createProfileGallery, resetProfileGalleryForm, updateProfileGallery} from 'components/ProfileGallery/actions'
import {useTranslation} from 'next-i18next'
import { useAppContext } from 'context/state'
interface Props {
  isOpen: boolean,
  currentEditPost?: IProfileGalleryItem
  onClose: () => void
}
const PostModal = ({isOpen, currentEditPost, onClose}: Props) => {
  const loading = useSelector((state: IRootState) => state.skill.formLoading)
  const dispatch = useDispatch()
  const {t} = useTranslation('common')
  const appContext = useAppContext()
  useEffect(() => {
    if(isOpen){
      dispatch(resetProfileGalleryForm())
    }
  }, [isOpen])
  const handleSubmit = (data) => {
    if(!currentEditPost) {
      dispatch(createProfileGallery({ ...data
      }))
    }else{
      dispatch(updateProfileGallery(currentEditPost.id, {...data
      }))
    }
    appContext.hideModal()
  }

  return (
    <Modal isOpen={isOpen} className={styles.root} loading={loading} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img  src={`/img/icons/${ currentEditPost ? 'pencil' : 'plus'}.svg`}/>
        </div>
        <div className={styles.title}>{currentEditPost ? t('follower.editPost') : t('follower.addPost')}</div>
      </div>
      <div className={styles.separator}></div>
      <PostForm onSubmit={handleSubmit} initialValues={currentEditPost} onCancel={() => dispatch(modalClose())}/>
    </Modal>
  )
}

export default PostModal
