import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import MainSectionButton from 'pages/NewMain/components/Button'
import { useSelector, useDispatch } from 'react-redux'
import {signUpOpen} from 'components/Modal/actions'
import MainSliderControl from 'pages/NewMain/components/MainSliderControl'
import {useState} from 'react'
import {useTranslation} from "react-i18next";
const ListItem = ({label, isActive}: {label: string, isActive: boolean}) => {
  return (<div className={`${styles.listItem} ${isActive && styles.listItemActive}`}>
    <img src={'/img/Main/icons/mark.svg'}/> {label}
  </div>)
}
const DotItem = ({index, isActive, onClick}: {index: number, isActive: boolean, onClick: () => void}) => {
  return (<div className={`${styles.dotItem} ${isActive && styles.dotItemActive}`} onClick={onClick}>
    <button>{index}</button>
  </div>)
}

const MainSectionThird = (props) => {

  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const [currentIndex, setCurrentIndex] = useState(0);
  const features = [
    t('mainPage.thirdSection.features.text1'),
    t('mainPage.thirdSection.features.text2'),
    t('mainPage.thirdSection.features.text3'),
    t('mainPage.thirdSection.features.text4'),

    t('mainPage.thirdSection.features.text5'),
    t('mainPage.thirdSection.features.text6'),
    t('mainPage.thirdSection.features.text7'),
    t('mainPage.thirdSection.features.text8')

  ]
  const handleNextClick = () => {
    console.log(" features.length",  features)
    setCurrentIndex(index => index === features.length - 1 ? 0 : index + 1);
  }


  return (
    <div className={`${styles.root} ${currentIndex > 3 && styles.rootRight }`}>
      { currentIndex <= 3 && <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.title}>{t('mainPage.howItWorks')}</div>
          <div className={styles.list}>
            {[...features].splice(0, 4).map((feature, index) => <ListItem label={feature} isActive={index === currentIndex}/>)}

          </div>
          {/*<MainSectionButton onClick={() => dispatch(signUpOpen())}>Free sign up</MainSectionButton>*/}
        </div>
        <div className={styles.rightSide}>
          <img className={styles.monitor} src={'/img/Main/monitor.png'}/>
        </div>
      </div>}

      { currentIndex > 3 && <div className={styles.container}>
        <div className={styles.rightSide}>
          <img className={styles.monitor} src={'/img/Main/monitor.png'}/>
        </div>
        <div className={styles.leftSide}>
          <div className={styles.title}>{t('mainPage.howItWorks')}</div>
          <div className={styles.list}>
            {[...features].splice(4, 4).map((feature, index) => <ListItem label={feature} isActive={(index + 4) === currentIndex}/>)}


          </div>
          {/*<MainSectionButton onClick={() => dispatch(signUpOpen())}>Free sign up</MainSectionButton>*/}
        </div>
      </div>}
      <MainSliderControl className={styles.arrowNext} onClick={handleNextClick} white={true} direction={'next'}/>
      <div className={styles.dots}>
        {Array.from(Array(features.length).keys()).map(index => <DotItem onClick={() => setCurrentIndex(index)} index={index} isActive={index === currentIndex}/>)}
      </div>
      <div className={styles.footer}/>
    </div>
  )
}
export const getServerSideProps = getAuthServerSide();
export default MainSectionThird
