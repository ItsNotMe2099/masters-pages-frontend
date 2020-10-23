import styles from './index.module.scss'
import Link from 'next/link'
import CategoryItem from './CategoryItem'
import Button from 'components/ui/Button'

interface Props {}

export default function Categories(props: Props) {
  return (
    <>
      <div className={styles.title}>Найдите своего специалиста</div>
      <div className={styles.column}> 
      <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
        <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
        <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
        <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
      </div>
      <div className={styles.column}> 
      <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
        <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
        <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
        <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
      </div>
      <div className={styles.column}> 
      <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
        <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
        <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
        <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
      </div>
      <div className={styles.column__mobile}> 
      <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
        <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
        <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
        <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
        <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
        <Link href="/">
        <a>
        <CategoryItem image='img/icons/service.svg' color="#38C7D7" text='Сантехничесие услуги'/>
        </a>
        </Link>
      </div>
      <div className={styles.btnContainer}>
        <Button categoryBtn>Все категории</Button>
      </div>
    </>
  )
}
