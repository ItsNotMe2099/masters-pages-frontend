import styles from './index.module.scss'

import {IRootState, ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import RecommendationListItem
  from 'components/PublicProfile/components/view/CardRecommendations/components/RecommendationListItem'
import {default as React, useEffect} from 'react'
import {fetchFeedbacksToProfileRequest, resetFeedbackList} from 'components/ProfileFeedback/actions'
import {setPageTaskUser} from 'components/TaskUser/actions'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import ReviewListItem from 'components/PublicProfile/components/view/CardReviews/components/ReviewListItem'
import { useSelector, useDispatch } from 'react-redux'
import {fetchProfileRecommendationList, setPageProfileRecommendation} from 'components/ProfileRecommendations/actions'

interface Props{
  profile: ProfileData
}
const CardRecommendations = (props: Props) => {
  const { profile } = props;
  const dispatch = useDispatch();
  const list = useSelector((state: IRootState) => state.profileRecommendation.list);
  const listLoading = useSelector((state: IRootState) => state.profileRecommendation.listLoading);
  const total = useSelector((state: IRootState) => state.profileRecommendation.total)
  const page = useSelector((state: IRootState) => state.profileRecommendation.page)
  const  limit = 30;

  useEffect(() => {
    dispatch(resetFeedbackList());
    dispatch(fetchProfileRecommendationList(profile.id, {
      page: 1,
      limit
    }))
  }, [profile])


  const handleScrollNext = () => {
    dispatch(setPageProfileRecommendation(page + 1))
    dispatch(fetchProfileRecommendationList(profile.id, {
      page: page + 1,
      limit
    }));
  }

  return (
    <Card className={styles.root} title={total > 0 ? `Recommended by (${total})` : 'Recommended by'}>
      {(listLoading && total === 0) && <Loader/>}
      <div className={styles.list}>
      {total > 0 && <InfiniteScroll
        dataLength={list.length} //This is important field to render the next data
        next={handleScrollNext}
        className={styles.list}
        hasMore={total > list.length}
        loader={listLoading ? <Loader/> : null}>
        {list.map((item, index) => <RecommendationListItem model={item} />)}
      </InfiniteScroll>}
      </div>
    </Card>
  )
}

export default CardRecommendations
