import styles from './index.module.scss'

import {IProfileRecommendation} from 'types'
import UserIcon from 'components/svg/UserIcon'

interface Props{
  model: IProfileRecommendation
}
const RecommendationListItemShort = ({model}: Props) => {

  return (
    <div className={styles.root}>
      <UserIcon  />
      <div className={styles.name}>{model.profileThatRecommends.firstName} {model.profileThatRecommends.lastName}</div>
    </div>
  )
}

export default RecommendationListItemShort
