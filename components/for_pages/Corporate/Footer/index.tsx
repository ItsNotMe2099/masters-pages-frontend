import styles from 'components/for_pages/Corporate/Footer/index.module.scss'
import { useTranslation } from 'next-i18next'
import { CONTACTS } from 'types'
interface Props{

}

const MainSectionFooter = (props: Props) => {
  const {t} = useTranslation()
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
          <a className={styles.socialItem} href={CONTACTS.facebook}><img src={'/img/MainVolunteer/icons/facebook.svg'}/></a>
          </div>
          <div className={styles.mail}>
        <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email} </a>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}
export default MainSectionFooter
