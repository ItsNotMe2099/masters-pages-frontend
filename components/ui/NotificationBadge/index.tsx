import styles from './index.module.scss'



interface Props {
  amount?:number
  size?: string
  top?: string,
  right?: string
  border?: boolean
}

export default function NotificationBadge({size, amount, border, right, top}: Props) {

  return (
    <div className={`${styles.root} ${border && styles.border} ${size === 'small' && styles.small} ${size === 'normal' && styles.normal}`} style={{ ...(right ? {right} : {}), ...(top ? {top} : {}), }}>
      {amount || ''}
    </div>
  )
}
NotificationBadge.defaultProps = {
  size: 'normal',
  border: true
}
