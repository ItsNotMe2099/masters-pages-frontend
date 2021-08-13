import {getAuthServerSide} from "utils/auth";

import request from 'utils/request'
import {IRootState, ProfileData, SkillData} from 'types'

import { useSelector, useDispatch } from 'react-redux'
import {useEffect, useState} from 'react'
import {fetchSkillList} from 'components/Skill/actions'
import CardCategorySelector from 'components/PublicProfile/components/view/CardCategorySelector'
import {useRouter} from 'next/router'
import CardReviewsShort from 'components/PublicProfile/components/view/CardReviewsShort'
import ProfilePageLayout from 'components/PublicProfile/components/ProfilePageLayout'
import {formatSkillList} from 'utils/skills'
import {fetchProfileTabList} from 'components/ProfileTab/actions'
import {setCurrentSkill} from 'components/Profile/actions'
import {wrapper} from 'store'
import CardReviews from 'components/PublicProfile/components/view/CardReviews'
import PublicProfile from 'components/PublicProfile'
interface Props{
  profile: ProfileData,
  skill: SkillData
}
const ProfileReviews = (props) => {
  return <PublicProfile {...props} showType={'reviews'}/>
}
export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const res = await getAuthServerSide()(ctx as any);
  const id = ctx.query.profile as string;
  let profile, skill = null;
  if(id.indexOf('id') === 0){
    profile = (await request({ url: `/api/profile/${id.replace('id', '')}`, method: 'GET' }, ctx))?.data


  }else if(id.indexOf('sk') === 0){
    skill = (await request({ url: `/api/profile/skill/${id.replace('sk', '')}`, method: 'GET' }, ctx))?.data
    profile = skill?.profile
  }else{
    return {
      notFound: true
    }
  }

  return {props: {...(res as any).props, profile, skill}};
});

export default ProfileReviews
