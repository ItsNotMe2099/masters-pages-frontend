import Button from "components/ui/Button";
import * as React from "react";
import styles from './index.module.scss'

interface Props {
  name: string
  firstCategory: string
  secondCategory: string
  thirdCategory: string
  number: number
}
const SavedPeople = (props: Props) => {

  return (
      <section className={styles.item}>
        <div className={styles.name}>
          <div className={styles.nameText}>{props.name}</div>
        </div>
        <div className={styles.stars}>
            <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
            <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
            <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
            <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
            <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
        </div>
        <div className={styles.category}>
          <div className={styles.text}>{props.firstCategory}</div>
          <img src="/img/icons/triangleDown.svg" alt=""/>
        </div>
        <div className={styles.category}>
          <div className={styles.text}>{props.secondCategory}</div>
          <img src="/img/icons/triangleDown.svg" alt=""/>
        </div>
        <div className={styles.category}>
          <div className={styles.text}>{props.thirdCategory}</div>
          <img src="/img/icons/triangleDown.svg" alt=""/>
        </div>
        <div className={styles.category}>
          <div className={styles.text}>{props.firstCategory}</div>
          <img src="/img/icons/triangleDown.svg" alt=""/>
        </div>
        <div className={styles.category}>
          <div className={styles.text}>{props.secondCategory}</div>
          <img src="/img/icons/triangleDown.svg" alt=""/>
        </div>
        <div className={styles.category}>
          <div className={styles.text}>{props.thirdCategory}</div>
          <img src="/img/icons/triangleDown.svg" alt=""/>
        </div>
        <div className={styles.number}>
          <div className={styles.textNumber}>+{props.number}</div>
        </div>
        <div className={styles.btnRemove}><Button size="8px 32px" white borderLightGrey>Remove</Button></div>
        <div className={styles.btn}><Button size="8px 32px" white borderLightGrey>Message</Button></div>
      </section>
  )
}

export default SavedPeople
