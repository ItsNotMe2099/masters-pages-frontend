import { fetchSkillList } from "components/Skill/actions";
import Loader from "components/ui/Loader";
import { useEffect } from "react";
import * as React from "react";
import { IRootState, SkillListItem } from "types";
import { getMediaPath } from "utils/media";
import { getCategoryTranslation } from "utils/translations";
import styles from 'components/Portfolio/SkillCategoryHeader/index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
interface Props {
  item: SkillListItem,
  onAdd:(SkillListItem) => void,
  onRemove:(SkillListItem) => void,
}
const SkillCategoryHeader = ({item, onAdd, onRemove}: Props) => {
  return (
    <div className={styles.root}>
      {item.icon && <div className={styles.icon}> <img src={getMediaPath(item.icon)}/></div>}
      <div className={styles.title}> {getCategoryTranslation(item)?.name}</div>
      <div className={styles.actions}>
        <div className={styles.actionItem} onClick={() => onRemove(item)}>
          Delete category
          <img src={'/img/icons/basket.svg'}/>
        </div>
        <div className={styles.separator}/>
        <div className={styles.actionItem} onClick={() => onAdd(item)}>
          Add
          <img src={'/img/icons/plus.svg'}/>
        </div>
      </div>
    </div>
  )
}

export default SkillCategoryHeader
