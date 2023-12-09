import styles from 'components/for_pages/MainUserPage/Footer/index.module.scss'
import LogoSvg from 'components/svg/LogoSvg'
import { format } from 'date-fns'
import { useTranslation } from 'next-i18next'
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
          <Link href={'mailto:admin@masterspages.com'}>
            admin@masterspages.com
          </Link>
        </div>
      </div>
    </div>
  )
}
export default MainSectionFooter
