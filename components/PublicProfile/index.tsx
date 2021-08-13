import {getAuthServerSide} from "utils/auth";
import {wrapper} from 'store'
import request from 'utils/request'
import {IRootState, ProfileData, SkillData} from 'types'
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
import CardReviews from 'components/PublicProfile/components/view/CardReviews'
import CardRecommendations from 'components/PublicProfile/components/view/CardRecommendations'
import PostList from 'components/Post/PostList'
import CardPosts from 'components/PublicProfile/components/view/CardPosts'

interface Props {
  profile: ProfileData,
  skill: SkillData,
  showType: 'reviews' | 'recommendations' | 'profile' | 'news'
}

const PublicProfile = (props) => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state: IRootState) => state.profile.currentProfile)
  const isEdit = currentProfile && currentProfile.id === props.profile.id;
  const profile = isEdit ? currentProfile : props.profile;
  const [category, setCategory] = useState(null);
  const reduxSkill = useSelector((state: IRootState) => state.profile.currentSkill)
  const currentSkill = reduxSkill || props.skill
  const categoriesCurrentProfile = useSelector((state: IRootState) => state.skill.list);

  const categories = isEdit ? categoriesCurrentProfile : formatSkillList(profile.skills);
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
    if(!currentSkill){
      return;
    }
    const subCategoryId = currentSkill.subCategoryId;


    const categories = formatSkillList(profile.skills);

    if (currentSkill && categories.length > 0) {


      for (const category of categories) {
        const exists = category.skills.find(skill => skill.subCategoryId === subCategoryId);

        if (exists) {
          dispatch(setCurrentSkill(exists));
          setCategory(category);

          break;
        }

      }
    }
  }, [props.skill])


  useEffect(() => {
    if (isEdit) {
      dispatch(fetchSkillList());
    }
  }, [isEdit])
  const handleCategoryChange = (category, subCategory) => {
    setCategory(category);
    if (subCategory?.subCategoryId) {
      dispatch(setCurrentSkill(subCategory));

      router.replace(`/sk${subCategory.id}`, undefined, {shallow: true})
    }

  }
  return (
    <ProfilePageLayout {...props} isCurrentProfileOpened={isEdit} profile={profile} isEdit={isEdit} subCategory={currentSkill} onCategoryChange={handleCategoryChange}>

      {props.showType ==='news' ? <CardPosts profile={profile}/>  : profile.role === 'client' && props.showType ==='profile' ? <>

          <CardReviews profile={profile} />
          </>

        : <>
      {!currentSkill && props.showType ==='profile' && <CardProfileStat profile={profile}/>}
          {props.showType === 'recommendations' && <>
            <CardRecommendations profile={profile}/>

          </>}
      {currentSkill  && <>
        <CardCategorySelector categories={categories} profile={profile} isEdit={isEdit} category={category} subCategory={currentSkill}
                              onCategoryChange={handleCategoryChange}/>
        {props.showType === 'profile' && category && <><CardSalesPitch profile={profile} isEdit={isEdit} skill={currentSkill}/>
        <CardWorkExperience profile={profile} isEdit={isEdit} skill={currentSkill}/>
        <CardPortfolio profile={profile} isEdit={isEdit} skill={currentSkill}/>
        <CardGallery profile={profile} isEdit={isEdit} skill={currentSkill}/></>}
      </>}
          {props.showType === 'reviews' && <>
            <CardReviews profile={profile} skill={currentSkill}/>
          </>}
     </>}
    </ProfilePageLayout>
  )
}
export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const res = await getAuthServerSide()(ctx as any);
  const data = await request({url: `/api/profile/${ctx.query.id}`, method: 'GET'})
  return {props: {...(res as any).props, profile: data.data}};
});

export default PublicProfile
