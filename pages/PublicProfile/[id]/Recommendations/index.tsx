import {getAuthServerSide} from "utils/auth";

import request from 'utils/request'
import {IRootState, ProfileData} from 'types'

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
import {fetchProfileRecommendationList} from 'components/ProfileRecommendations/actions'
import CardRecommendations from 'components/PublicProfile/components/view/CardRecommendations'
interface Props{
  profile: ProfileData
}
const ProfileRecommendations = (props) => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state: IRootState) => state.profile.currentProfile)
  const isEdit = currentProfile && currentProfile.id === props.profile.id;
  const profile = isEdit ? currentProfile : props.profile;
  const [category, setCategory] = useState(null);
  const currentSkill = useSelector((state: IRootState) => state.profile.currentSkill)
  const router = useRouter();


  useEffect(() => {
    if (isEdit) {
      dispatch(fetchSkillList());
    }
  }, [])

  return (
    <ProfilePageLayout {...props} profile={profile} isEdit={isEdit}>
     <CardRecommendations profile={profile}/>
    </ProfilePageLayout>
  )
}
export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const res = await getAuthServerSide()(ctx as any);
  const data = await request({ url: `/api/profile/${ctx.query.id}`, method: 'GET' })
  console.log("PublicProfile", data);
  return {props: {...(res as any).props, profile: data.data}};
});

export default ProfileRecommendations
