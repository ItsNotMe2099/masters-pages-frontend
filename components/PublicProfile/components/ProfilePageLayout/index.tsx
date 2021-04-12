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

interface Props{
  profile: ProfileData,
  isEdit: boolean,
  children?: any
}
const ProfilePageLayout = (props: Props) => {
  const {profile, isEdit} = props;

  return (
    <div className={styles.root}>
      <Header {...props}/>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <CardProfile profile={profile} isEdit={isEdit}/>
          <CardPreferWorkIn profile={profile} isEdit={isEdit}/>
          <CardCategories profile={profile} isEdit={isEdit}/>
          <CardLanguages profile={profile} isEdit={isEdit}/>
          <CardBio profile={profile} isEdit={isEdit}/>
          <CardRecommendationsShort profile={profile}/>
          <CardReviewsShort profile={profile}/>
          {/*<CardRewards profile={profile}/>*/}
        </div>
        <div className={styles.rightColumn}>
          {props.children}
        </div>
      </div>
      <Modals/>
    </div>
  )
}

export default ProfilePageLayout
