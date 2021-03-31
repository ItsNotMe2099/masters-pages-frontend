import styles from './index.module.scss'

import {IFeedbacksToProfile, ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import ReviewListItem from 'components/PublicProfile/components/view/CardReviews/components/ReviewListItem'

interface Props{
  profile: ProfileData
}
const CardReviews = (props: Props) => {
  const { profile } = props;
  const list = [
    {fromProfile: {firstName: 'name', lastName: 'lastName'}, rating: 5, createdAt: '2020-02-04 14:43:00'},
    {fromProfile: {firstName: 'name', lastName: 'lastName'}, rating: 5, createdAt: '2020-02-04 14:43:00'},
    {fromProfile: {firstName: 'name', lastName: 'lastName'}, rating: 5, createdAt: '2020-02-04 14:43:00'},
  ];
  return (
    <Card className={styles.root} title={'Reviews'}>
      {list.map(item => <ReviewListItem feedback={item as IFeedbacksToProfile}/>)}
    </Card>
  )
}

export default CardReviews
