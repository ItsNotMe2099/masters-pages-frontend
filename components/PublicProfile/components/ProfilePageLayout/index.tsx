import styles from './index.module.scss'
import CardTitle from 'components/PublicProfile/components/CardTitle'
import AddCircleIcon from 'components/svg/AddCircleIcon'
import Loader from 'components/ui/Loader'
import Header from 'components/layout/Header'
import CardProfile from 'components/PublicProfile/components/view/CardProfile'
import CardPreferWorkIn from 'components/PublicProfile/components/view/CardPreferWorkIn'
import CardCategories from 'components/PublicProfile/components/view/CardCategories'
import CardLanguages from 'components/PublicProfile/components/view/CardLanguages'
import CardBio from 'components/PublicProfile/components/view/CardBio'
import CardRecommendations from 'components/PublicProfile/components/view/CardRecommendations'
import CardReviewsShort from 'components/PublicProfile/components/view/CardReviewsShort'
import CardRewards from 'components/PublicProfile/components/view/CardRewards'

import Modals from 'components/layout/Modals'
import {ProfileData} from 'types'
import {ReactElement, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchFeedbacksToProfileShortRequest} from 'components/ProfileFeedback/actions'
import CardRecommendationsShort from 'components/PublicProfile/components/view/CardRecommendationsShort'
import Layout from 'components/layout/Layout'

interface Props{
  profile: ProfileData,
  isEdit: boolean,
  children?: any,
  subCategory: any,
  onCategoryChange: (categoryId, subCategoryId) => void
}
const ProfilePageLayout = (props: Props) => {
  const {profile, isEdit, onCategoryChange, subCategory} = props;
  const isMaster = ['master', 'volunteer'].includes(profile.role);
  console.log("MainSubCateogory", subCategory);
  return (
    <Layout>

      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <CardProfile profile={profile} isEdit={isEdit}/>
          <CardPreferWorkIn profile={profile} isEdit={isEdit}/>
          {isMaster && <CardCategories profile={profile} isEdit={isEdit} onCategoryChange={onCategoryChange} subCategory={subCategory}/>}
          <CardLanguages profile={profile} isEdit={isEdit}/>
          {isMaster && <CardBio profile={profile} isEdit={isEdit}/>}
          {isMaster && <CardRecommendationsShort profile={profile}/>}
          <CardReviewsShort profile={profile} subCategory={subCategory}/>
          {/*<CardRewards profile={profile}/>*/}
        </div>
        <div className={styles.rightColumn}>
          {props.children}
        </div>
      </div>
      <Modals/>
    </Layout>
  )
}

export default ProfilePageLayout
