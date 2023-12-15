import styles from './index.module.scss'
import SpeakerSvg from 'components/svg/SpeakerSvg'

interface Props {
  title: string
  text: string
}

export default function Card(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <SpeakerSvg color='#1A9AC1' />
      </div>
      <div className={styles.title}>
        {props.title}
      </div>
      <div className={styles.text}>
        {props.text}
      </div>
    </div>
  )
}
