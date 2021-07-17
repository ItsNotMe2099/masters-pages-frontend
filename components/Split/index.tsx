import CommentsSection from './CommentsSection'
import styles from './index.module.scss'
import OrderingSection from './OrderingSection'

interface Props {}

export default function Split(props: Props) {
  return (

    <>
      <div className={styles.root}>
        <CommentsSection/>
        <OrderingSection/>
      </div>
      <div className={styles.root__mobile}>
        <OrderingSection/>
        <CommentsSection/>
      </div>
    </>
  )
}
