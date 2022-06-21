import styles from './index.module.scss'

import Card from 'components/PublicProfile/components/Card'
import RewardsListItem from 'components/PublicProfile/components/view/CardRewards/components/RewardsListItem'
import {IProfile} from 'data/intefaces/IProfile'

interface Props{
  profile: IProfile
}
const CardRewards = (props: Props) => {
  const { profile } = props
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
