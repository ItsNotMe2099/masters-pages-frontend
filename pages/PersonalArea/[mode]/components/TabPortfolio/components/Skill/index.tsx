import { fetchSkillList } from "components/Skill/actions";
import Loader from "components/ui/Loader";
import { useEffect } from "react";
import * as React from "react";
import { IRootState, SkillData, SkillListItem } from "types";
import { getMediaPath } from "utils/media";
import { getCategoryTranslation } from "utils/translations";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
interface Props {
  item: SkillData
}
const Skill = ({item}: Props) => {
  return (
    <div className={styles.root}>
      <div className={`${styles.slider} ${item.photos.length === 0 && styles.sliderEmpty}`}>
        {item.photos.length === 0 &&
        <img src={'/img/icons/no-image.svg'}/>}
        {item.photos.length === 0 &&
        <span>Add your first image</span>}
      </div>
      <div className={styles.title}> {getCategoryTranslation(item.subCategory)?.name}</div>
      <div className={styles.description}> {item.description || 'Empty description'}</div>
      <div className={styles.priceLabel}>Price:</div>
      <div className={styles.price}>{item.price ? `${item.price}` : item.ratePerHour ? `${item.ratePerHour}/hour`: 'N/A'}</div>
    </div>
  )
}

export default Skill
