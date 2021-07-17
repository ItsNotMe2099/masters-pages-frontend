import styles from './index.module.scss'
import CardTitle from 'components/PublicProfile/components/CardTitle'
import AddCircleIcon from 'components/svg/AddCircleIcon'
import Loader from 'components/ui/Loader'

interface Props{
  children?: any
  className?: string,
  title?: string,
  toolbar?: any
  isLoading?: boolean
  isHidden?: boolean
  onAdd?: () => void,
}
const Card = (props: Props) => {
  return (
    <div className={`${styles.root} ${props.className} ${props.isHidden && styles.hidden}`}>
      {props.title && <CardTitle>{props.title}</CardTitle>}
      <div className={styles.toolbar}>{props.toolbar}</div>
      {props.children}
      {props.isLoading && <div className={styles.loader}><Loader/></div>}
    </div>
  )
}

export default Card
