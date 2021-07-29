import { useRouter } from "next/router";
import * as React from "react";
import styles from './index.module.scss'
import Link from "next/link"
import NotificationBadge from 'components/ui/NotificationBadge'

interface Props {
  name: string,
  badge?: number
  link?: string,
  isActive: boolean,
  onClick?: () => void
  style?: 'fullwidth' | 'round' | 'roundSmall' | 'outline'
  className?: string

}
const Tab = ({name, link, style, onClick, isActive, className, badge}: Props) => {
  const router = useRouter();
  const handleClick = (e) => {
    if(onClick){
      e.preventDefault();
      onClick()
      return false;
    }
  }

  return (
    <Link href={`${link}`}>
      <a className={`${styles.root} ${style === 'fullwidth' && styles.fullWidth} ${style === 'round' && styles.round} ${style === 'roundSmall' && styles.roundSmall} ${style === 'outline' && styles.outline} ${isActive && styles.active} ${className}`} onClick={handleClick}>{name}
        {badge > 0 && <NotificationBadge right={style === 'round' ? '18px' : '4px'} top={style === 'round' ? '10px' : '6px'} border={style === 'round'} amount={badge}/>}
      </a>
    </Link>
  )
}


export default Tab
