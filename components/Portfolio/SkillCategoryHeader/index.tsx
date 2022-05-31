import * as React from 'react'
import { SkillListItem } from 'types'
import { getMediaPath } from 'utils/media'
import { getCategoryTranslation } from 'utils/translations'
import styles from 'components/Portfolio/SkillCategoryHeader/index.module.scss'
import {useTranslation} from 'next-i18next'

interface Props {
  item: SkillListItem,
  onAdd?:(SkillListItem) => void,
  onRemove?:(SkillListItem) => void,
  allowEdit?: boolean
}
const SkillCategoryHeader = ({allowEdit, item, onAdd, onRemove}: Props) => {
  const {t, i18n} = useTranslation('common')
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
