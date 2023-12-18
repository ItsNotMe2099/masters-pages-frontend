import Item from './Item'
import SmartPhone from './SmartPhone'
import styles from './index.module.scss'

interface Props {

}

export default function HowToJoin(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        HOW TO JOIN
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <Item number={1} title='Download MastersPages APP'>
            <div className={styles.first}>
              <SmartPhone image='/img/New Page/phone1.png' text='IOS' textClass={styles.phoneText} />
            </div>
          </Item>
        </div>
      </div>
    </div>
  )
}
