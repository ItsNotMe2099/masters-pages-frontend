import {getAuthServerSide} from "utils/auth";
import {wrapper} from 'store'
import {ProfileData, ProfilePageType, SkillData} from 'types'

import PublicProfile from 'components/PublicProfile'
import {getProfilePageProps} from 'utils/profile'

interface Props {
  profile: ProfileData,
  skill: SkillData
  showType?: string
}

const ProfilePage = (props) => {
 return <PublicProfile {...props}/>
}
export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  console.log("ctxQuery111", ctx.req.url)
  const parts = ctx.req.url.split('/')
  const lastPath = parts[parts.length - 1];
  const profileProps = getProfilePageProps(ctx);
  if(!profileProps){
    return {
      notFound: true
    }
  }
  let showType = 'profile';

  switch (lastPath){
    case 'news':
      showType = 'news'
      break;
    case 'Recommendations':
      showType = 'Recommendations'
      break;
    case 'Reviews':
      showType = 'Reviews'
      break;
  }
  console.log("showType", showType);
  const res = await getAuthServerSide()(ctx as any);
  return {props: {...(res as any).props, ...profileProps, showType}};
});

export default ProfilePage
