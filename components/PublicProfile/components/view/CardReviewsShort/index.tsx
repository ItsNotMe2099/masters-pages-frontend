import styles from './index.module.scss'
import { IRootState, SkillData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import {useEffect} from 'react'
import {fetchFeedbacksToProfileShortRequest} from 'components/ProfileFeedback/actions'
import { useSelector, useDispatch } from 'react-redux'
import ReviewShortListItem
  from 'components/PublicProfile/components/view/CardReviewsShort/components/ReviewShortListItem'
import { useTranslation } from 'next-i18next'
import {IProfile} from 'data/intefaces/IProfile'
import Routes from "pages/routes";

interface Props{
  profile: IProfile,
  subCategory: SkillData
}
const CardReviewsShort = (props: Props) => {
  const { profile, subCategory } = props
  const list = useSelector((state: IRootState) => state.profileFeedback.listShort)
  const listLoading = useSelector((state: IRootState) => state.profileFeedback.isLoadingShort)
  const total = useSelector((state: IRootState) => state.profileFeedback.totalShort)
  const dispatch = useDispatch()
  const {i18n, t} = useTranslation('common')

  useEffect(() => {
    dispatch(fetchFeedbacksToProfileShortRequest(profile.id, subCategory?.subCategoryId))
  }, [profile, subCategory])
  return (
    <Card isHidden={total === 0} className={styles.root} title={total > 0 ?  t('cardReviewsShort.reviewsTotal', {total}) : t('cardReviewsShort.reviews')}>

      {!listLoading && list.map(item => <ReviewShortListItem feedback={item}/>)}
      {total > 0 && <a  className={styles.seeAll} href={`${Routes.profile(profile)}/reviews${subCategory ? `?subCategoryId=${subCategory.subCategoryId}` : ''}`}>{t('cardRecommenadationShort.seeAll')}</a>}
    </Card>
  )
}

export default CardReviewsShort
