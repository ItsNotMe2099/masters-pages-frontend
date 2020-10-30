import Facebook from 'components/svg/Facebook'
import Telegram from 'components/svg/Telegram'
import VK from 'components/svg/VK'
import WhatsApp from 'components/svg/WhatsApp'
import styles from './index.module.scss'
interface Props {
}

export default function Socials(props: Props) {
  return <div className={styles.root}>
    <a href="#" target="_blank"><WhatsApp className={styles.whatsapp}/></a>
    <a href="#" target="_blank"><Telegram className={styles.telegram}/></a>

    <a href="#" target="_blank"><Facebook className={styles.facebook}/></a>
    <a href="#" target="_blank"><VK className={styles.vk}/></a>
  </div>
}
