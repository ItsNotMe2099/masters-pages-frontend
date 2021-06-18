import styles from './index.module.scss'

import {IProfilePortfolio, ProfileData, SkillData} from 'types'
import UserIcon from 'components/svg/UserIcon'
import Button from 'components/PublicProfile/components/Button'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import {getMediaPath} from 'utils/media'
import ProfileStatItemCard
  from 'components/PublicProfile/components/view/CardProfileStat/components/ProfileStatItemCard'
import {getCategoryTranslation} from 'utils/translations'

interface Props{
  model: SkillData,
  profile: ProfileData
}
const ProfileStatItem = ({model, profile}: Props) => {

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
        <div className={styles.category}>{getCategoryTranslation(model.category)?.name}</div>
        <div className={styles.subCategory}>{getCategoryTranslation(model.subCategory)?.name}</div>
        </div>
        <Button size={'small'} target={''} href={`/sk${model.id}`}>Learn more</Button>
      </div>
      <div className={styles.cards}>
        <ProfileStatItemCard value={model.tasksCount} label={'Works'} icon={'works'}/>
        <ProfileStatItemCard value={model.likesCount} label={'Likes'} icon={'likes'}/>
        <ProfileStatItemCard value={model.feedbacksCount} label={'Reviews'} icon={'star'}/>
        <ProfileStatItemCard value={model.totalHours || 'N/A'} label={'Hours'} icon={'star'}/>
        <ProfileStatItemCard value={model.rating || 'N/A'} label={'Works'} icon={'star'}/>
      </div>
    </div>
  )
}

export default ProfileStatItem
