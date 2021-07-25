import {ProfilePageType} from 'types'
import request from 'utils/request'

export const getProfilePageType = (url): {type: ProfilePageType, id: string | number} => {
  const parts = url.split('/');
  const firstPath = parts.length > 1 ? parts[1] : null;
  console.log("parts", firstPath, url, parts);
  if(firstPath && firstPath.indexOf('id') === 0){
    return {type: ProfilePageType.Profile, id: firstPath.replace('id', '') };
  }
  if(firstPath && firstPath.indexOf('sk') === 0){
    return {type: ProfilePageType.Skill, id: firstPath.replace('sk', '') };
  }
}
export const getProfilePageProps = async (ctx) => {
  const profilePageType = getProfilePageType(ctx.req.url);
  let profile, skill = null;
    console.log("profilePageType", profilePageType);
  if(profilePageType?.type === ProfilePageType.Skill){
    skill = (await request({ url: `/api/profile/skill/${profilePageType.id}`, method: 'GET' }))?.data
    profile = skill?.profile;
  }else if(profilePageType?.type === ProfilePageType.Profile){
    profile = (await request({ url: `/api/profile/${profilePageType.id}`, method: 'GET' }))?.data
    console.log("GetProfile", profile);
  }else{
    return null;
  }
  if(!profile){
    return null;
  }
  return {profile, skill}

}

export const getProfileRoleByRoute = (route: string) => {
  if(route.includes('MasterProfile')){
    return 'master'
  }else if(route.includes('VolunteerProfile')){
    return 'volunteer'
  }
  return null;
}
