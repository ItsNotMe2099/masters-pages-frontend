import Link from 'next/link'
import styles from './index.module.scss'
import { useDispatch} from 'react-redux'
import {ProfileRole} from 'data/intefaces/IProfile'
import classNames from 'classnames'

interface Props {
  isActive: boolean
  title: string
  link?: string
  icon?: string
  mode?: string
  badge?: number
  className?: string

  onClick?: () => void
}

export default function MenuItem(props: Props) {
  const {isActive, title, link, icon, mode, badge, onClick} = props
  const dispatch = useDispatch()

  const getModeClass = () => {
    switch (mode) {
      case ProfileRole.Master:
        return styles.modeMaster
      case ProfileRole.Volunteer:
        return styles.modeVolunteer
      case ProfileRole.Corporate:
        return styles.modeCorporate
      case ProfileRole.Client:
        return styles.modeClient
      default:
        return styles.modeGuest
    }
  }
  const handleClick = (e) => {
   if(onClick) {
     e.stopPropagation()
    onClick()
   }
  }
  const renderButton = () => {
    return  <>
      <div className={styles.border}/>
      <div className={styles.imageWrapper}>
        <img className={styles.icon} src={`/img/LeftMenu/${icon}.svg`}/>
      </div>
      <div className={styles.title}>
        {title}
      </div>
      {badge > 0 && <div className={styles.badge}>
        {badge > 100 ? '99+' : badge}
      </div>}
    </>
  }
  if(link) {
    return (
      <Link href={link}>
        <a className={`${styles.root} ${isActive && styles.isActive} ${getModeClass()} ${props.className}`} onClick={handleClick}>
          {renderButton()}
        </a>
      </Link>
    )
  }else{
    return (  <div className={`${styles.root} ${isActive && styles.isActive} ${getModeClass()} ${props.className}`} onClick={handleClick}>
      {renderButton()}
    </div>)
  }
}
