import { useRouter } from 'next/router'
import * as React from 'react'
import styles from './index.module.scss'
import Link from 'next/link'
import NotificationBadge from '../../NotificationBadge'
import { useAppContext } from 'context/state'
import classNames from 'classnames'

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

}
const Tab = ({name, label, link, style, onClick, isActive, className, badge, isFirst, isLast}: Props) => {
  const router = useRouter()
  const handleClick = (e) => {
    if(onClick){
      e.preventDefault()
      onClick()
      return false
    }
  }

  const appContext = useAppContext()
  const roleCurrent = appContext.role

  const getModeClass = () => {
    switch (roleCurrent) {
      case 'master':
        return styles.modeMaster
      case 'volunteer':
        return styles.modeVolunteer
      case 'corporate':
        return styles.modeCorporate
      case 'client':
      default:
        return styles.modeClient
    }
  }

  return (
    <Link href={`${link}`}>
      <a 
      className=
      {classNames(styles.root, {[styles.isFirst]: isFirst, [styles.isLast]: isLast, [styles.fullWidth]: style === 'fullwidth', [styles.fullWidthRound]: style === 'fullWidthRound', [styles.round]: style === 'round', [styles.roundSmall]: style === 'roundSmall', [styles.outline]: style === 'outline', [styles.active]: isActive}, className, getModeClass())} onClick={handleClick}>{name}{label}
        {badge > 0 && <NotificationBadge right={style === 'round' ? '18px' : '4px'} top={style === 'round' ? '10px' : '6px'} border={style === 'round'} amount={badge}/>}
      </a>
    </Link>
  )
}


export default Tab
