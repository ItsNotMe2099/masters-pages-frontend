import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import Slider from "react-slick";
import SlideWithCards from 'pages/old//MainPage/components/MainSectionSecond/components/SlideWithCards'
import React, {useState} from 'react'
import SliderControl from 'components/ui/SliderControl'
import MainSliderControl from 'pages/NewMain/components/MainSliderControl'
import LastSlide from 'pages/old//MainPage/components/MainSectionSecond/components/LastSlide'
import {useTranslation} from "i18n";
import cx from 'classnames'
import Profile from 'components/svg/Profile'
import Orders from 'components/svg/Orders'
import Calendar from 'components/svg/Calendar'
import News from 'components/svg/News'
import Messages from "components/svg/Messages";
import Reports from "components/svg/Reports";

interface Props {
  onClick?: () => void
}

const MainSlider = (props: Props) => {

  const { t } = useTranslation('common')
  const [currentIndex, setCurrentIndex] = useState(0);
  const [active, setIsActive] = useState('profile')

  const features = [
    {label: t('mainPage.thirdSection.features.profile'), svg: <Profile/>, name: 'profile', image: '/img/Main/Slider/profileM.png'},
    {label: t('mainPage.thirdSection.features.orders'), svg: <Orders/>, name: 'orders',  image: '/img/Main/Slider/profileM.png'},
    {label: t('mainPage.thirdSection.features.calendar'), svg: <Calendar/>, name: 'calendar',  image: '/img/Main/Slider/profileM.png'},
    {label: t('mainPage.thirdSection.features.news'), svg: <News/>, name: 'news',  image: '/img/Main/Slider/profileM.png'},
    {label: t('mainPage.thirdSection.features.messages'), svg: <Messages/>, name: 'messages',  image: '/img/Main/Slider/profileM.png'},
    {label: t('mainPage.thirdSection.features.reports'), svg: <Reports/>, name: 'reports',  image: '/img/Main/Slider/profileM.png'}
  ]

  const list = [{label: 'BIO'}, {label: 'Pitch'}, {label: 'Languages'}, {label: 'Education'}, {label: 'Locations'},
  {label: 'Experience'}, {label: 'Reviews'}, {label: 'Portfolio'}]

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <MainSliderControl direction='next'/>,
    prevArrow: <MainSliderControl direction='prev'/>,
    beforeChange: (oldIndex, newIndex) => setCurrentIndex(newIndex),
  };
  const slides = [
    {
      image: '/img/Main/Slider/profile.png'
    },
    {
      image: '/img/Main/Slider/profile.png'
    },
    {
      image: '/img/Main/Slider/profile.png'
    },
    {
      image: '/img/Main/Slider/profile.png'
    },
    {
      image: '/img/Main/Slider/profile.png'
    },
    {
      image: '/img/Main/Slider/profile.png'
    }
  ]

  return (
    <div className={styles.root}>
      <div className={styles.list}>
      <div className={styles.tools}>
        {t('mainPage.thirdSection.slider.tools')}
      </div>
        {[...features].map((feature, index) => 
        <div className={cx(styles.item, {[styles.active]: index === currentIndex})}>
          {feature.svg}
          <div className={styles.label}>{feature.label}</div>
        </div>)}
        {[...features].map((feature, index) => 
        <div className={cx(styles.itemMobile, {[styles.active]: feature.name === active})} onClick={() => setIsActive(feature.name)}>
          <div className={styles.top}>
          {feature.svg}
          <div className={styles.label}>{feature.label}</div>
          </div>
          <div className={feature.name === active ? styles.bottom : styles.none} style={{backgroundImage: `url(${feature.image})`}}>    
          </div>
          <div className={feature.name === active ? styles.list2 : styles.none}>
            {list.map(item => 
              <div className={styles.itemList}>
                <div>
                  <img src='/img/Main/icons/mark.svg' alt=''/>
                </div>
                <div className={styles.listLabel}>{item.label}</div>
              </div>
            )}
          </div>
        </div>)}
        <div className={styles.otherTools}>
        {t('mainPage.thirdSection.slider.otherTools')}
      </div>
      </div>
      <div className={styles.slider}>
      <Slider {...settings}>
        {slides.map((slide, index) => <div className={styles.slide}><img src={slide.image} alt=''/></div>)}
      </Slider>
      </div>
    </div>
  )
}

export default MainSlider
