import Modals from "components/layout/Modals";
import Facebook from 'components/svg/Facebook'
import Telegram from 'components/svg/Telegram'
import VK from 'components/svg/VK'
import WhatsApp from 'components/svg/WhatsApp'
import Link from 'next/link'
import BannerFooter from './BannerFooter'
import Logo from 'components/Logo'
import styles from './index.module.scss'
import format from 'date-fns/format'
import {useTranslation, withTranslation, Trans} from "react-i18next";
interface Props {
}

export default function Footer(props: Props) {

  const { t } = useTranslation('common');
  const renderSocials = () => {
    return <div className={styles.social}>
        <a href="#" target="_blank"><WhatsApp className={styles.whatsapp}/></a>
        <a href="#" target="_blank"><Telegram className={styles.telegram}/></a>

        <a href="#" target="_blank"><Facebook className={styles.facebook}/></a>
        <a href="#" target="_blank"><VK className={styles.vk}/></a>
    </div>
  }
  return (
    <div className={styles.root}>
      <BannerFooter/>
      <div className={styles.footerBottom}>

        <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <Logo/>
          <div className={styles.text}>Master pages. {format(new Date(), 'Y')}</div>
        </div>
          <div className={styles.socialMobile}>{renderSocials()}</div>
        </div>
        <div className={styles.menu}>
          <ul className={styles.links}>
            <li><Link href="/"><a>{t('newOrder')}</a></Link></li>
            <li><Link href="/"><a>{t('footer.allServices')}</a></Link></li>
            <li><Link href="/"><a>{t('footer.allReviews')}</a></Link></li>
            <li><Link href="/"><a>{t('footer.serviceHistory')}</a></Link></li>
            <li><Link href="/"><a>{t('footer.conditions')}</a></Link></li>
            <li><Link href="/"><a>{t('footer.mobile')}</a></Link></li>
          </ul>
          <ul className={styles.links}>
            <li><Link href="/"><a>{t('newOrder')}</a></Link></li>
            <li><Link href="/"><a>{t('footer.allServices')}</a></Link></li>
            <li><Link href="/"><a>{t('footer.allReviews')}</a></Link></li>
            <li><Link href="/"><a>{t('footer.serviceHistory')}</a></Link></li>
            <li><Link href="/"><a>{t('footer.conditions')}</a></Link></li>
            <li><Link href="/"><a>{t('footer.mobile')}</a></Link></li>
          </ul>
          <ul className={styles.links}>
            <li><Link href="/"><a>{t('newOrder')}</a></Link></li>
            <li><Link href="/"><a>{t('footer.allServices')}</a></Link></li>
            <li><Link href="/"><a>{t('footer.allReviews')}</a></Link></li>
            <li><Link href="/"><a>{t('footer.serviceHistory')}</a></Link></li>
            <li><Link href="/"><a>{t('footer.conditions')}</a></Link></li>
            <li><Link href="/"><a>{t('footer.mobile')}</a></Link></li>
          </ul>
        </div>
        <div className={styles.socialDesktop}>{renderSocials()}</div>

      </div>
      <Modals/>
    </div>
  )
}
