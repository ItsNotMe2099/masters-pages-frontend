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
  address?: string
}

const LocationItem = (props: Props) => {
  const {  model, index, onMoveUp, onMoveDown, isEdit } = props
  const {t} = useTranslation('common')
  return (
    <div className={styles.root}>
      <LocationIcon className={(model.type === 'online' || model.isOnline) ? styles.iconOnline : styles.icon}/>
      <div className={`${styles.name} ${(model.type === 'online' || model.isOnline) && styles.nameOnline}`}>
        {(model.type === 'online' || model.isOnline) ? t('online') : model.location ? model.location : props.address}</div>
      {isEdit && <div className={styles.actions}>
      {onMoveDown && <FormActionButton type={'moveDown'} title={t('down')} onClick={() => onMoveDown(model, index)}/>}
      {onMoveUp && <FormActionButton type={'moveUp'} title={t('up')} onClick={() => onMoveUp(model, index)}/>}
      <FormActionButton type={'delete'} title={t('task.delete')} onClick={() => props.onDelete(model, index)}/>
      </div>}
    </div>
  )
}

export default LocationItem
