import Button from "components/ui/Button";
import {useState} from "react";
import { ISavedSearches } from "types";
import styles from './index.module.scss'

interface Props {
  type: string
  item: ISavedSearches
}
const SavedSearches = (props: Props) => {

  const [show, setIsShow] = useState(false)
  const { item } = props
  return (
      <section className={styles.item}>
        <div className={styles.type}>
          <div className={styles.typeText}>{props.type}</div>
        </div>
        <div className={show ? styles.categoriesGrid : styles.categories}>
        <div className={styles.category}>
          <div className={styles.innerItem}>Category: <span>{item.categoryId}</span></div>
        </div>
        <div className={styles.category}>
          <div className={styles.innerItem}>Sub category: <span>{item.subCategoryId}</span></div>
        </div>
        <div className={styles.category}>
          <div className={styles.innerItem}>Location: <span>{item.exactLocation}</span></div>
        </div>
        <div className={styles.category}>
          <div className={styles.innerItem}>Keywords: <span>{item.keywords}</span></div>
        </div>
        {show ?
        <>
        <div className={styles.category}>
          <div className={styles.innerItem}>Master role: <span>{item.masterRole}</span></div>
        </div>
        <div className={styles.category}>
          <div className={styles.innerItem}>Radius: <span>{item.radius}</span></div>
        </div>
        <div className={styles.category}>
          <div className={styles.innerItem}>Budget (min): <span>{item.budgetMin}</span></div>
        </div>
        <div className={styles.category__last}>
          <div className={styles.innerItem}>Budget (max): <span>{item.budgetMax}</span></div>
        </div>
        </>
        : null}
        </div>
        <a className={styles.switch} onClick={() => show ? setIsShow(false) : setIsShow(true)}>
        <div className={styles.number}>
          <div className={styles.textNumber}>{show ? <>&larr;</> : <>+4</>}</div>
        </div>
        </a>
        <div className={styles.btnRemove}><Button size="8px 32px" white borderLightGrey>Remove</Button></div>
        <div className={styles.btn}><Button size="8px 32px" white borderLightGrey>Search</Button></div>
    </section>
  )
}

export default SavedSearches
