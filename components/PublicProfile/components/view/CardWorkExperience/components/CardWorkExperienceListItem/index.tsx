import styles from './index.module.scss'

import {ProfileData, ProfileWorkExperience} from 'types'
import UserIcon from 'components/svg/UserIcon'
import Button from 'components/PublicProfile/components/Button'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import {format, formatDistanceStrict, formatDistanceToNowStrict, parse} from 'date-fns'
import {formatDate, parseDate} from 'utils/formatters'
import {getMediaPath} from 'utils/media'

interface Props{
  model: ProfileWorkExperience,
  onEdit: (model) => void,
  onDelete: (model) => void,
  isEdit: boolean
}
const CardWorkExperienceListItem = ({model, isEdit, onEdit, onDelete}: Props) => {

  const getDuration = () => {
    if(model.fromDate && model.toDate){
      console.log("Duration format", model.fromDate, parseDate(model.fromDate), model.toDate,parseDate(model.toDate));
      return `from ${formatDate(model.fromDate)} - ${formatDate(model.toDate)} - ${formatDistanceStrict(parseDate(model.fromDate), parseDate(model.toDate))}`;
    }else if(model.fromDate){
      return `from ${formatDate(model.fromDate)} to now - ${formatDistanceToNowStrict(parseDate(model.fromDate))}`;
    }else if(model.toDate){
      return `until ${formatDate(model.toDate)}`;
    }
  }
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
          <FormActionButton type={'edit'} title={'Edit'} onClick={ () => onEdit(model)}/>
          <FormActionButton type={'delete'} title={'Delete'} onClick={ () => onDelete(model)}/>
        </div>}
        </div>
        <div className={styles.company}>{model.company}</div>
        <div className={styles.description}>{model.description}</div>
        <div className={styles.actions}>
          {model.link && <Button href={model.link} size={'small'}>Visit website</Button>}
        </div>
      </div>
    </div>
  )
}

export default CardWorkExperienceListItem
