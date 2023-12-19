import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import { ReactElement } from 'react'

interface Props {
  image: string
  text: string | ReactElement
  textClass?: string
  className?: string
  type2?: boolean
}

export default function SmartPhone(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.img}>
        {/*<Image className={styles.image} src={props.type2 ? '/img/New Page/iphone2.png' : '/img/New Page/iphone1.png'}
          alt='' layout='fill' />*/}
        <Image className={styles.image} src={props.image} alt='' layout='fill' />
      </div>
      <div className={classNames(styles.text, props.textClass)}>
        {props.text}
      </div>
    </div>
  )
}
