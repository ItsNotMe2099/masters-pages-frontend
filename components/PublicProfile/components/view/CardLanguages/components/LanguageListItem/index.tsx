import styles from './index.module.scss'
import {IProfilePreferWorkIn, ProfileData} from 'types'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import {LanguagesList} from 'data/languages'
import {useTranslation} from 'i18n'

interface Props{
  index: number
  model: string,
  onMoveUp: (model, index) => void,
  onMoveDown: (model, index) => void,
  onDelete: (model, index) => void,
  isEdit: boolean,
}
const LanguageListItem = (props: Props) => {
  const {  model, index, isEdit, onMoveUp, onMoveDown } = props;
  const { t } = useTranslation('common');
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={`/img/icons/flags/${LanguagesList[model].icon || model}.svg`} alt=''/>
      <div className={styles.name}>{LanguagesList[model]?.name || model}</div>
      {isEdit && <div className={styles.actions}>
        {onMoveDown && <FormActionButton type={'moveDown'} title={t('down')} onClick={() => onMoveDown(model, index)}/>}
        {onMoveUp && <FormActionButton type={'moveUp'} title={t('up')} onClick={() => onMoveUp(model, index)}/>}
        <FormActionButton type={'delete'} title={t('task.delete')} onClick={() => props.onDelete(model, index)}/>
      </div>}
    </div>
  )
}

export default LanguageListItem
