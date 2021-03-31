import styles from './index.module.scss'
import CardTitle from 'components/PublicProfile/components/CardTitle'

interface Props{
  children?: any
  className?: string,
  title?: string
}
const Card = (props: Props) => {
  return (
    <div className={`${styles.root} ${props.className}`}>
      {props.title && <CardTitle>{props.title}</CardTitle>}
      {props.children}
    </div>
  )
}

export default Card
