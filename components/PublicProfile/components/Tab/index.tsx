import styles from './index.module.scss'

interface Props{
  title?: string,
  children?: any
  className?: string,
  isActive?: boolean,
  onClick?: () => void
}
const Tab = (props: Props) => {
  return (
    <div className={`${styles.root} ${props.isActive && styles.rootActive} ${props.className} `} onClick={props.onClick}>
      {props.children ? props.children : (props.title || '')}
    </div>
  )
}

export default Tab
