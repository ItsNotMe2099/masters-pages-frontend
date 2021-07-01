import Chat from "components/Chat";
import Header from "components/layout/Header";
import Loader from "components/ui/Loader";
import {IRootState} from "types";
import Link from 'next/link'
import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'

interface Props {
  isActive: boolean
  title: string
  link?: string
  icon?: string
  mode?: string
  badge?: number

  onClick?: () => void
}

export default function MenuItem(props: Props) {
  const {isActive, title, link, icon, mode, badge, onClick} = props
  const dispatch = useDispatch()

  const getModeClass = () => {
    switch (mode) {
      case 'master':
        return styles.modeMaster;
      case 'volunteer':
        return styles.modeVolunteer;
      case 'client':
      default:
        return styles.modeClient;
    }
  }
  const handleClick = (e) => {
   if(onClick) {
     e.stopPropagation();
    onClick();
   }
  }
  return (
    <Link href={link}>
      <a className={`${styles.root} ${isActive && styles.isActive} ${getModeClass()}`}  onClick={handleClick}>
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
      </a>
    </Link>
  )
}
