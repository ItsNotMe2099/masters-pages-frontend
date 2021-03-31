import styles from './index.module.scss'

import {ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'

interface Props{
  profile: ProfileData
}
const CardBio = (props: Props) => {
  const {profile} = props;
  return (
    <Card className={styles.root} title={'BIO'}>
      {profile.bio?.bio}
    </Card>
  )
}

export default CardBio
