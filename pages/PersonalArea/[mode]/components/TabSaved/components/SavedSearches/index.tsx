import Button from "components/ui/Button";
import * as React from "react";
import styles from './index.module.scss'

interface Props {
  type: string
  category: string
  subCategory: string
  location: string
  rating: string
  number: number
}
const SavedSearches = (props: Props) => {

  return (
      <section className={styles.item}>
        <div className={styles.type}>
          <div className={styles.typeText}>{props.type}</div>
        </div>
        <div className={styles.category}>
          <div className={styles.innerItem}>Category: <span>{props.category}</span></div>
        </div>
        <div className={styles.category}>
          <div className={styles.innerItem}>Sub category: <span>{props.subCategory}</span></div>
        </div>
        <div className={styles.category}>
          <div className={styles.innerItem}>Location: <span>{props.location}</span></div>
        </div>
        <div className={styles.category__last}>
          <div className={styles.innerItem}>Rating: <span>{props.rating}</span></div>
        </div>
        <div className={styles.number}>
          <div className={styles.textNumber}>+{props.number}</div>
        </div>
        <div className={styles.btnRemove}><Button size="8px 32px" white borderLightGrey>Remove</Button></div>
        <div className={styles.btn}><Button size="8px 32px" white borderLightGrey>Search</Button></div>
    </section>
  )
}

export default SavedSearches
