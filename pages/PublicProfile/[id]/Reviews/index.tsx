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
interface Props{
  profile: ProfileData
}
const ProfileReviews = (props) => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state: IRootState) => state.profile.currentProfile)
  const isEdit = currentProfile && currentProfile.id === props.profile.id;
  const profile = isEdit ? currentProfile : props.profile;
  const [category, setCategory] = useState(null);
  const currentSkill = useSelector((state: IRootState) => state.profile.currentSkill)
  const categories = isEdit ? useSelector((state: IRootState) => state.skill.list) : formatSkillList(profile.skills);
  const router = useRouter();

  useEffect(() => {
    console.log("Category updated");
    const categories = formatSkillList(profile.skills);
    if (!category && !currentSkill && categories.length > 0) {
      const subCategoryId = parseInt(router.query.subCategoryId as string, 10);
      console.log("skillId", subCategoryId);
      if (subCategoryId) {
        for (const category of categories) {
          const exists = category.skills.find(skill => skill.subCategoryId === subCategoryId);
          console.log("Categories", category.skills);
          if (exists) {
            console.log("isExists", exists);
            dispatch(setCurrentSkill(exists));
            setCategory(category);
            return;
          }
        }
      }
    } else if (category && currentSkill && categories.length > 0) {
      for (const category of categories) {
        const exists = category.skills.find(skill => skill.subCategoryId === currentSkill.subCategoryId);
        if (exists) {
          dispatch(setCurrentSkill(exists));
          return;
        }
      }


    }
  }, [])
  useEffect(() => {
    if (categories.length > 0 && props.categoryId !== null && props.subCategoryId !== category?.category?.id) {
      setCategory(categories.find(category => category.category.id === props.categoryId));
    }
  }, [props.categoryId])
  useEffect(() => {
    if (categories.length > 0 && props.subCategoryId !== null && props.subCategoryId !== currentSkill?.subCategoryId) {
      for (const category of categories) {
        const exists = category.skills.find(skill => skill.subCategoryId === props.subCategoryId);
        if (exists) {
          dispatch(setCurrentSkill(exists));
          return;
        }
      }
    }
  }, [props.subCategoryId])
  useEffect(() => {
    if (isEdit) {
      dispatch(fetchSkillList());
    }
  }, [])
  const handleCategoryChange = (category, subCategory) => {
    setCategory(category);
    dispatch(setCurrentSkill(subCategory));
    if (subCategory) {
      router.replace(`/PublicProfile/${profile.id}/Reviews?subCategoryId=${subCategory.subCategoryId}`, undefined, {shallow: true})
    }

  }
  return (
    <ProfilePageLayout {...props} profile={profile} isEdit={isEdit}>
      {category &&
      <CardCategorySelector profile={profile} isEdit={isEdit} category={category} subCategory={currentSkill}
                            onCategoryChange={handleCategoryChange}/>}
      {(currentSkill && router.query.subCategoryId || !router.query.subCategoryId) && <CardReviews profile={profile} skill={currentSkill}/>}
    </ProfilePageLayout>
  )
}
export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const res = await getAuthServerSide()(ctx as any);
  const data = await request({ url: `/api/profile/${ctx.query.id}`, method: 'GET' })
  console.log("PublicProfile", data);
  return {props: {...(res as any).props, profile: data.data}};
});

export default ProfileReviews
