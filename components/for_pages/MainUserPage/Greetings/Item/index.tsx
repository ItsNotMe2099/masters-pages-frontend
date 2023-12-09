import styles from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import Link from 'next/link'


interface Props {
  color: string
  image: string
  text: string
  textClass?: string
  light: string
  link: string
}

export default function Item(props: Props) {

  return (
    <Link href={props.link}>
      <a className={styles.root} style={{ backgroundColor: `${props.color}` }}>
        <div className={styles.people}><Image src={props.image} alt='' layout='fill' /></div>
        <div className={classNames(styles.text, props.textClass)}>
          {props.text}
        </div>
        <div className={styles.light}><Image src={props.light} alt='' layout='fill' /></div>
      </a>
    </Link>
  )
}
