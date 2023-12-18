import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  image: string
  text: string
  textClass?: string
}

export default function SmartPhone(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.img}>
        <Image className={styles.image} src={'/img/New Page/iphone 1.png'} alt='' layout='fill' />
        <Image className={styles.imageInner} src={props.image} alt='' layout='fill' />
      </div>
      <div className={classNames(styles.text, props.textClass)}>
        {props.text}
      </div>
    </div>
  )
}
