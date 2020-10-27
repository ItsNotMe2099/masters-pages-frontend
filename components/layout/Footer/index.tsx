import Facebook from 'components/svg/Facebook'
import Telegram from 'components/svg/Telegram'
import VK from 'components/svg/VK'
import WhatsApp from 'components/svg/WhatsApp'
import Link from 'next/link'
import BannerFooter from './BannerFooter'
import Logo from 'components/Logo'
import styles from './index.module.scss'

interface Props {}

export default function Footer(props: Props) {

  return (
    <>
    <BannerFooter/>
    <div className={styles.root}>
      <div className={styles.logo}>
        <Logo/>
        <div className={styles.text}>Master pages. 2020</div>
      </div>
      <ul className={styles.links}>
        <li><Link href="/"><a>Новый заказ</a></Link></li>
        <li><Link href="/"><a>Все услуги</a></Link></li>
        <li><Link href="/"><a>Все отзывы</a></Link></li>
        <li><Link href="/"><a>Истории заказов</a></Link></li>
        <li><Link href="/"><a>Условия использования</a></Link></li>
        <li><Link href="/"><a>Мобильная версия</a></Link></li>
      </ul>
      <ul className={styles.links}>
        <li><Link href="/"><a>Новый заказ</a></Link></li>
        <li><Link href="/"><a>Все услуги</a></Link></li>
        <li><Link href="/"><a>Все отзывы</a></Link></li>
        <li><Link href="/"><a>Истории заказов</a></Link></li>
        <li><Link href="/"><a>Условия использования</a></Link></li>
        <li><Link href="/"><a>Мобильная версия</a></Link></li>
      </ul>
      <ul className={styles.links}>
        <li><Link href="/"><a>Новый заказ</a></Link></li>
        <li><Link href="/"><a>Все услуги</a></Link></li>
        <li><Link href="/"><a>Все отзывы</a></Link></li>
        <li><Link href="/"><a>Истории заказов</a></Link></li>
        <li><Link href="/"><a>Условия использования</a></Link></li>
        <li><Link href="/"><a>Мобильная версия</a></Link></li>
      </ul>
      <div className={styles.social}>
        <div className={styles.messengers}>
          <a href="#" target="_blank"><WhatsApp className={styles.whatsapp}/></a>
          <a href="#" target="_blank"><Telegram className={styles.telegram}/></a>
        </div>
        <div className={styles.networks}>
          <a href="#" target="_blank"><Facebook className={styles.facebook}/></a>
          <a href="#" target="_blank"><VK className={styles.vk}/></a>
        </div>
      </div>
    </div>
    <div className={styles.root__mobile}>
      <div className={styles.topMobile}>
        <div className={styles.logo}>
          <Logo/>
          <div className={styles.text}>Master pages. 2020</div>
        </div>
        <div className={styles.social}>
          <div className={styles.messengers}>
            <a href="#" target="_blank"><WhatsApp className={styles.whatsapp}/></a>
            <a href="#" target="_blank"><Telegram className={styles.telegram}/></a>
          </div>
          <div className={styles.networks}>
            <a href="#" target="_blank"><Facebook className={styles.facebook}/></a>
            <a href="#" target="_blank"><VK className={styles.vk}/></a>
          </div>
        </div>
      </div>
      <div className={styles.linksMobile}>
        <ul className={styles.links}>
          <li><Link href="/"><a>Новый заказ</a></Link></li>
          <li><Link href="/"><a>Все услуги</a></Link></li>
          <li><Link href="/"><a>Все отзывы</a></Link></li>
          <li><Link href="/"><a>Истории заказов</a></Link></li>
          <li><Link href="/"><a>Условия использования</a></Link></li>
          <li><Link href="/"><a>Мобильная версия</a></Link></li>
        </ul>
        <ul className={styles.links}>
          <li><Link href="/"><a>Новый заказ</a></Link></li>
          <li><Link href="/"><a>Все услуги</a></Link></li>
          <li><Link href="/"><a>Все отзывы</a></Link></li>
          <li><Link href="/"><a>Истории заказов</a></Link></li>
          <li><Link href="/"><a>Условия использования</a></Link></li>
          <li><Link href="/"><a>Мобильная версия</a></Link></li>
        </ul>
      </div>
      <ul className={styles.links}>
        <li><Link href="/"><a>Новый заказ</a></Link></li>
        <li><Link href="/"><a>Все услуги</a></Link></li>
        <li><Link href="/"><a>Все отзывы</a></Link></li>
        <li><Link href="/"><a>Истории заказов</a></Link></li>
        <li><Link href="/"><a>Условия использования</a></Link></li>
        <li><Link href="/"><a>Мобильная версия</a></Link></li>
      </ul>
    </div>
    </>
  )
}
