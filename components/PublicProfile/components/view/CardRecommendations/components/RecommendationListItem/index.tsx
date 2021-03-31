import styles from './index.module.scss'

import {ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import LocationIcon from 'components/svg/LocationIcon'
import UserIcon from 'components/svg/UserIcon'

interface Props{
  profile: ProfileData
}
const RecommendationListItem = (props: Props) => {

  return (
    <div className={styles.root}>
      <UserIcon  />
      <div className={styles.name}>{props.profile.firstName} {props.profile.lastName}</div>
    </div>
  )
}

export default RecommendationListItem
