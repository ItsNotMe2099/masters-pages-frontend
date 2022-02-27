import styles from './index.module.scss'
import { ProfileWorkExperience} from 'types'
import Button from 'components/PublicProfile/components/Button'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import { formatDistanceStrict} from 'date-fns'
import {formatDate, parseDate} from 'utils/formatters'
import {getMediaPath} from 'utils/media'
import { useTranslation } from 'next-i18next'
import { ru } from 'date-fns/locale'
import { I18nContext } from 'next-i18next'
import { useContext } from 'react'

interface Props{
  model: ProfileWorkExperience,
  onEdit: (model) => void,
  onDelete: (model) => void,
  isEdit: boolean
}
const CardWorkExperienceListItem = ({model, isEdit, onEdit, onDelete}: Props) => {

  const { i18n: { language } } = useContext(I18nContext)
  const getDuration = () => {
    if(model.fromDate && model.toDate){
      return `${t('from')} ${formatDate(model.fromDate)} - ${formatDate(model.toDate)} - ${formatDistanceStrict(parseDate(model.fromDate), parseDate(model.toDate), { locale: language === 'ru' && ru })}`
    }else if(model.fromDate){
      return `${t('from')} ${formatDate(model.fromDate)} ${t('to now')} - ${formatDistanceStrict(parseDate(model.fromDate),  new Date(),{ locale: language === 'ru' && ru })}`
    }else if(model.toDate){
      return `${t('until')} ${formatDate(model.toDate), { locale: language === 'ru' && ru }}`
    }
  }
  const {i18n, t} = useTranslation('common')
  return (
    <div className={styles.root}>
      <div className={styles.leftColumn}>
        {model.photo && <img src={getMediaPath(model.photo)}/>}
        {!model.photo && <div className={styles.emptyImage}><img src={'/img/Profile/work_experience.svg'}/></div>}
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.rightHeader}>
        <div className={styles.experience}>
          <div className={styles.position}>{model.title}</div>
          <div className={styles.dates}>{getDuration()}</div>
        </div>
          {isEdit && <div className={styles.editActions}>
          <FormActionButton type={'edit'} title={t('edit')} onClick={ () => onEdit(model)}/>
          <FormActionButton type={'delete'} title={t('task.delete')} onClick={ () => onDelete(model)}/>
        </div>}
        </div>
        <div className={styles.company}>{model.company}</div>
        <div className={styles.description}>{model.description}</div>
        <div className={styles.actions}>
          {model.link && <Button href={model.link} size={'small'}>{t('cardPortfolio.visitWebsite')}</Button>}
        </div>
      </div>
    </div>
  )
}

export default CardWorkExperienceListItem
