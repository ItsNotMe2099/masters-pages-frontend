import styles from './index.module.scss'

interface Props{
  children?: any
  className?: string
}
const CardTitle = (props: Props) => {
  return (
    <div className={`${styles.root} ${props.className}`}>
      {props.children}
    </div>
  )
}

export default CardTitle
