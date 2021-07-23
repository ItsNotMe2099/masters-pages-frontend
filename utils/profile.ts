import {ProfilePageType} from 'types'
import request from 'utils/request'

export const getProfilePageType = (url): {type: ProfilePageType, id: string | number} => {
  const parts = url.split('/');
  const firstPath = parts[0];
  if(parts.length > 0 && parts[0].indexOf('/id') === 0){
    return {type: ProfilePageType.Profile, id: firstPath.replace('/id', '') };
  }
  if(parts.length > 0 && parts[0].indexOf('/sk') === 0){
    return {type: ProfilePageType.Skill, id: firstPath.replace('/sk', '') };
  }
}
export const getProfilePageProps = async (ctx) => {
  const profilePageType = getProfilePageType(ctx.req.url);
  let profile, skill = null;

  if(profilePageType?.type === ProfilePageType.Skill){
    skill = (await request({ url: `/api/profile/skill/${profilePageType.id}`, method: 'GET' }))?.data
    profile = skill?.profile;
  }else if(profilePageType?.type === ProfilePageType.Profile){
    profile = (await request({ url: `/api/profile/${profilePageType.id}`, method: 'GET' }))?.data

  }else{
    return null;
  }
  if(!profile){
    return null;
  }
  return {profile, skill}

}
