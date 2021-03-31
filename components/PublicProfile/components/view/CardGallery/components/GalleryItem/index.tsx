import styles from './index.module.scss'

import {ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import LocationIcon from 'components/svg/LocationIcon'
import UserIcon from 'components/svg/UserIcon'

interface Props{

}
const GalleryItem = (props: Props) => {

  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={'/img/tmp/gallery_item.png'}/>
      </div>
      <div className={styles.info}>
        <div className={styles.details}>
          <div className={styles.title}>My new logo</div>
          <div className={styles.description}>sds ds dsdsds ds ds</div>
        </div>
        <div className={styles.stat}></div>
      </div>
    </div>
  )
}

export default GalleryItem
