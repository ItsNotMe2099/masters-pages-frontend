import {getAuthServerSide} from 'utils/auth'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'
import {default as React, useEffect, useState} from "react";
import {useTranslation} from "i18n";
import {useRouter} from 'next/router'
import Layout from 'components/layout/Layout'

import {IProfileGalleryItem, IRootState, ProfileData} from 'types'
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

export const getServerSideProps = async (ctx) => {
  const res = await getAuthServerSide()(ctx as any);
  const id = ctx.query.id as string;
  const profile = (await request({ url: `/api/profile/${id}`, method: 'GET' }))?.data

  return {props: {...(res as any).props, profile}};
}
