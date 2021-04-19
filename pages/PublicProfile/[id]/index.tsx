import {getAuthServerSide} from "utils/auth";
import {wrapper} from 'store'
import request from 'utils/request'
import {IRootState, ProfileData} from 'types'
import CardSalesPitch from 'components/PublicProfile/components/view/CardSalesPitch'
import CardWorkExperience from 'components/PublicProfile/components/view/CardWorkExperience'
import CardPortfolio from 'components/PublicProfile/components/view/CardPortfolio'
import CardGallery from 'components/PublicProfile/components/view/CardGallery'
import Header from 'components/layout/Header'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import {fetchSkillList} from 'components/Skill/actions'
import CardCategorySelector from 'components/PublicProfile/components/view/CardCategorySelector'
import {formatSkillList} from 'utils/skills'
import {fetchProfileTabList} from 'components/ProfileTab/actions'
import {setCurrentSkill} from 'components/Profile/actions'
import {useRouter} from 'next/router'
import CardProfileStat from 'components/PublicProfile/components/view/CardProfileStat'
import CardReviewsShort from 'components/PublicProfile/components/view/CardReviewsShort'
import ProfilePageLayout from 'components/PublicProfile/components/ProfilePageLayout'

interface Props {
  profile: ProfileData
}

const NewMain = (props) => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state: IRootState) => state.profile.currentProfile)
  const isEdit = currentProfile && currentProfile.id === props.profile.id;
  const profile = isEdit ? currentProfile : props.profile;
  const [category, setCategory] = useState(null);
  const currentSkill = useSelector((state: IRootState) => state.profile.currentSkill)
  const categories = isEdit ? useSelector((state: IRootState) => state.skill.list) : formatSkillList(profile.skills);
  const router = useRouter();

  useEffect(() => {
    if(currentSkill && isEdit){

      for (const category of categories) {
        const exists = category.skills.find(skill => skill.id === currentSkill.id);
        if (exists) {
          setTimeout(() => {
            dispatch(setCurrentSkill(exists));
            setCategory(category);
          }, 100)

          return;
        }

      }
    }
  }, [categories])
  useEffect(() => {
    if (!currentSkill) {
      return;
    }
    dispatch(fetchProfileTabList({
      profileId: profile.id,
      categoryId: currentSkill.categoryId,
      subCategoryId: currentSkill.subCategoryId
    }));
  }, [currentSkill]);

  useEffect(() => {
    const subCategoryId = parseInt(router.query.subCategoryId as string, 10);
    console.log("Category updatedRoute", currentSkill?.subCategoryId, router.query.subCategoryId);
    if(subCategoryId === currentSkill?.subCategoryId){
      return;
    }
    console.log("Category updatedRoute1", currentSkill?.subCategoryId, router.query.subCategoryId);

    const categories = formatSkillList(profile.skills);

    if (router.query.subCategoryId && categories.length > 0) {


      for (const category of categories) {
        const exists = category.skills.find(skill => skill.subCategoryId === subCategoryId);
        if (exists) {
          setTimeout(() => {
            dispatch(setCurrentSkill(exists));
            setCategory(category);
          }, 100)

          return;
        }

      }
    }
  }, [router.query.subCategoryId])


  useEffect(() => {
    if (isEdit) {
      dispatch(fetchSkillList());
    }
  }, [isEdit])
  const handleCategoryChange = (category, subCategory) => {
    setCategory(category);

    if (subCategory) {
      dispatch(setCurrentSkill(subCategory));

      router.replace(`/PublicProfile/${profile.id}?subCategoryId=${subCategory.subCategoryId}`, undefined, {shallow: true})
    }

  }
  console.log("CurrentSkill", currentSkill);
  return (
    <ProfilePageLayout {...props} profile={profile} isEdit={isEdit}>
      {!router.query.subCategoryId && <CardProfileStat profile={profile}/>}
      {currentSkill && <>
        <CardCategorySelector categories={categories} profile={profile} isEdit={isEdit} category={category} subCategory={currentSkill}
                              onCategoryChange={handleCategoryChange}/>
        <CardSalesPitch profile={profile} isEdit={isEdit} skill={currentSkill}/>
        <CardWorkExperience profile={profile} isEdit={isEdit} skill={currentSkill}/>
        <CardPortfolio profile={profile} isEdit={isEdit} skill={currentSkill}/>
        <CardGallery profile={profile} isEdit={isEdit} skill={currentSkill}/>
      </>}
    </ProfilePageLayout>
  )
}
export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const res = await getAuthServerSide()(ctx as any);
  const data = await request({url: `/api/profile/${ctx.query.id}`, method: 'GET'})
  console.log("PublicProfile", data);
  return {props: {...(res as any).props, profile: data.data}};
});

export default NewMain
