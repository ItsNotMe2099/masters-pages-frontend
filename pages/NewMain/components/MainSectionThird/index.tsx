import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import MainSectionButton from 'pages/NewMain/components/Button'
import { useSelector, useDispatch } from 'react-redux'
import {signUpOpen} from 'components/Modal/actions'
import MainSliderControl from 'pages/NewMain/components/MainSliderControl'
import {useState} from 'react'
const ListItem = ({label, isActive}: {label: string, isActive: boolean}) => {
  return (<div className={`${styles.listItem} ${isActive && styles.listItemActive}`}>
    <img src={'/img/Main/icons/mark.svg'}/> {label}
  </div>)
}

const MainSectionThird = (props) => {

  const dispatch = useDispatch()
  const [currentIndex, setCurrentIndex] = useState(0);
  const features = [
    'Tell your story or pitch your services in text of video',
    'Present your credentials – Education, Professional experiences',
    'Brag your achievements – Post pictures, videos of things you made, or services your rendered',
    'Let others speak for you - every job you do, every service you render makes someone happy.',

    'Tell your story or pitch your services in text of video',
    'Present your credentials – Education, Professional experiences',
    'Brag your achievements – Post pictures, videos of things you made, or services your rendered',
    'Let others speak for you - every job you do, every service you render makes someone happy.'

  ]
  const handleNextClick = () => {
    console.log(" features.length",  features)
    setCurrentIndex(index => index === features.length - 1 ? 0 : index + 1);
  }


  return (
    <div className={`${styles.root} ${currentIndex > 3 && styles.rootRight }`}>
      { currentIndex <= 3 && <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.title}>Here is how it works</div>
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
          <div className={styles.title}>Here is how it works</div>
          <div className={styles.list}>
            {[...features].splice(3, 4).map((feature, index) => <ListItem label={feature} isActive={(index + 4) === currentIndex}/>)}


          </div>
          {/*<MainSectionButton onClick={() => dispatch(signUpOpen())}>Free sign up</MainSectionButton>*/}
        </div>
      </div>}
      <MainSliderControl className={styles.arrowNext} onClick={handleNextClick} white={true} direction={'next'}/>
      <div className={styles.footer}/>
    </div>
  )
}
export const getServerSideProps = getAuthServerSide();
export default MainSectionThird
