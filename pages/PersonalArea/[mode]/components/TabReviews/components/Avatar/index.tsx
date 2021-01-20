import * as React from "react";
import styles from './index.module.scss'
import { IFeedbacksToProfile } from "types";
import { isTemplateTail } from "typescript";

interface Props {
  mini?: boolean
  item: IFeedbacksToProfile
}
const Avatar = (props: Props) => {
  const { item } = props
  return (
    <div className={styles.root}>
      <img className={props.mini ? styles.avatarMini : styles.avatar} src="/img/icons/Ellipse 2.png" alt=''/>
      <div className={props.mini ? styles.otherMini : styles.other}>
        <div className={props.mini ? styles.nameMini : styles.name}>{`${item.fromProfile.firstName} ${item.fromProfile.lastName}`}</div>
        <div className={props.mini? styles.stars__mini : styles.stars}>
            <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
            <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
            <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
            <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
            <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
        </div>
      </div>
    </div>
  )
}

export default Avatar
