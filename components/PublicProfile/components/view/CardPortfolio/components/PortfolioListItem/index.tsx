import styles from './index.module.scss'

import {ProfileData} from 'types'
import UserIcon from 'components/svg/UserIcon'
import Button from 'components/PublicProfile/components/Button'

interface Props{

}
const PortfolioListItem = (props: Props) => {

  return (
    <div className={styles.root}>
      <div className={styles.leftColumn}>
        <img src={''}/>
      </div>
      <div className={styles.centerColumn}>
        <div className={styles.header}>
          <div className={styles.name}>Marketing expert</div>
          <div className={styles.duration}> from 07.09.19 - 02.06.20 - 2 years</div>
        </div>
        <div className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lobortis consequat quis pulvinar suspendisse. Sed eu amet, auctor fermentum posuere convallis.

        </div>
        <div className={styles.actions}>
        <Button href={'https://yandex.ru'} size={'small'}>Visit website</Button>
        </div>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.filesTitle}>Attached files</div>
        <div className={styles.files}>
        <div className={styles.file}><img src={'/img/icons/file_types/psd.svg'}/> <div className={styles.fileName}>Source.psd</div></div>
        <div className={styles.file}><img src={'/img/icons/file_types/pdf.svg'}/> <div className={styles.fileName}>Source.pdf</div></div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioListItem
