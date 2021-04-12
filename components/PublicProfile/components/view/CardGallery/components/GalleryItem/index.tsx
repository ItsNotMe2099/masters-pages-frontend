import styles from './index.module.scss'

import {IProfileGalleryItem, ProfileData} from 'types'
import {getMediaPath} from 'utils/media'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'


interface Props{
  model: IProfileGalleryItem,
  isEdit: boolean,
  onEdit: (model) => void,
  onDelete: (model) => void,
  onClick: (model) => void
}
const GalleryItem = ({model, isEdit, onEdit, onDelete, onClick}: Props) => {

  const handleClick = () => {
    onClick(model);
  }
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={getMediaPath(model.photo)} onClick={handleClick}/>
        {isEdit && <div className={styles.editActions}>

          <FormActionButton type={'edit'} title={'Edit'} onClick={ () => onEdit(model)}/>
          <FormActionButton type={'delete'} title={'Delete'} onClick={ () => onDelete(model)}/>
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

export default GalleryItem
