import { confirmOpen } from "components/Modal/actions";
import { deleteSavedSearch } from "components/SavedSearches/actions";
import { deleteTaskUser } from "components/TaskUser/actions";
import Button from "components/ui/Button";
import { useRouter } from "next/router";
import {useState} from "react";
import { IRootState, ISavedSearchItem, ISavedTasks } from "types";
import { getCategoryTranslation } from "utils/translations";
import styles from './index.module.scss'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { format } from "date-fns";

interface Props {
  item: ISavedTasks
}
const SavedTaskItem = (props: Props) => {
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

export default SavedTaskItem
