import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {useTranslation} from "i18n";
interface Props{

}

const LastSlide = (props: Props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  return (
    <div className={styles.root}>

      <div className={styles.container}>
        <div className={styles.title}><span className={styles.titleFirst}>{t('mainPage.labels.wow')}</span> {t('mainPage.effect')}</div>
        <div className={styles.description}>{t('mainPage.helpImpress')}</div>
        <div className={styles.subTitle}>{t('mainPage.thrill')}</div>
        {/*<MainSectionButton onClick={() => dispatch(signUpOpen())}>Free sign up</MainSectionButton>*/}
      </div>
    </div>
  )
}
export default LastSlide
