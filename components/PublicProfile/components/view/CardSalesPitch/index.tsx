import styles from './index.module.scss'

import {ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'

interface Props{
  profile: ProfileData
}
const CardSalesPitch = (props: Props) => {
  const { profile } = props;
  const media = 'img.png'

  return (
    <Card className={styles.root} title={'Sales Pitch'}>
      <div className={styles.leftColumn}>
      <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus at et maecenas ullamcorper condimentum nullam sed. Congue odio pulvinar libero habitant lorem metus.

        Amet, sed et pulvinar ut aliquet tempor. Turpis at massa ac ultricies. Orci in velit, eget mauris mus. Porttitor porttitor.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.

        Tellus at et maecenas ullamcorper condimentum nullam </div>
      <div className={styles.rate}></div>
      </div>
      <div className={styles.rightColumn}>
      </div>
    </Card>
  )
}

export default CardSalesPitch
