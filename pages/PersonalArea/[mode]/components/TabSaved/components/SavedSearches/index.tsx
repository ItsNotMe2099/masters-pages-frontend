import Button from "components/ui/Button";
import {useState} from "react";
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

  const [show, setIsShow] = useState(false)
  return (
      <section className={styles.item}>
        <div className={styles.type}>
          <div className={styles.typeText}>{props.type}</div>
        </div>
        <div className={show ? styles.categoriesGrid : styles.categories}>
        <div className={styles.category}>
          <div className={styles.innerItem}>Category: <span>{props.category}</span></div>
        </div>
        <div className={styles.category}>
          <div className={styles.innerItem}>Sub category: <span>{props.subCategory}</span></div>
        </div>
        {show ?
        <>
        <div className={styles.category}>
          <div className={styles.innerItem}>Location: <span>{props.location}</span></div>
        </div>
        <div className={styles.category__last}>
          <div className={styles.innerItem}>Rating: <span>{props.rating}</span></div>
        </div>
        </>
        : null}
        </div>
        <a className={styles.switch} onClick={() => show ? setIsShow(false) : setIsShow(true)}>{show ? <span>Hide</span> : <span>Show more</span>}</a>
        <div className={styles.number}>
          <div className={styles.textNumber}>+{props.number}</div>
        </div>
        <div className={styles.btnRemove}><Button size="8px 32px" white borderLightGrey>Remove</Button></div>
        <div className={styles.btn}><Button size="8px 32px" white borderLightGrey>Search</Button></div>
    </section>
  )
}

export default SavedSearches
