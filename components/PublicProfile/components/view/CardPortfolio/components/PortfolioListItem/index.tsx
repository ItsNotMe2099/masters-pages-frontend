import styles from './index.module.scss'

import {IProfilePortfolio} from 'types'
import Button from 'components/PublicProfile/components/Button'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import {getMediaPath} from 'utils/media'
import FileList from 'components/ui/FileList'
import { useTranslation } from 'next-i18next'

interface Props{
  model: IProfilePortfolio,
  onEdit: (model) => void,
  onDelete: (model) => void,
  isEdit: boolean
}
const PortfolioListItem = ({onEdit, onDelete, model, isEdit}: Props) => {

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop()

    switch (ext){
      case 'psd':
        return 'psd'
      case 'eps':
        return 'eps'
      case 'pdf':
        return 'pdf'
      case 'txt':
        return 'txt'
      case 'doc':
        return 'doc'
      case 'docx':
        return 'docx'
      case 'png':
        return 'png'
      case 'ppt':
        return 'ppt'
      case 'pptx':
        return 'pptx'
      case 'ai':
        return 'ai'
      case 'tif':
        return 'tif'
      case 'tiff':
        return 'tiff'
      case 'jpg':
        return 'jpg'
      case 'jpeg':
        return 'jpg'
      case 'gif':
        return 'gif'
      case 'zip':
        return 'zip'
      case 'svg':
        return 'svg'
      case 'avi':
        return 'avi'
      case 'mov':
        return 'mov'
      default:
        return 'unknowm'

    }
  }
  const {t} = useTranslation('common')
  return (
    <div className={styles.root}>
      <div className={styles.leftColumn}>
        {model.photo && <img src={getMediaPath(model.photo)}/>}
        {!model.photo && <div className={styles.emptyImage}><img src={'/img/Profile/portfolio_item.svg'}/></div>}
      </div>
      <div className={styles.centerColumn}>
        <div className={styles.header}>
          <div className={styles.leftHeader}>
          <div className={styles.name}>{model.title}</div>
          <div className={styles.duration}>{model.length}</div>
          </div>
          {isEdit && <div className={styles.editActions}>

            <FormActionButton type={'edit'} title={t('edit')} onClick={ () => onEdit(model)}/>
            <FormActionButton type={'delete'} title={t('task.delete')} onClick={ () => onDelete(model)}/>
          </div>}
        </div>
        <div className={styles.description}>
          {model.description}
        </div>
        <div className={styles.actions}>
          {model.link && <Button href={model.link} size={'small'}>{t('cardPortfolio.visitWebsite')}</Button>}
        </div>
      </div>

      {model.files.length > 0 && <div className={styles.rightColumn}>
        <div className={styles.filesTitle}>{t('cardPortfolio.attachedFiles')}</div>
        <FileList files={model.files}/>
      </div>}
    </div>
  )
}

export default PortfolioListItem
