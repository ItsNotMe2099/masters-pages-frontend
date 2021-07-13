import styles from './index.module.scss'
import SimpleSlider from './Slider'
import {useTranslation, withTranslation, Trans} from "react-i18next";

interface Props {}

export default function Instruction(props: Props) {
  const { t } = useTranslation('common');
  return (
    <div className={styles.root}>
      <div className={styles.title}>{t('instruction.howItWorks')}</div>
      <div className={styles.images}>
        <img className={styles.waveLeft} src='/img/icons/wave1.svg' alt=''/>
        <img className={styles.waveRight} src='/img/icons/wave2.svg' alt=''/>
        <div className={styles.columnItem}>
          <img className={styles.icon} src='/img/icons/form1.svg' alt=''/>
          <Trans i18nKey="instruction.fill" className={styles.text}>Заполните<br/> критерии подбора/</Trans>
        </div>
        <div className={styles.waveContainer}><img className={styles.wave__mobile} src='/img/icons/waveMobile.svg' alt=''/></div>
        <div className={styles.columnItem}>
          <img className={styles.icon} src='/img/icons/form2.svg' alt=''/>
          <Trans i18nKey="instruction.see" className={styles.text}>Посмотрите анкеты<br/> подобранных специалистов</Trans>
        </div>
        <div className={styles.waveContainer}><img className={styles.wave__mobile} src='/img/icons/waveMobile2.svg' alt=''/></div>
        <div className={styles.columnItem}>
          <img className={styles.icon} src='/img/icons/chat.svg' alt=''/>
          <Trans i18nKey="instruction.communicate" className={styles.text}>Общайтесь в чате<br/> и выберите подходящего</Trans>
        </div>
      </div>
      <SimpleSlider/>
    </div>
  )
}
