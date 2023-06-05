import { ReactElement } from 'react'
import styles from './index.module.scss'

interface Props {
  title: string
  icon: string | ReactElement,
  onClick: () => void
}

export default function TaskActionButton({title, icon, onClick}: Props) {
 return ( <div className={styles.root} onClick={onClick}>
   <div className={styles.title}>{title}</div>
   {(typeof icon === 'string') ? <img className={styles.icon} src={`/img/icons/${icon}.svg`} alt=''/> : <span className={styles.icon}>{icon}</span>}
 </div>)
}
