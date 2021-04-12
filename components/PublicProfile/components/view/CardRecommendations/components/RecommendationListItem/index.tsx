import styles from './index.module.scss'

import {IProfileRecommendation, ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import LocationIcon from 'components/svg/LocationIcon'
import UserIcon from 'components/svg/UserIcon'
import Avatar from 'components/ui/Avatar'
import {format} from 'date-fns'

interface Props{
  model: IProfileRecommendation
}
const RecommendationListItem = ({model}: Props) => {

  return (
    <div className={styles.root}>
      <Avatar size={'square'}/>
      <div className={styles.name}>{model.recommendedProfile.firstName} {model.recommendedProfile.lastName}</div>
      <div className={styles.date}>{format(new Date(model.createdAt), 'dd.mm.yyyy')}</div>
    </div>
  )
}

export default RecommendationListItem
