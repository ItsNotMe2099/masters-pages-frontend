import Button from "components/ui/Button";
import {useState} from "react";
import { ISavedTasks } from "types";
import styles from './index.module.scss'
import format from 'date-fns/format'

interface Props {
  item: ISavedTasks
}
const SavedTasks = (props: Props) => {
  const { item } = props

  return (
      <section className={styles.item}>
        <div className={styles.date}>{format(new Date(item.updatedAt), 'MM.dd.yyy hh:mm')}</div>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.price}>{item.priceType === "fixed" ? <span>${item.budget}</span> : <span>${item.ratePerHour}/h</span>}</div>
        <div className={styles.btnRemove}><Button size="8px 32px" white borderLightGrey>Remove</Button></div>
        <div className={styles.btn}><Button size="8px 32px" white borderLightGrey>Go to task</Button></div>
      </section>
  )
}

export default SavedTasks
