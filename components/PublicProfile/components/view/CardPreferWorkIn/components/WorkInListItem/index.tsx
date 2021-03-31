import styles from './index.module.scss'

import {ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import LocationIcon from 'components/svg/LocationIcon'

interface Props{
  name: string
  type: string
}
const WorkInListItem = (props: Props) => {
  const { name, type } = props;
  return (
    <div className={styles.root}>
      <LocationIcon className={type === 'online' ? styles.iconOnline : styles.icon} />
      <div className={`${styles.name} ${type === 'online' && styles.nameOnline}`}>{type === 'online' ? 'Online' : name}</div>
    </div>
  )
}

export default WorkInListItem
