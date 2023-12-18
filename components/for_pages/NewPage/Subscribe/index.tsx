import DotsSvg from 'components/svg/DotsSvg'
import SubscribeForm from './Form'
import styles from './index.module.scss'
import Dots2Svg from 'components/svg/Dots2Svg'

interface Props {

}

export default function Subscribe(props: Props) {

  return (
    <div className={styles.root}>
      <DotsSvg className={styles.dotsLeft} color='#147C9C' />
      <Dots2Svg className={styles.dotsRight} color='#147C9C' />
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
