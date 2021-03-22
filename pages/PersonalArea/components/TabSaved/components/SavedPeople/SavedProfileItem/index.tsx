import { confirmOpen } from "components/Modal/actions";
import { deleteSavedPeople } from "components/SavedPeople/actions";
import { deleteSavedSearch } from "components/SavedSearches/actions";
import { deleteTaskUser } from "components/TaskUser/actions";
import Button from "components/ui/Button";
import { useRouter } from "next/router";
import {useState} from "react";
import { IRootState, ISavedPeople, ISavedSearchItem } from "types";
import { getCategoryTranslation } from "utils/translations";
import styles from 'pages/PersonalArea/components/TabSaved/components/SavedPeople/SavedProfileItem/index.module.scss'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
  item: ISavedPeople
}
const SavedProfileItem = (props: Props) => {
  const dispatch = useDispatch()
  const [show, setIsShow] = useState(false)
  const router = useRouter();
  const { item } = props

  const handleDelete = () => {
    dispatch(confirmOpen({
      description: `Do you want to delete saved profile?`,
      onConfirm: () => {
        dispatch(deleteSavedPeople(item.id));
      }
    }));
  }

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
        {(show ? item.skills : item.skills.slice(0, 3)).map(item => (
          <div className={styles.category}>
            <div className={styles.text}>{item.title}</div>
            <img src="/img/icons/triangleDown.svg" alt=""/>
          </div>
        ))}
      </div>
      <a className={styles.switch} onClick={() => show ? setIsShow(false) : setIsShow(true)}>
        <div className={styles.number}>
          <div className={styles.textNumber}>{show ? <>&larr;</> : <>+{item.skills.length - 3}</>}</div>
        </div>
      </a>
      <div className={styles.btnRemove}><Button size="8px 32px" white borderLightGrey>Remove</Button></div>
      <div className={styles.btn}><Button size="8px 32px" white borderLightGrey>Message</Button></div>
    </section>
  )
}

export default SavedProfileItem
