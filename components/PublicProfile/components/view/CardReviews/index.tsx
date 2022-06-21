import styles from './index.module.scss'
import { IRootState, SkillData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import {default as React, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchFeedbacksToProfileRequest, resetFeedbackList, setPageFeedback} from 'components/ProfileFeedback/actions'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import ReviewListItem from 'components/PublicProfile/components/view/CardReviews/components/ReviewListItem'
import { useTranslation } from 'next-i18next'
import {IProfile} from 'data/intefaces/IProfile'

interface Props{
  profile: IProfile,
  skill?: SkillData
}
const CardReviews = (props: Props) => {
  const { profile, skill} = props
  const dispatch = useDispatch()
  const list = useSelector((state: IRootState) => state.profileFeedback.list)
  const listLoading = useSelector((state: IRootState) => state.profileFeedback.isLoading)
  const total = useSelector((state: IRootState) => state.profileFeedback.total)
  const page = useSelector((state: IRootState) => state.profileFeedback.page)
  const  limit = 30
  const { t } = useTranslation('common')
  useEffect(() => {
    dispatch(resetFeedbackList())
    dispatch(fetchFeedbacksToProfileRequest({
      profileId: profile.id,
    ...(skill ? {subCategoryId: skill.id} : {}),
      page: 1,
      limit
    }))
  }, [skill])



  const handleScrollNext = () => {
    dispatch(setPageFeedback(page + 1))
    dispatch(fetchFeedbacksToProfileRequest({
      profileId: profile.id,
      ...(skill ? {subCategoryId: skill.id} : {}),
      page: page + 1,
      limit
    }))
  }

  return (
    <Card className={styles.root} title={total > 0 ? `${t('personalArea.profile.reviews')} (${total})` : t('personalArea.profile.reviews')}>
      {(listLoading && total === 0) && <Loader/>}
      {total > 0 && <InfiniteScroll
        dataLength={list.length} //This is important field to render the next data
        next={handleScrollNext}
        className={styles.list}
        hasMore={total > list.length}
        loader={listLoading ? <Loader/> : null}>
        {list.map((item, index) => <ReviewListItem feedback={item} />)}
      </InfiniteScroll>}
    </Card>
  )
}

export default CardReviews
