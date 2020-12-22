import Button from "components/ui/Button";
import {useState} from "react";
import { ISavedPeople } from "types";
import styles from './index.module.scss'

interface Props {
  item: ISavedPeople
}
const SavedPeople = (props: Props) => {
  const [show, setIsShow] = useState(false)
  const { item } = props
  const categories = ["Art and design", "Fitness", "Courier", "Art and design", "Fitness", "Courier"]

  return (
      <section className={styles.item}>
        <div className={styles.name}>
          <div className={styles.nameText}>{item.firstName} {item.lastName}</div>
        </div>
        <div className={styles.stars}>
            <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
            <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
            <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
            <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
            <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
        </div>
        <div className={show ? styles.categoriesGrid : styles.categories}>
          {(show ? categories : categories.slice(0, 3)).map(item => (
            <div className={styles.category}>
              <div className={styles.text}>{item}</div>
              <img src="/img/icons/triangleDown.svg" alt=""/>
            </div>
          ))}
        </div>
        <a className={styles.switch} onClick={() => show ? setIsShow(false) : setIsShow(true)}>
        <div className={styles.number}>
          <div className={styles.textNumber}>{show ? <>&larr;</> : <>+{categories.length - 3}</>}</div>
        </div>
        </a>
        <div className={styles.btnRemove}><Button size="8px 32px" white borderLightGrey>Remove</Button></div>
        <div className={styles.btn}><Button size="8px 32px" white borderLightGrey>Message</Button></div>
      </section>
  )
}

export default SavedPeople
