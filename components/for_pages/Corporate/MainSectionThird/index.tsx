import styles from 'components/for_pages/Corporate/MainSectionThird/index.module.scss'
import { useTranslation } from 'next-i18next'
import MainSlider from 'components/for_pages/Corporate/MainSectionThird/Slider'


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
