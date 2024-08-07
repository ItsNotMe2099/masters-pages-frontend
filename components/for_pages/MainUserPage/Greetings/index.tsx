import { ReactElement } from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import { useAppContext } from 'context/state'
import { useResize } from 'components/hooks/useResize'


interface Props {
  children?: ReactElement | ReactElement[]
  title: string
  titleClass?: string
}

export default function Greetings(props: Props) {

  const appContext = useAppContext()

  const { isPhoneWidth } = useResize()

  return (
    <div className={classNames(styles.root, { [styles.none]: appContext.menuMobileOpen })}>
      <Image className={styles.abstraction1} src={'/img/MainPage/abstraction1.png'} alt='' layout='fill' />
      <Image className={styles.abstraction2} src={'/img/MainPage/abstraction2.png'} alt='' layout='fill' />
      <div className={styles.container}>
        {!isPhoneWidth && <div className={styles.title}>
          {props.title}
        </div>}
        {props.children}
        {isPhoneWidth && <div className={classNames(styles.title, props.titleClass)}>
          {props.title}
        </div>}
      </div>
    </div>
  )
}
