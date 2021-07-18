import styles from './index.module.scss'

import {IRootState, ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import RecommendationListItem
  from 'components/PublicProfile/components/view/CardRecommendations/components/RecommendationListItem'
import {useEffect} from 'react'
import {fetchFeedbacksToProfileShortRequest} from 'components/ProfileFeedback/actions'
import { useSelector, useDispatch } from 'react-redux'
import ReviewShortListItem
  from 'components/PublicProfile/components/view/CardReviewsShort/components/ReviewShortListItem'
import RecommendationListItemShort
  from 'components/PublicProfile/components/view/CardRecommendationsShort/components/RecommendationListItemShort'
import {fetchProfileRecommendationShortList} from 'components/ProfileRecommendations/actions'
import {useTranslation} from 'react-i18next'

interface Props{
  profile: ProfileData,
}
const CardRecommendationsShort = (props: Props) => {
  const { profile } = props;
  const list = useSelector((state: IRootState) => state.profileRecommendation.listShort);
  const listLoading = useSelector((state: IRootState) => state.profileRecommendation.listShortLoading);
  const total = useSelector((state: IRootState) => state.profileRecommendation.totalShort)
  const dispatch = useDispatch();
  const {i18n, t} = useTranslation('common')

  useEffect(() => {
    dispatch(fetchProfileRecommendationShortList(profile.id));
  }, [profile])
  return (
    <Card isHidden={total === 0} className={styles.root} title={total > 0 ? t('cardRecommenadationShort.recommendationsTotal', total) : t('cardRecommenadationShort.recommendations')}>
      {/*list.map(item => <RecommendationListItem profile={item}/>)*/}
      {!listLoading && list.map(item => <RecommendationListItemShort model={item}/>)}
      {total > 0 && <a  className={styles.seeAll} href={`/id${profile.id}/Recommendations`}>{t('cardRecommenadationShort.seeAll')}</a>}
    </Card>
  )
}

export default CardRecommendationsShort
