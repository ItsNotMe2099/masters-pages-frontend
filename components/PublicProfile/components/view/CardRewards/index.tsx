import styles from './index.module.scss'

import {ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import RewardsListItem from 'components/PublicProfile/components/view/CardRewards/components/RewardsListItem'

interface Props{
  profile: ProfileData
}
const CardRewards = (props: Props) => {
  const { profile } = props;
  const list = [
    {name: 'fdf dfd fdf'},
    {name: 'fdf dfd fdf'},
    {name: 'fdf dfd fdf'},
  ]
  return (
    <Card className={styles.root} title={'Badges/Rewards'}>
      {list.map(item => <RewardsListItem name={item.name}/>)}
    </Card>
  )
}

export default CardRewards
