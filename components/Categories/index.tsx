import styles from './index.module.scss'
import CategoryItem from './CategoryItem'
import Button from 'components/ui/Button'
import { useTranslation } from 'next-i18next'

interface Props {}

export default function Categories(props: Props) {
  const options = [
    { icon: 'img/icons/service.svg', name: 'Сантехничесие услуги', color: '#38C7D7' },
    { icon: 'img/icons/service.svg', name: 'Сантехничесие услуги', color: '#38C7D7' },
    { icon: 'img/icons/service.svg', name: 'Сантехничесие услуги', color: '#38C7D7' },
    { icon: 'img/icons/service.svg', name: 'Сантехничесие услуги', color: '#38C7D7' },
    { icon: 'img/icons/service.svg', name: 'Сантехничесие услуги', color: '#38C7D7' },
    { icon: 'img/icons/service.svg', name: 'Сантехничесие услуги', color: '#38C7D7' },
    { icon: 'img/icons/service.svg', name: 'Сантехничесие услуги', color: '#38C7D7' },
    { icon: 'img/icons/service.svg', name: 'Сантехничесие услуги', color: '#38C7D7' },
    { icon: 'img/icons/service.svg', name: 'Сантехничесие услуги', color: '#38C7D7' },
    { icon: 'img/icons/service.svg', name: 'Сантехничесие услуги', color: '#38C7D7' },
    { icon: 'img/icons/service.svg', name: 'Сантехничесие услуги', color: '#38C7D7' },
    { icon: 'img/icons/service.svg', name: 'Сантехничесие услуги', color: '#38C7D7' },
    { icon: 'img/icons/service.svg', name: 'Сантехничесие услуги', color: '#38C7D7' },
    { icon: 'img/icons/service.svg', name: 'Сантехничесие услуги', color: '#38C7D7' },
  ]
  const { t } = useTranslation('common')
  return (
    <div className={styles.root}>
      <div className={styles.title}>{t('categories.findSpecialist')}</div>
      <div className={styles.list}>
        {options.map(({icon, color, name}) =>  <CategoryItem image={icon} color={color}text={name}/>)}
      </div>
      <div className={styles.wrapper}>
        <div className={styles.btnContainer}>
          <Button black size="15px 25px">{t('categories.allCategories')}</Button>
        </div>
      </div>
    </div>
  )
}
