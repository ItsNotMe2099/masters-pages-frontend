import styles from './index.module.scss'
import {IFeedbacksToProfile, IRootState, ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import {useEffect} from 'react'
import {fetchFeedbacksToProfileShortRequest} from 'components/ProfileFeedback/actions'
import { useSelector, useDispatch } from 'react-redux'
import ReviewShortListItem
  from 'components/PublicProfile/components/view/CardReviewsShort/components/ReviewShortListItem'

interface Props{
  profile: ProfileData
}
const CardReviewsShort = (props: Props) => {
  const { profile } = props;
  const list = useSelector((state: IRootState) => state.profileFeedback.listShort);
  const listLoading = useSelector((state: IRootState) => state.profileFeedback.isLoadingShort);
  const total = useSelector((state: IRootState) => state.profileFeedback.totalShort)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedbacksToProfileShortRequest(profile.id));
  }, [profile])
  return (
    <Card isHidden={total === 0} className={styles.root} title={total > 0 ?  `Reviews (${total})` : 'Reviews'}>

      {!listLoading && list.map(item => <ReviewShortListItem feedback={item}/>)}
      {total > 0 && <a  className={styles.seeAll} href={`/PublicProfile/${profile.id}/Recommendations`}>See all</a>}
    </Card>
  )
}

export default CardReviewsShort
