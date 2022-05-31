import styles from './index.module.scss'

import {IRootState} from 'types'
import Card from 'components/PublicProfile/components/Card'
import RecommendationListItem
  from 'components/PublicProfile/components/view/CardRecommendations/components/RecommendationListItem'
import {default as React, useEffect} from 'react'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchProfileRecommendationForProfileList,
  resetProfileRecommendationList,
  setPageProfileRecommendation
} from 'components/ProfileRecommendations/actions'
import { useTranslation } from 'next-i18next'
import {IProfile} from 'data/intefaces/IProfile'

interface Props{
  profile: IProfile
}
const CardRecommendations = (props: Props) => {
  const { profile } = props
  const dispatch = useDispatch()
  const list = useSelector((state: IRootState) => state.profileRecommendation.list)
  const listLoading = useSelector((state: IRootState) => state.profileRecommendation.listLoading)
  const total = useSelector((state: IRootState) => state.profileRecommendation.total)
  const page = useSelector((state: IRootState) => state.profileRecommendation.page)
  const  limit = 30
  const {i18n, t} = useTranslation('common')

  useEffect(() => {
    dispatch(resetProfileRecommendationList())
    dispatch(fetchProfileRecommendationForProfileList(profile.id, {
      page: 1,
      limit
    }))
  }, [profile])


  const handleScrollNext = () => {
    dispatch(setPageProfileRecommendation(page + 1))
    dispatch(fetchProfileRecommendationForProfileList(profile.id, {
      page: page + 1,
      limit
    }))
  }

  return (
    <Card className={styles.root} title={total > 0 ? t('cardRecommenadationShort.recommendationsTotal', {total}) : t('cardRecommenadationShort.recommendations')}>
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
