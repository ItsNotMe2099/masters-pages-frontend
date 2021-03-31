import styles from './index.module.scss'

import {ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import WorkInListItem from 'components/PublicProfile/components/view/CardPreferWorkIn/components/WorkInListItem'

interface Props{
  profile: ProfileData
}
const CardPreferWorkIn = (props: Props) => {
  const {profile} = props;
  const list = [
    {type: 'address', name: "1212 dsdsdw ewew ewqe"},
    {type: 'address', name: "1212 dsdsdw ewew ewqe"},
    {type: 'online', name: 'English', code: 'EN'},
  ]
  return (
    <Card className={styles.root} title={'Prefer to work in'}>
      {list.map(item => <WorkInListItem name={item.name} type={item.type}/>)}
    </Card>
  )
}

export default CardPreferWorkIn
