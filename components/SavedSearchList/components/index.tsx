import {IRootState, ISavedSearchItem} from "types";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'

import FormDeleteIcon from 'components/svg/FormDeleteIcon'
interface Props {
  item: ISavedSearchItem,
  onDelete: (item) => void
  onClick: (item) => void
}

export default function SavedSearchListItem(props: Props) {
  const {item, onDelete, onClick} = props;
  const handleDelete = e => {
    e.stopPropagation();
  onDelete(item)
  }
  return (
        <div className={styles.root} onClick={() => onClick(item)}>
          <div className={styles.name}>{item.name || `Search ${item.id}`}</div>
          <div className={styles.icon} onClick={handleDelete}><FormDeleteIcon className={styles.icon} /></div>
         </div>
  )
}
