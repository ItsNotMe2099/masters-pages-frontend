import styles from './index.module.scss'
import {IFeedbacksToProfile, IRootState, ProfileData, SkillData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import {default as React, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchFeedbacksToProfileRequest, resetFeedbackList, setPageFeedback} from 'components/ProfileFeedback/actions'
import {setPageTaskUser} from 'components/TaskUser/actions'
import {fetchProfileGalleryList} from 'components/ProfileGallery/actions'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import GalleryItem from 'components/PublicProfile/components/view/CardGallery/components/GalleryItem'
import ReviewListItem from 'components/PublicProfile/components/view/CardReviews/components/ReviewListItem'
import PostList from 'components/Post/PostList'
import {useTranslation} from 'react-i18next'

interface Props{
  profile: ProfileData,
  skill?: SkillData
}
const CardPosts = (props: Props) => {
  const { profile, skill} = props;
  const dispatch = useDispatch();
  const total = useSelector((state: IRootState) => state.profileGallery.total)
  const {t} = useTranslation('common');

  return (
    <Card className={styles.root} title={total > 0 ? t('cardPost.totalPosts', total) : t('menu.posts')}>
      <PostList profileId={profile.id}/>
    </Card>
  )
}

export default CardPosts
