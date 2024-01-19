import AboutUsSvg from 'components/svg/AboutUsSvg'
import styles from './index.module.scss'
import { ReactElement } from 'react'
import classNames from 'classnames'


interface Props {
  children?: ReactElement | ReactElement[]
  title: string
  className?: string
}

export default function AboutUs(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.top}>
            {props.title}
          </div>
          {props.children}
        </div>
        <AboutUsSvg />
      </div>
    </div>
  )
}
