import classNames from 'classnames'
import styles from './index.module.scss'
import Link from 'next/link'
interface Props {
  title: string
  icon: any,
  href?: string
  isLoading?: boolean,
  onClick: () => void
  className?: string
}

export default function ProfileActionButton({title, href, icon, isLoading, onClick, className}: Props) {
const renderButton = () => {
  return (<>
    <div className={styles.title}>{title}</div>
    <div className={styles.icon}>{icon}</div>
  </>)
}
  return (href ? <Link href={href}><a href={href}  className={classNames(styles.root, className)}>{renderButton()}</a></Link> : <div className={classNames(styles.root, className)} onClick={isLoading ? null : onClick}>{renderButton()}</div> )

}
