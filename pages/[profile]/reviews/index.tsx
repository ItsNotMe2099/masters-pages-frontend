import {getAuthServerSide} from 'utils/auth'

import request from 'utils/request'
import { SkillData} from 'types'

import PublicProfile from 'components/PublicProfile'
import {IProfile} from 'data/intefaces/IProfile'
interface Props{
  profile: IProfile,
  skill: SkillData
}
const ProfileReviews = (props) => {
  return <PublicProfile {...props} showType={'reviews'}/>
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

export default ProfileReviews
