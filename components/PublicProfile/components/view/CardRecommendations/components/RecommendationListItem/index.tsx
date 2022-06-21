import styles from './index.module.scss'

import {IProfileRecommendation} from 'types'
import Avatar from 'components/ui/Avatar'
import {format} from 'date-fns'

interface Props{
  model: IProfileRecommendation
}
const RecommendationListItem = ({model}: Props) => {

  return (
    <div className={styles.root}>
      <Avatar size={'exSquare'} image={model.profileThatRecommends.photo}/>
      <div className={styles.name}>{model.profileThatRecommends.firstName} {model.profileThatRecommends.lastName}</div>
      <div className={styles.date}>{format(new Date(model.createdAt), 'dd.MM.yyyy')}</div>
    </div>
  )
}

export default RecommendationListItem
