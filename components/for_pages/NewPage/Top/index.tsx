import Image from 'next/image'
import styles from './index.module.scss'
import Content from './Content'

interface Props {

}

export default function Top(props: Props) {

  return (
    <div className={styles.root}>
      <Image src={'/img/New Page/top.png'} alt='' layout='fill' />
      <Content />
    </div>
  )
}
