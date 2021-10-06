import styles from './index.module.scss'
import Facebook from 'components/svg/Facebook'
import Instagram from 'components/svg/Instagram'
import {useTranslation} from 'i18n'
import Link from 'next/link'
import { CONTACTS } from 'types'
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
        <div className={styles.right}>
        <div className={styles.copyright}>
          {t('footer.copyright')}
        </div>
        <div className={styles.socials}>
          <div className={styles.items}>
          <a className={styles.socialItem} href={CONTACTS.instagram}><img src={'/img/Main/icons/instagram.svg'}/></a>
          <a className={styles.socialItem} href={CONTACTS.facebook}><img src={'/img/Main/icons/facebook.svg'}/></a>
          </div>
          <div>
        <Link href={`mailto:${CONTACTS.email}`}><a
          className={styles.mail}>{CONTACTS.email}</a></Link>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}
export default MainSectionFooter
