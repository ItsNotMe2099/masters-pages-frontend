import styles from './index.module.scss'

import {ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import RecommendationListItem
  from 'components/PublicProfile/components/view/CardRecommendations/components/RecommendationListItem'

interface Props{
  profile: ProfileData
}
const CardRecommendations = (props: Props) => {
  const { profile } = props;
  const list = [
    {firstName: 'Ivan', lastName: "Ivanov"},
    {type: 'Petr', lastName: "Petrov"},
    {type: 'Kirill', lastName: 'Ivanov'},
  ]
  return (
    <Card className={styles.root} title={'Recommendations'}>
      {list.map(item => <RecommendationListItem profile={item}/>)}
    </Card>
  )
}

export default CardRecommendations
