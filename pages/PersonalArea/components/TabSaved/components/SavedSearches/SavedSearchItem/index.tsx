import { confirmOpen } from "components/Modal/actions";
import { deleteSavedSearch } from "components/SavedSearches/actions";
import { deleteTaskUser } from "components/TaskUser/actions";
import Button from "components/ui/Button";
import { useRouter } from "next/router";
import {useState} from "react";
import { IRootState, ISavedSearchItem } from "types";
import { getCategoryTranslation } from "utils/translations";
import styles from 'pages/PersonalArea/components/TabSaved/components/SavedSearches/SavedSearchItem/index.module.scss'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
  item: ISavedSearchItem
}
const SavedSearchItem = (props: Props) => {
  const dispatch = useDispatch()
  const [show, setIsShow] = useState(false)
  const router = useRouter();
  const { item } = props
  const getItems = () => {
    const res = [];
    if(item.category) {
      res.push({label: 'Category', value: getCategoryTranslation(item.category)?.name});
    }
    if(item.category) {
      res.push({label: 'Sub Category', value: getCategoryTranslation(item.subCategory)?.name});
    }
    if(item.geoname) {
      res.push({label: 'Location', value: item.geoname.name});
    }

    if(item.radius) {
      res.push({label: 'Radius', value: item.radius});
    }
    if(item.budgetMin || item.budgetMax) {
      res.push({label: 'Budget ', value: `${item.budgetMin} - ${item.budgetMax}`});
    }
    if(item.ratePerHourMin || item.ratePerHourMax) {
      res.push({label: 'Budget ', value: `${item.ratePerHourMin} - ${item.ratePerHourMax}`});
    }
    if(item.keywords) {
      res.push({label: 'Keywords ', value: `${item.keywords}`});
    }
    return res;
  }
  const getUrl = () => {
    const filter = {
      ...( item.categoryId ? {categoryId: item.categoryId } : {}),
      ...( item.subCategoryId ? {subCategoryId: item.subCategoryId } : {}),
      ...( item.geonameid ? {geonameid: item.geonameid } : {}),
      ...( item.budgetMin || item.budgetMax ? {price: {budgetMin: item.budgetMin, budgetMax: item.budgetMax} } : {}),
      ...( item.ratePerHourMin || item.ratePerHourMax ? {price: {budgetMin: item.ratePerHourMin, budgetMax: item.ratePerHourMax} } : {}),
     }

     console.log("Filter", filter);
     return `/SearchTaskPage?filter=${JSON.stringify(filter)}`;
  }
  const handleDelete = () => {
    dispatch(confirmOpen({
      description: `Do you want to delete saved search?`,
      onConfirm: () => {
        dispatch(deleteSavedSearch(item.id))
      }
    }));
  }
  const items = getItems();
  return (
      <section className={styles.item}>
        <div className={styles.type}>
          <div className={styles.typeText}>Search</div>
        </div>
        <div className={show ? styles.categoriesGrid : styles.categories}>
          {items.splice(0, show ? items.length  : 3).map(item =>  <div className={styles.category}>
            <div className={styles.innerItem}>{item.label}: <span>{item.value}</span></div>
          </div>)}
        </div>
        <a className={styles.switch} onClick={() => setIsShow(!show)}>
          {items.length > 3 && <div className={styles.number}>
         <div className={styles.textNumber}>{show ? <>&larr;</> : <>+{items.length - 3}</>}</div>
        </div>}
        </a>
        <div className={styles.btnRemove}><Button size="8px 32px" white borderLightGrey onClick={handleDelete}>Remove</Button></div>
        <div className={styles.btn}>
          <Link href={getUrl()}>
            <Button size="8px 32px" white borderLightGrey>Search</Button>
          </Link>
          </div>
    </section>
  )
}

export default SavedSearchItem
