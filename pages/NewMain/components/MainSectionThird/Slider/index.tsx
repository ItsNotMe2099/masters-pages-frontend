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
  const features = [
    {label: t('mainPage.thirdSection.features.profile'), svg: <Profile/>},
    {label: t('mainPage.thirdSection.features.orders'), svg: <Orders/>},
    {label: t('mainPage.thirdSection.features.calendar'), svg: <Calendar/>},
    {label: t('mainPage.thirdSection.features.news'), svg: <News/>},
    {label: t('mainPage.thirdSection.features.messages'), svg: <Messages/>},
    {label: t('mainPage.thirdSection.features.reports'), svg: <Reports/>}
  ]

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
