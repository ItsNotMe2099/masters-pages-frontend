import styles from './index.module.scss'

import {ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'

interface Props{
  name: string
  code: string
}
const LanguageListItem = (props: Props) => {
  const { name, code } = props;
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={`/img/icons/flags/${code}.svg`} alt=''/>
      <div className={styles.name}>{name}</div>
    </div>
  )
}

export default LanguageListItem
