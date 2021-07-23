import {getAuthServerSide} from 'utils/auth'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'
import {default as React, useEffect, useState} from "react";
import {useTranslation} from "i18n";
import {useRouter} from 'next/router'
import Layout from 'components/layout/Layout'

import {IProfileGalleryItem, IRootState, ProfileData} from 'types'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  deleteProfileGallery,
  fetchProfileGalleryList,
  resetProfileGalleryList,
  setProfileGalleryCurrentItemIndex
} from 'components/ProfileGallery/actions'
import {setPageTaskUser} from 'components/TaskUser/actions'
import PostItem from 'components/Post/PostItem'
import GalleryModal from 'components/PublicProfile/components/view/GalleryModal'
import PostModal from 'components/Post/PostModal'
import {confirmOpen, modalClose, postEditOpen} from 'components/Modal/actions'
import Button from 'components/ui/Button'
import Modals from 'components/layout/Modals'
import PostList from 'components/Post/PostList'
import {wrapper} from 'store'
import request from 'utils/request'
import ProfileCard from 'components/ui/ProfileCard'
interface Props{
  profile?: ProfileData
}
const ProfilePostsPage = ({profile}: Props) => {
  const {t} = useTranslation('common')
  const router = useRouter();
  const dispatch = useDispatch()
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)


  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.title}>{t('post.postBy')} {profile.firstName} {profile.lastName}</div>
          <ProfileCard profile={profile}/>
        <PostList profileId={profile.id}/>
      </div>

      <Modals/>
    </Layout>
  )
}

export default ProfilePostsPage

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  console.log("ctxQueryPost", ctx.query.profile)
  const res = await getAuthServerSide()(ctx as any);
  const id = ctx.query.id as string;
  const profile = (await request({ url: `/api/profile/${id}`, method: 'GET' }))?.data

  return {props: {...(res as any).props, profile}};
});
