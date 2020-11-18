import * as React from "react";
import styles from './index.module.scss'
import Link from "next/link"
interface Props {
  name: string,
  link: string,
  isActive: boolean,
}
const Tab = (props: Props) => {
  return (
      <Link href={`${props.link}`}>
      <a className={`${styles.root} ${props.isActive && styles.active}`}>{props.name}</a>
      </Link>
  )
}

export default Tab
