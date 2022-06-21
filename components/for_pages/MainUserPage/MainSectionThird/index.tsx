import styles from 'components/for_pages/MainUserPage/MainSectionThird/index.module.scss'
import { useTranslation } from 'next-i18next'
import MainSlider from 'components/for_pages/MainUserPage/MainSectionThird/Slider'


const MainSectionThird = (props) => {

  const { t } = useTranslation('common')


  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <MainSlider/>
      </div>
      <div className={styles.bgRect}></div>
    </div>
  )
}
export default MainSectionThird
