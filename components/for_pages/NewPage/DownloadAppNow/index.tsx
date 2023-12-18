import Image from 'next/image'
import styles from './index.module.scss'
import { CONTACTS } from 'types'
import AppStoreSvg from 'components/svg/AppStoreSvg'
import GooglePlaySvg from 'components/svg/GooglePlaySvg'
import Item from './Item'
import DownloadSvg from 'components/svg/DownloadSvg'
import ThumbUpSvg from 'components/svg/ThumbUpSvg'
import StarSvg from 'components/svg/StarSvg'

interface Props {

}

export default function DownloadAppNow(props: Props) {

  return (
    <div className={styles.root}>
      <Image className={styles.img} src={'/img/New Page/Gravity-Scene-iPhone-12.png'} alt='' layout='fill' />
      <div className={styles.right}>
        <div className={styles.title}>
          Download App Now
        </div>
        <div className={styles.text}>
          Join projects that match your passions, log your hours, and receive valuable reviews. Stay connected with project coordinators through in-app chat, and share your meaningful journey through photo updates. Your volunteering experience, all in one place. Download our app and start making a difference today.
        </div>
        <div className={styles.apps}>
          <a href={CONTACTS.appStore}><AppStoreSvg /></a>
          <a href={CONTACTS.googlePlay}><GooglePlaySvg /></a>
        </div>
        <div className={styles.stats}>
          <Item icon={<DownloadSvg color='#DC2626' />} number='59865' text='Download' />
          <Item icon={<ThumbUpSvg color='#DC2626' />} number='29852' text='Like' />
          <Item icon={<StarSvg color='#DC2626' />} number='1500' text='5 star rating' />
        </div>
      </div>
    </div>
  )
}
