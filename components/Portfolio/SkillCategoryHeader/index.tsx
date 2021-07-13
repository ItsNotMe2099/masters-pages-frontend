import { fetchSkillList } from "components/Skill/actions";
import Loader from "components/ui/Loader";
import { useEffect } from "react";
import * as React from "react";
import { IRootState, SkillListItem } from "types";
import { getMediaPath } from "utils/media";
import { getCategoryTranslation } from "utils/translations";
import styles from 'components/Portfolio/SkillCategoryHeader/index.module.scss'
import {useTranslation, Trans} from 'react-i18next'

import { useSelector, useDispatch } from 'react-redux'
interface Props {
  item: SkillListItem,
  onAdd?:(SkillListItem) => void,
  onRemove?:(SkillListItem) => void,
  allowEdit?: boolean
}
const SkillCategoryHeader = ({allowEdit, item, onAdd, onRemove}: Props) => {
  const {t} = useTranslation('common');
  return (
    <div className={styles.root}>
      {item.icon && <div className={styles.icon}> <img src={getMediaPath(item.icon)}/></div>}
      <div className={styles.title}> {getCategoryTranslation(item)?.name}</div>
      {allowEdit && <div className={styles.actions}>
        <div className={styles.actionItem} onClick={() => onRemove(item)}>
          {t('portfolio.skill.deleteCategory')}
          <img src={'/img/icons/basket.svg'}/>
        </div>
        <div className={styles.separator}/>
        <div className={styles.actionItem} onClick={() => onAdd(item)}>
        {t('add')}
          <img src={'/img/icons/plus.svg'}/>
        </div>
      </div>}
    </div>
  )
}

export default SkillCategoryHeader
