import styles from './index.module.scss'

interface Props{
  title?: string,
  children?: any
  className?: string,
  isActive?: boolean
}
const Tab = (props: Props) => {
  return (
    <div className={`${styles.root} ${props.isActive && styles.rootActive} ${props.className} `}>
      {props.children ? props.children : (props.title || '')}
    </div>
  )
}

export default Tab
