import {getAuthServerSide} from 'utils/auth'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'
import {default as React, useEffect, useState} from "react";
import {useTranslation} from "i18n";
import {useRouter} from 'next/router'
import Layout from 'components/layout/Layout'

import {IProfileGalleryItem, IRootState} from 'types'
import PostModal from 'components/Post/PostModal'
import {confirmOpen, modalClose, postEditOpen} from 'components/Modal/actions'
import Button from 'components/ui/Button'
import Modals from 'components/layout/Modals'
import PostList from 'components/Post/PostList'
interface Props{
  profileId?: number
}
const PostsPage = (props: Props) => {
  const {t} = useTranslation()
  const router = useRouter();
  const dispatch = useDispatch()
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [currentEditPost, setCurrentEditPost] = useState(null);


  const handleCreate = () => {
    setCurrentEditPost(null);
    dispatch(postEditOpen());
  }
  const handleEdit = (item) => {
    setCurrentEditPost(item);
    dispatch(postEditOpen());
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <Button red={true} bold={true} size={'12px 40px'} type={'button'} onClick={handleCreate}>{t('post.createPost')}</Button>
        </div>
       <PostList onEdit={handleEdit}/>
      </div>
      {modalKey === 'postEditOpen' && <PostModal currentEditPost={currentEditPost} isOpen={true} onClose={() => dispatch(modalClose())}/>}

      <Modals/>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default PostsPage
