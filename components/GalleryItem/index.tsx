import styles from './index.module.scss'

import {IProfileGalleryItem, ProfileData} from 'types'
import {getMediaPath} from 'utils/media'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import {useTranslation} from 'i18n'
import ShowMoreText from 'react-show-more-text';

interface Props{
  model: IProfileGalleryItem,
  isEdit: boolean,
  onEdit?: (model) => void,
  onDelete?: (model) => void,
  onClick: (model) => void
}
const GalleryItem = ({model, isEdit, onEdit, onDelete, onClick}: Props) => {

  const handleClick = () => {
    onClick(model);
  }
  const {t} = useTranslation('common');
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img className={styles.cover} src={getMediaPath(model.photo)} onClick={handleClick}/>
        {isEdit && <div className={styles.editActions}>

          <FormActionButton type={'edit'} title={''} onClick={ () => onEdit(model)}/>
          <FormActionButton type={'delete'} title={''} onClick={ () => onDelete(model)}/>
        </div>}
        <div className={styles.stat} onClick={handleClick}>
          <div className={styles.statItem}><img src={'/img/icons/likes_white.svg'}/>{model.likesCount}</div>
          <div className={styles.statItem}><img src={'/img/icons/comments_white.svg'}/>{model.commentsCount}</div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoWrapper}>
        <div className={styles.details}>
          <div className={styles.title} onClick={handleClick}>{model.title}</div>

        </div>

        </div>
        <div className={styles.description} onClick={handleClick}>
          <ShowMoreText
            /* Default options */
            lines={2}
            more=''
            less='<-'

            onClick={handleClick}
            expanded={false}

          >
            {model.description}</ShowMoreText></div>
      </div>
    </div>
  )
}

export default GalleryItem
