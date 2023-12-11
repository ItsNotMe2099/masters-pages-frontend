import AboutUsSvg from 'components/svg/AboutUsSvg'
import styles from './index.module.scss'
import { ReactElement } from 'react'


interface Props {
  children?: ReactElement | ReactElement[]
  title: string
}

export default function AboutUs(props: Props) {

  return (
    <div className={styles.root}>
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
