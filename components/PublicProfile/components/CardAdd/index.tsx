import styles from './index.module.scss'
import CardTitle from 'components/PublicProfile/components/CardTitle'
import AddCircleIcon from 'components/svg/AddCircleIcon'

interface Props{
  children?: any
  className?: string,
  title?: string,
  icon?: string,
  onClick?: () => void
}
const CardAdd = ({className, icon, title, onClick}: Props) => {
  return (
    <div className={`${styles.root} ${className}`} onClick={onClick}>
      <img src={`/img/Profile/${icon}.svg`}/>
      <div className={styles.title}>{title}</div>
    </div>
  )
}

export default CardAdd
