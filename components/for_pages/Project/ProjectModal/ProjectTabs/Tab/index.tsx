import { useRouter } from 'next/router'
import * as React from 'react'
import styles from './index.module.scss'
import Link from 'next/link'
import NotificationBadge from 'components/ui/NotificationBadge'
import classNames from 'classnames'
import { useAppContext } from 'context/state'
import { ProfileRole } from 'data/intefaces/IProfile'

interface Props {
  name?: string,
  label?: string,
  badge?: number
  link?: string,
  isActive: boolean,
  onClick?: () => void
  style?: 'fullwidth' | 'round' | 'roundSmall' | 'outline' | 'fullWidthRound'
  className?: string
  isFirst: boolean
  isLast: boolean
  icon: string

}
const ProjectTabItem = ({name, label, link, icon, style, onClick, isActive, className, badge, isFirst, isLast}: Props) => {
  const router = useRouter()
  const handleClick = (e) => {
    if(onClick){
      e.preventDefault()
      onClick()
      return false
    }
  }

  const appContext = useAppContext()
  const profile = appContext.profile

  const rootClass = {
    [styles.volunteer]: profile.role === ProfileRole.Volunteer
  }

  return (
    <Link href={`${link}`}>
      <a className={`${classNames(styles.root, rootClass)} ${isFirst && styles.isFirst} ${isLast && styles.isLast} ${style === 'fullwidth' && styles.fullWidth} ${style === 'fullWidthRound' && styles.fullWidthRound} ${style === 'round' && styles.round} ${style === 'roundSmall' && styles.roundSmall} ${style === 'outline' && styles.outline} ${isActive && styles.active} ${className}`} onClick={handleClick}>
        <img className={styles.icon} src={`/img/Project/menu/${icon}.svg`}/>{name}{label}
        {badge > 0 && <NotificationBadge right={style === 'round' ? '18px' : '4px'} top={style === 'round' ? '10px' : '6px'} border={style === 'round'} amount={badge}/>}
      </a>
    </Link>
  )
}


export default ProjectTabItem
