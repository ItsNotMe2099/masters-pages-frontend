import Button from 'components/ui/Button'
import styles from './index.module.scss'
import {useTranslation, withTranslation, Trans} from "react-i18next";

interface Props {}

export default function BannerFooter(props: Props) {
  const { t } = useTranslation('common');
  return (
    <div className={styles.root}>
      <Trans i18nKey="footer.banner.earn" className={styles.text}>Заработайте на том,<br/>что делаете лучше всех</Trans>
      <div className={styles.text__mobile}>{t('footer.banner.earnMobile')}</div>
      <div className={styles.icon}>
        <div className={styles.wrapper}>
          <img className={styles.woman} src='/img/Footer/woman.png' alt=''/>
        </div>
      </div>
      <Button mediumFont black size="20px 0">{t('footer.banner.executor')}</Button>
    </div>
  )
}
