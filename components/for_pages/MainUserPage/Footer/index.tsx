import styles from 'components/for_pages/MainUserPage/Footer/index.module.scss'
import AppStoreSvg from 'components/svg/AppStoreSvg'
import GooglePlaySvg from 'components/svg/GooglePlaySvg'
import LogoSvg from 'components/svg/LogoSvg'
import NewFbSvg from 'components/svg/NewFbSvg'
import NewInstSvg from 'components/svg/NewInstSvg'
import { format } from 'date-fns'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { CONTACTS } from 'types'

interface Props {

}

const MainSectionFooter = (props: Props) => {
  const { t } = useTranslation()
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <LogoSvg />
            <div className={styles.text}>
              Masters<br /><span>Pages</span>
            </div>
          </div>
          <div className={styles.copyright}>
            Master pages. {format(new Date(), 'yyyy')}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.socials}>
            <a href={CONTACTS.facebook}><NewFbSvg /></a>
            <a href={CONTACTS.instagram}><NewInstSvg /></a>
          </div>
          <div className={styles.apps}>
            <a href={CONTACTS.appStore}><AppStoreSvg /></a>
            <a href={CONTACTS.googlePlay}><GooglePlaySvg /></a>
          </div>
          <Link href={'mailto:admin@masterspages.com'}>
            admin@masterspages.com
          </Link>
        </div>
      </div>
    </div>
  )
}
export default MainSectionFooter
