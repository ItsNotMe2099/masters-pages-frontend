import styles from './index.module.scss'

interface Props {
  title: string,
  skill: string
  icon: string,
  onClick: () => void
}

export default function ProfileCategoryTabs({title, icon, onClick}: Props) {
 return ( <div className={styles.root} onClick={onClick}>
   <div className={styles.title}>{title}</div>
   <img className={styles.icon} src={`/img/icons/${icon}.svg`} alt=''/>
 </div>)
}
