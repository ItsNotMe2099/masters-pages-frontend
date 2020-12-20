import Button from "components/ui/Button";
import {useState} from "react";
import styles from './index.module.scss'

interface Props {
  name: string
  firstCategory: string
  secondCategory: string
  thirdCategory: string
  number: number
}
const SavedPeople = (props: Props) => {
  const [show, setIsShow] = useState(false)

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
        <div className={show ? styles.categoriesGrid : styles.categories}>
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
        {show ?
        <>
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
        </>
        : null}</div>
        <a className={styles.switch} onClick={() => show ? setIsShow(false) : setIsShow(true)}>{show ? <span>Hide</span> : <span>Show more</span>}</a>
        <div className={styles.number}>
          <div className={styles.textNumber}>+{props.number}</div>
        </div>
        <div className={styles.btnRemove}><Button size="8px 32px" white borderLightGrey>Remove</Button></div>
        <div className={styles.btn}><Button size="8px 32px" white borderLightGrey>Message</Button></div>
      </section>
  )
}

export default SavedPeople
