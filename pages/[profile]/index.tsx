import {getAuthServerSide} from "utils/auth";
import {wrapper} from 'store'
import request from 'utils/request'
import {IRootState, ProfileData, SkillData} from 'types'

import PublicProfile from 'components/PublicProfile'
interface Props {
  profile: ProfileData,
  skill: SkillData
}

const ProfilePage = (props) => {
 return <PublicProfile {...props} showType={'profile'}/>
}
export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {

  const id = ctx.query.profile as string;
  let profile, skill = null;
  if(id.indexOf('id') === 0){
     profile = (await request({ url: `/api/profile/${id.replace('id', '')}`, method: 'GET' }))?.data
    if(!profile){
      return {
        notFound: true
      }
    }

  }else if(id.indexOf('sk') === 0){

     skill = (await request({ url: `/api/profile/skill/${id.replace('sk', '')}`, method: 'GET' }))?.data
    if(!skill){
      return {
        notFound: true
      }
    }
     profile = skill?.profile
  }else{
    return {
      notFound: true
    }
  }
  const res = await getAuthServerSide()(ctx as any);
  return {props: {...(res as any).props, profile, skill}};
});

export default ProfilePage
