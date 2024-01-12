import { ReactElement } from 'react'
import Icon from '../Icon'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  color: string
  className?: string
  children: ReactElement | ReactElement[]
  id: string
  iconClass?: string
}

export default function Wrapper(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)} style={{ backgroundColor: `${props.color}` }} id={props.id}>
      <Icon color={props.color} className={classNames(styles.icon, props.iconClass)} />
      <div className={styles.container}>
        {props.children}
      </div>
    </div>
  )
}
