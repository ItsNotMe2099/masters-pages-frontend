import styles from './index.module.scss'

import {IProfilePreferWorkIn, ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import LocationIcon from 'components/svg/LocationIcon'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'

interface Props{
  index: number
  model: IProfilePreferWorkIn,
  onMoveUp: (model, index) => void,
  onMoveDown: (model, index) => void,
  onDelete: (model, index) => void
  isEdit: boolean
}
const WorkInListItem = (props: Props) => {
  const {  model, index, onMoveUp, onMoveDown, isEdit } = props;
  return (
    <div className={styles.root}>
      <LocationIcon className={model.type === 'online' ? styles.iconOnline : styles.icon} />
      <div className={`${styles.name} ${model.type === 'online' && styles.nameOnline}`}>{model.type === 'online' ? 'Online' : model.location}</div>
      {isEdit && <div className={styles.actions}>
      {onMoveDown && <FormActionButton type={'moveDown'} title={'down'} onClick={() => onMoveDown(model, index)}/>}
      {onMoveUp && <FormActionButton type={'moveUp'} title={'up'} onClick={() => onMoveUp(model, index)}/>}
      <FormActionButton type={'delete'} title={'Delete'} onClick={() => props.onDelete(model, index)}/>
      </div>}
    </div>
  )
}

export default WorkInListItem
