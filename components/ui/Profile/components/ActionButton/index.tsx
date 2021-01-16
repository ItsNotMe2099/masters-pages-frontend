import styles from './index.module.scss'

interface Props {
  title: string
  icon: string,
  isLoading?: boolean,
  onClick: () => void
}

export default function ProfileActionButton({title, icon, isLoading, onClick}: Props) {
 return ( <div className={styles.root} onClick={isLoading ? null : onClick}>
   <div className={styles.title}>{title}</div>
   <img className={styles.icon} src={`/img/icons/${icon}.svg`} alt=''/>
 </div>);
}
