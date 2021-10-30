import {ProfilePageType} from 'types'
import request from 'utils/request'
import {getAuthServerSide} from 'utils/auth'

export const getProfilePageType = (url): {type: ProfilePageType, id: string | number} => {
  const parts = url.split('/');
  const firstPath = parts.length > 1 ? parts[1] : null;

  if(firstPath && firstPath.indexOf('id') === 0){
    return {type: ProfilePageType.Profile, id: firstPath.replace('id', '') };
  }
  if(firstPath && firstPath.indexOf('sk') === 0){
    return {type: ProfilePageType.Skill, id: firstPath.replace('sk', '') };
  }
}
export const getProfilePageProps = (mode) => async (ctx) => {
  const profilePageType = mode === 'profile' ? {type: ProfilePageType.Profile, id: ctx.query.profile } : {type: ProfilePageType.Skill, id: ctx.query.profile };
  let profile, skill = null;
  if(profilePageType?.type === ProfilePageType.Skill){
    skill = (await request({ url: `/api/profile/skill/${profilePageType.id}`, method: 'GET' }))?.data
    profile = skill?.profile;
  }else if(profilePageType?.type === ProfilePageType.Profile){
    profile = (await request({ url: `/api/profile/${profilePageType.id}`, method: 'GET' }))?.data
  }else{
    console.log("Profile not found0 ", ctx.query)
    return {
      notFound: true
    }
  }
  if(!profile){
    console.log("Profile not found1 ", ctx.query)
    return {
      notFound: true
    }
  }

  const res = await getAuthServerSide()(ctx as any);
  return {props: {...(res as any).props, profile, skill, ...getProfilePageShowTypeProps(ctx)}}

}

export const getProfilePageShowTypeProps =  (ctx) => {
  const parts = ctx.req.url.split('/')
  const lastPath = parts[parts.length - 1];
  let showType = 'profile';

  switch (lastPath.toLowerCase()){
    case 'news':
      showType = 'news'
      break;
    case 'recommendations':
      showType = 'recommendations'
      break;
    case 'reviews':
      showType = 'reviews'
      break;
  }
  return {showType};
}

export const getProfileRoleByRoute = (route: string) => {
  if(route.includes('MasterProfile')){
    return 'master'
  }else if(route.includes('VolunteerProfile')){
    return 'volunteer'
  }
  return null;
}
