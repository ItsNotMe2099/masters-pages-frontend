import { CONTACTS } from 'types'
import Item from './Item'
import SmartPhone from './SmartPhone'
import styles from './index.module.scss'
import AppStoreSvg from 'components/svg/AppStoreSvg'
import GooglePlaySvg from 'components/svg/GooglePlaySvg'

interface Props {

}

export default function HowToJoin(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          HOW TO JOIN
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <Item number={1} title='Download MastersPages APP'>
              <div className={styles.first}>
                <SmartPhone className={styles.smartPhoneFirst} image='/img/New Page/phone1.png' text='IOS' textClass={styles.phoneText} />
                <SmartPhone image='/img/New Page/phone2.png' text='Android' textClass={styles.phoneText} />
              </div>
              <div className={styles.download}>
                <div className={styles.now}>Download App Now:</div>
                <div className={styles.apps}>
                  <a href={CONTACTS.appStore}><AppStoreSvg /></a>
                  <a href={CONTACTS.googlePlay}><GooglePlaySvg /></a>
                </div>
              </div>
            </Item>
            <Item number={2} title='Setup your volunteer profile'>
              <div className={styles.first}>
                <SmartPhone className={styles.smartPhoneSecond} image='/img/New Page/phone3.png'
                  text='Follow individual account registration procedure'
                  textClass={styles.phoneText} />
                <SmartPhone image='/' text='Android' textClass={styles.phoneText} />
              </div>
            </Item>
          </div>
        </div>
      </div>
    </div>
  )
}
