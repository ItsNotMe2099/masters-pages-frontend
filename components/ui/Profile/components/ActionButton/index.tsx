import styles from './index.module.scss'
import Link from 'next/link'
interface Props {
  title: string
  icon: any,
  href?: string
  isLoading?: boolean,
  onClick: () => void
}

export default function ProfileActionButton({title, href, icon, isLoading, onClick}: Props) {
const renderButton = () => {
  return (<>
    <div className={styles.title}>{title}</div>
    <div className={styles.icon}>{icon}</div>
  </>)
}
  return (href ? <Link href={href}><a href={href}  className={styles.root}>{renderButton()}</a></Link> : <div className={styles.root} onClick={isLoading ? null : onClick}>{renderButton()}</div> )

}
