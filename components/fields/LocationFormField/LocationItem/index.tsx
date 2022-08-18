import styles from './index.module.scss'
import LocationIcon from 'components/svg/LocationIcon'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import { useTranslation } from 'next-i18next'

interface Props{
  index?: number
  model: { type: 'online' | 'offline', address: string, isOnline: boolean },
  onMoveUp?: (model, index) => void,
  onMoveDown?: (model, index) => void,
  onDelete: (model, index) => void
  isEdit?: boolean
}
const LocationItem = (props: Props) => {
  const {  model, index, onMoveUp, onMoveDown, isEdit } = props
  const {t} = useTranslation('common')
  return (
    <div className={styles.root}>
      <LocationIcon className={model.isOnline ? styles.iconOnline : styles.icon} />
      <div className={`${styles.name} ${model.isOnline && styles.nameOnline}`}>{model.isOnline ? t('online') : model.address}</div>
      {isEdit && <div className={styles.actions}>
      {onMoveDown && <FormActionButton type={'moveDown'} title={t('down')} onClick={() => onMoveDown(model, index)}/>}
      {onMoveUp && <FormActionButton type={'moveUp'} title={t('up')} onClick={() => onMoveUp(model, index)}/>}
      <FormActionButton type={'delete'} title={t('task.delete')} onClick={() => props.onDelete(model, index)}/>
      </div>}
    </div>
  )
}

export default LocationItem
