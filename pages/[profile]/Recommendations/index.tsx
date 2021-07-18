import {getAuthServerSide} from "utils/auth";

import request from 'utils/request'
import {IRootState, ProfileData, SkillData} from 'types'

import {wrapper} from 'store'
import PublicProfile from 'components/PublicProfile'
interface Props{
  profile: ProfileData,
  skill: SkillData
}
const ProfileRecommendations = (props) => {
  return <PublicProfile {...props} showType={'recommendations'}/>
}
export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const res = await getAuthServerSide()(ctx as any);
  const id = ctx.query.profile as string;
  let profile, skill = null;
  if(id.indexOf('id') === 0){
    profile = (await request({ url: `/api/profile/${id.replace('id', '')}`, method: 'GET' }))?.data


  }else if(id.indexOf('sk') === 0){
    console.log("getId", `/api/profile/skill${id.replace('sk', '')}`)
    skill = (await request({ url: `/api/profile/skill/${id.replace('sk', '')}`, method: 'GET' }))?.data
    console.log("SetSkill", skill);
    profile = skill?.profile
  }else{
    return {
      notFound: true
    }
  }

  return {props: {...(res as any).props, profile, skill}};
});

export default ProfileRecommendations