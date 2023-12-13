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
            <Link href={CONTACTS.facebook}>
              <a><NewFbSvg /></a>
            </Link>
            <Link href={CONTACTS.instagram}>
              <a><NewInstSvg /></a>
            </Link>
          </div>
          <div className={styles.apps}>
            <Link href={CONTACTS.appStore}>
              <a><AppStoreSvg /></a>
            </Link>
            <Link href={CONTACTS.googlePlay}>
              <a><GooglePlaySvg /></a>
            </Link>
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
