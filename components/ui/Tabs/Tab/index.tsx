import { useRouter } from "next/router";
import * as React from "react";
import styles from './index.module.scss'
import Link from "next/link"
interface Props {
  name: string,
  link?: string,
  isActive: boolean,
  onClick?: () => void
  style: 'fullwidth' | 'round' | 'outline'
}
const Tab = ({name, link, style, onClick, isActive}: Props) => {
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
      <a className={`${styles.root} ${style === 'fullwidth' && styles.fullWidth} ${style === 'round' && styles.round} ${style === 'outline' && styles.outline} ${isActive && styles.active}`} onClick={handleClick}>{name}</a>
    </Link>
  )
}


export default Tab
