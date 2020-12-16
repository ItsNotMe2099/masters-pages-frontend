import styles from './index.module.scss'
import SimpleSlider from './Slider'

interface Props {}

export default function Instruction(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.title}>Как это работает?</div>
      <div className={styles.images}>
        <img className={styles.waveLeft} src='/img/icons/wave1.svg' alt=''/>
        <img className={styles.waveRight} src='/img/icons/wave2.svg' alt=''/>
        <div className={styles.columnItem}>
          <img className={styles.icon} src='/img/icons/form1.svg' alt=''/>
          <div className={styles.text}>Заполните<br/> критерии подбора</div>
        </div>
        <div className={styles.waveContainer}><img className={styles.wave__mobile} src='/img/icons/waveMobile.svg' alt=''/></div>
        <div className={styles.columnItem}>
          <img className={styles.icon} src='/img/icons/form2.svg' alt=''/>
          <div className={styles.text}>Посмотрите анкеты<br/> подобранных специалистов</div>
        </div>
        <div className={styles.waveContainer}><img className={styles.wave__mobile} src='/img/icons/waveMobile2.svg' alt=''/></div>
        <div className={styles.columnItem}>
          <img className={styles.icon} src='/img/icons/chat.svg' alt=''/>
          <div className={styles.text}>Общайтесь в чате<br/> и выберите подходящего</div>
        </div>
      </div>
      <SimpleSlider/>
    </div>
  )
}
