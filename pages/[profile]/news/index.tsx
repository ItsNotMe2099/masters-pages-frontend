import {getAuthServerSide} from 'utils/auth'
import Button from 'components/ui/Button'
import request from 'utils/request'
import { IRootState, SkillData} from 'types'
import styles from './index.module.scss'
import PublicProfile from 'components/PublicProfile'
import {IProfile} from 'data/intefaces/IProfile'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { modalClose, postEditOpen, signUpOpen } from 'components/Modal/actions'
import PostModal from 'components/Follower/PostModal'
import PostList from 'components/Post/PostList'
import Layout from 'components/layout/Layout'
import Modals from 'components/layout/Modals'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useAppContext } from 'context/state'
interface Props{
  profile: IProfile,
  skill: SkillData
}
const ProfileNews = (props) => {
  const dispatch = useDispatch()
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [currentEditPost, setCurrentEditPost] = useState(null)
  const {t} = useTranslation('common')
  const router = useRouter()
  const context = useAppContext()
  const total = useSelector((state: IRootState) => state.profileGallery.total)


  const profileId = +router.asPath.split('/').find(item => item[1]).slice(2)

  console.log('ROUTERRERERER', profileId)

  const handleEdit = (item) => {
    router.push('/registration/user')
  }

  //return <PublicProfile {...props} showType={'news'}/>
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          News feed: {total}
        </div>
       <PostList onEdit={handleEdit} profileId={profileId}/>
      </div>
      {modalKey === 'postEditOpen' && <PostModal currentEditPost={currentEditPost} isOpen={true} onClose={() => dispatch(modalClose())}/>}

      <Modals/>
    </Layout>
  )
}
export const getServerSideProps = async (ctx) => {
  const res = await getAuthServerSide()(ctx as any)
  const id = ctx.query.profile as string
  let profile, skill = null
  if(id.indexOf('id') === 0){
    profile = (await request({ url: `/api/profile/${id.replace('id', '')}`, method: 'GET' }, ctx))?.data


  }else if(id.indexOf('sk') === 0){
    skill = (await request({ url: `/api/profile/skill/${id.replace('sk', '')}`, method: 'GET' }, ctx))?.data
    profile = skill?.profile
  }else{
    profile = (await request({ url: `/api/profile/bySlug/${id}`, method: 'GET' }, ctx))?.data
    if(!profile){
      return {
        notFound: true
      }
    }
  }

  return {props: {...(res as any).props, profile, skill}}
}

export default ProfileNews
