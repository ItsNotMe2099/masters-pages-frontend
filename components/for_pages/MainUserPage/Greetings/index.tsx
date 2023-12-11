import { ReactElement } from 'react'
import Item from './Item'
import styles from './index.module.scss'
import Image from 'next/image'


interface Props {
  children?: ReactElement | ReactElement[]
  title: string
}

export default function Greetings(props: Props) {

  return (
    <div className={styles.root}>
      <Image className={styles.abstraction1} src={'/img/MainPage/abstraction1.png'} alt='' layout='fill' />
      <Image className={styles.abstraction2} src={'/img/MainPage/abstraction2.png'} alt='' layout='fill' />
      <div className={styles.container}>
        <div className={styles.title}>
          {props.title}
        </div>
        {props.children}
      </div>
    </div>
  )
}