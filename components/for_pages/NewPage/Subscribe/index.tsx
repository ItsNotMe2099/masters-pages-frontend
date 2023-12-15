import SubscribeForm from './Form'
import styles from './index.module.scss'

interface Props {

}

export default function Subscribe(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        Stay Informed and Engaged
      </div>
      <div className={styles.text}>
        Subscribe to Our Newsletter for Exclusive Updates and Opportunities
      </div>
      <SubscribeForm />
    </div>
  )
}
