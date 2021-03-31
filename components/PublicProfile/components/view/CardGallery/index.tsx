import styles from './index.module.scss'

import {ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import GalleryItem from 'components/PublicProfile/components/view/CardGallery/components/GalleryItem'

interface Props{
  profile: ProfileData
}
const CardGallery = (props: Props) => {
  const {profile} = props;
  return (
    <Card className={styles.root} title={'Gallery'}>
      <GalleryItem/>
      <GalleryItem/>
      <GalleryItem/>
      <GalleryItem/>
      <GalleryItem/>
      <GalleryItem/>
      <GalleryItem/>
    </Card>
  )
}

export default CardGallery
