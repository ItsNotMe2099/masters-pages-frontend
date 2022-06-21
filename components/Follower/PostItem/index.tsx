import styles from './index.module.scss'

import {IProfileGalleryItem} from 'types'
import {getMediaPath} from 'utils/media'
import EditOutlineIcon from 'components/svg/EditOutlineIcon'
import BaskerOutlineIcon from 'components/svg/BaskerOutlineIcon'


interface Props{
  model: IProfileGalleryItem,
  isEdit: boolean,
  onEdit?: (model) => void,
  onDelete?: (model) => void,
  onClick?: (model) => void
}
const PostItem = ({model, isEdit, onEdit, onDelete, onClick}: Props) => {

  const handleClick = () => {
    onClick(model)
  }
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={getMediaPath(model.photo)} onClick={handleClick}/>
        {isEdit && <div className={styles.editActions}>
          <div className={styles.action} onClick={ () => onEdit(model)}>
            <EditOutlineIcon/>
          </div>
          <div className={styles.action} onClick={ () => onDelete(model)}>
            <BaskerOutlineIcon/>
          </div>
        </div>}
      </div>
      <div className={styles.info}>
        <div className={styles.details}>
          <div className={styles.title} onClick={handleClick}>{model.title}</div>
          <div className={styles.description}>{model.description}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statItem}><img src={'/img/icons/likes.svg'}/>{model.likesCount}</div>
          <div className={styles.statItem}><img src={'/img/icons/comments.svg'}/>{model.commentsCount}</div>
        </div>

      </div>
    </div>
  )
}

export default PostItem
