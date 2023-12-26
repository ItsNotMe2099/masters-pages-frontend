import Image from 'next/image'
import styles from './index.module.scss'
import Content from './Content'
import { useResize } from 'components/hooks/useResize'

interface Props {

}

export default function Top(props: Props) {

  const { isLPhoneWidth } = useResize()

  return (
    <div className={styles.root}>
      <Image src={isLPhoneWidth ? '/img/New Page/top-mobile.png' : '/img/New Page/top.png'} alt='' layout='fill' />
      <Content />
    </div>
  )
}
