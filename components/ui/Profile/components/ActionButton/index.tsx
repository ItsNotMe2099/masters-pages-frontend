import styles from './index.module.scss'

interface Props {
  title: string
  icon: string,
  onClick: () => void
}

export default function ProfileActionButton({title, icon, onClick}: Props) {
 return ( <div className={styles.root} onClick={onClick}>
   <div className={styles.title}>{title}</div>
   <img className={styles.icon} src={`/img/icons/${icon}.svg`} alt=''/>
 </div>);
}
