import styles from './index.module.scss'

import {IRootState} from 'types'
import Card from 'components/PublicProfile/components/Card'

import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import RecommendationListItemShort
  from 'components/PublicProfile/components/view/CardRecommendationsShort/components/RecommendationListItemShort'
import {fetchProfileRecommendationShortList} from 'components/ProfileRecommendations/actions'
import { useTranslation } from 'next-i18next'
import {IProfile} from 'data/intefaces/IProfile'

interface Props{
  profile: IProfile,
}
const CardRecommendationsShort = (props: Props) => {
  const { profile } = props
  const list = useSelector((state: IRootState) => state.profileRecommendation.listShort)
  const listLoading = useSelector((state: IRootState) => state.profileRecommendation.listShortLoading)
  const total = useSelector((state: IRootState) => state.profileRecommendation.totalShort)
  const dispatch = useDispatch()
  const {i18n, t} = useTranslation('common')

  useEffect(() => {
    dispatch(fetchProfileRecommendationShortList(profile.id))
  }, [profile])
  return (
    <Card isHidden={total === 0} className={styles.root} title={total > 0 ? t('cardRecommenadationShort.recommendationsTotal', {total}) : t('cardRecommenadationShort.recommendations')}>
      {/*list.map(item => <RecommendationListItem profile={item}/>)*/}
      {!listLoading && list.map(item => <RecommendationListItemShort model={item}/>)}
      {total > 0 && <a  className={styles.seeAll} href={`/id${profile.id}/recommendations`}>{t('cardRecommenadationShort.seeAll')}</a>}
    </Card>
  )
}

export default CardRecommendationsShort
