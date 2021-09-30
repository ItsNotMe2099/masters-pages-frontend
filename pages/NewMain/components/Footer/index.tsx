import styles from './index.module.scss'
import Facebook from 'components/svg/Facebook'
import Instagram from 'components/svg/Instagram'
import {useTranslation} from 'i18n'
interface Props{

}

const MainSectionFooter = (props: Props) => {
  const {t} = useTranslation();
  return (
    <div  className={styles.root}>
      <div  className={styles.container}>
        <div className={styles.logo}>
          <img src={'/img/Main/logo_white.svg'}/>
          <div className={styles.logoTitle}>Masters<span> Pages</span></div>
        </div>
        <div className={styles.copyright}>
          {t('footer.copyright')}
        </div>
        <div className={styles.socials}>
          <a className={styles.socialItem} href={'https://www.instagram.com/masterspages'}><img src={'/img/Main/icons/instagram.svg'}/></a>
          <a className={styles.socialItem} href={'https://www.facebook.com/masterspages'}><img src={'/img/Main/icons/facebook.svg'}/></a>

        </div>
      </div>
    </div>
  )
}
export default MainSectionFooter
