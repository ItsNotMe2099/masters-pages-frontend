import { modalClose } from "components/Modal/actions";
import { createSkill, fetchSkillList, resetSkillForm, updateSkill } from "components/Skill/actions";
import Loader from "components/ui/Loader";
import Modal from "components/ui/Modal";
import SkillForm from "components/Portfolio/SkillForm";
import { useEffect } from "react";
import * as React from "react";
import {IProfileGalleryItem, IRootState, SkillData, SkillListItem} from "types";
import { getMediaPath } from "utils/media";
import { getCategoryTranslation } from "utils/translations";
import styles from 'components/Portfolio/SkillModal/index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import PostForm from 'components/Post/PostModal/PostForm'
import {createProfileGallery, resetProfileGalleryForm, updateProfileGallery} from 'components/ProfileGallery/actions'
import {useTranslation, Trans} from 'react-i18next'
interface Props {
  isOpen: boolean,
  currentEditPost?: IProfileGalleryItem
  onClose: () => void
}
const PostModal = ({isOpen, currentEditPost, onClose}: Props) => {
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const loading = useSelector((state: IRootState) => state.skill.formLoading)
  const dispatch = useDispatch();
  const {t} = useTranslation('common')
  useEffect(() => {
    if(isOpen){
      dispatch(resetProfileGalleryForm())
    }
  }, [isOpen])
  const handleSubmit = (data) => {
    console.log("HandleSubmit", data);
    if(!currentEditPost) {
      dispatch(createProfileGallery({ ...data
      }));
    }else{
      dispatch(updateProfileGallery(currentEditPost.id, {...data
      }));
    }
  }

  console.log("")
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
