import styles from './index.module.scss'

import {IProfilePreferWorkIn} from 'types'
import LocationIcon from 'components/svg/LocationIcon'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import { useTranslation } from 'next-i18next'

interface Props{
  index?: number
  model: IProfilePreferWorkIn,
  onMoveUp?: (model, index) => void,
  onMoveDown?: (model, index) => void,
  onDelete?: (model, index) => void
  isEdit?: boolean
}
const LocationItem = (props: Props) => {
  const {  model, index, onMoveUp, onMoveDown, isEdit } = props
  const {t} = useTranslation('common')
  return (
    <div className={styles.root}>
      <LocationIcon className={model.type === 'online' ? styles.iconOnline : styles.icon} />
      <div className={`${styles.name} ${model.type === 'online' && styles.nameOnline}`}>{model.type === 'online' ? t('online') : model.location}</div>
      {isEdit && <div className={styles.actions}>
      {onMoveDown && <FormActionButton type={'moveDown'} title={t('down')} onClick={() => onMoveDown(model, index)}/>}
      {onMoveUp && <FormActionButton type={'moveUp'} title={t('up')} onClick={() => onMoveUp(model, index)}/>}
      <FormActionButton type={'delete'} title={t('task.delete')} onClick={() => props.onDelete(model, index)}/>
      </div>}
    </div>
  )
}

export default LocationItem
