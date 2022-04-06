import styles from './index.module.scss'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import {LanguagesList} from 'data/languages'
import { useTranslation } from 'next-i18next'
import classNames from 'classnames'

interface Props{
  index?: number
  model: string,
  onMoveUp?: (model, index) => void,
  onMoveDown?: (model, index) => void,
  onDelete?: (model, index) => void,
  isEdit?: boolean,
  className?: string
}
const LanguageListItem = (props: Props) => {
  const {  model, index, isEdit, onMoveUp, onMoveDown } = props
  const { t } = useTranslation('common')

  return (
    <div className={classNames(styles.root, props.className)}>
      <img className={styles.icon} src={`/img/icons/flags/${LanguagesList[model]?.icon || model}.svg`} alt=''/>
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
