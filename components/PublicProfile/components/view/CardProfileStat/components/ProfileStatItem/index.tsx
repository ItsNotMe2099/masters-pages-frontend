import styles from './index.module.scss'

import { SkillData} from 'types'
import Button from 'components/PublicProfile/components/Button'
import ProfileStatItemCard
  from 'components/PublicProfile/components/view/CardProfileStat/components/ProfileStatItemCard'
import {getCategoryTranslation} from 'utils/translations'
import { useTranslation } from 'next-i18next'
import {IProfile} from 'data/intefaces/IProfile'


interface Props{
  model: SkillData,
  profile: IProfile
}
const ProfileStatItem = ({model, profile}: Props) => {
  const {i18n, t} = useTranslation('common')
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
        <div className={styles.category}>{getCategoryTranslation(model.mainCategory, i18n.language)?.name}/{getCategoryTranslation(model.category, i18n.language)?.name}</div>
        <div className={styles.subCategory}>{getCategoryTranslation(model.subCategory, i18n.language)?.name}</div>
        </div>
        <Button className={styles.btn} size={'small'} target={''} href={`/sk${model.id}`}>{t('cardProfile.stat.learnMore')}</Button>
      </div>
      <div className={styles.cards}>
        <ProfileStatItemCard value={model.tasksCount} label={t('works')} icon={'works'}/>
        <ProfileStatItemCard value={model.likesCount} label={t('likes')} icon={'likes'}/>
        <ProfileStatItemCard value={model.feedbacksCount} label={t('reviews')} icon={'star'}/>
        <ProfileStatItemCard value={model.totalHours || 'N/A'} label={t('hours')} icon={'star'}/>
        <ProfileStatItemCard value={model.rating || 'N/A'} label={t('cardProfile.stat.rating')} icon={'star'}/>
      </div>
    </div>
  )
}

export default ProfileStatItem
