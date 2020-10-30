import styles from './index.module.scss'
import Link from 'next/link'
import CategoryItem from './CategoryItem'
import Button from 'components/ui/Button'

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
  return (
    <div className={styles.root}>
      <div className={styles.title}>Найдите своего специалиста</div>
      <div className={styles.list}>
        {options.map(({icon, color, name}) =>  <CategoryItem image={icon} color={color}text={name}/>)}
      </div>
      <div className={styles.wrapper}>
        <div className={styles.btnContainer}>
          <Button black size="15px 25px">Все категории</Button>
        </div>
      </div>
    </div>
  )
}
