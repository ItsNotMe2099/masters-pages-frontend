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
const DotItem = ({index, isActive, onClick}: {index: number, isActive: boolean, onClick: () => void}) => {
  return (<div className={`${styles.dotItem} ${isActive && styles.dotItemActive}`} onClick={onClick}>
    <button>{index}</button>
  </div>)
}

const MainSectionThird = (props) => {

  const dispatch = useDispatch()
  const [currentIndex, setCurrentIndex] = useState(0);
  const features = [
    'Create your account on MastersPages.com (Sign Up)',
    'Fill in your Master’s profile / Share your profile link via your advertising efforts (Facebook, Instagram, banners, tap-link, etc)',
    'Invite your customers to join your community on MastersPages',
    'Plan your tasks or get service requests from your customers',

    'Update your profile and Publish your works regularly',
    'Collect reviews',
    'Get new orders from new customers',
    'Enjoy the luxury of smooth, organized work flow and concentrate on your skills and creativity – MastersPages takes care of the hustle'

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
