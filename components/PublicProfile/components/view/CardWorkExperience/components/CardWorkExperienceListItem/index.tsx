import styles from './index.module.scss'

import {ProfileData} from 'types'
import UserIcon from 'components/svg/UserIcon'
import Button from 'components/PublicProfile/components/Button'

interface Props{

}
const CardWorkExperienceListItem = (props: Props) => {

  return (
    <div className={styles.root}>
      <div className={styles.leftColumn}>
        <img src={''}/>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.experience}>
          <div className={styles.position}>Marketing expert</div>
          <div className={styles.dates}> from 07.09.19 - 02.06.20 - 2 years</div>
        </div>
        <div className={styles.company}>Starbucks co.</div>
        <div className={styles.description}></div>
        <div className={styles.actions}>
        <Button href={'https://yandex.ru'} size={'small'}>Visit website</Button>
        </div>
      </div>
    </div>
  )
}

export default CardWorkExperienceListItem
