import styles from 'components/for_pages/Corporate/MainSectionThird/Slider/index.module.scss'
import Slider from 'react-slick'
import React, {useState} from 'react'
import MainSliderControl from 'components/for_pages/MainUserPage/MainSliderControl'
import { useTranslation } from 'next-i18next'
import cx from 'classnames'
import Profile from 'components/svg/Profile'
import Calendar from 'components/svg/Calendar'
import News from 'components/svg/News'
import Messages from 'components/svg/Messages'
import Reports from 'components/svg/Reports'
import Case from 'components/svg/Case'
import Details from 'components/svg/Details'

interface Props {
  slider?: any
}

export default function MainSlider(props: Props) {


  const [currentIndex, setCurrentIndex] = useState(0)
  const [active, setIsActive] = useState('profile')

  const {t} = useTranslation('common')

  let { slider } = props

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <MainSliderControl direction='next'/>,
    prevArrow: <MainSliderControl direction='prev'/>,
    beforeChange: (current, next) => setCurrentIndex(next),
  }

  const features = [
    {label: t('newMainVolunteer.corporateProfile'), svg: <Profile/>, name: 'profile', image: '/img/MainVolunteer/Slider/profile.png',},
    {label: t('newMainVolunteer.volunteerAds'), svg: <Case/>, name: 'ads',  image: '/img/MainVolunteer/Slider/ads.png',},
    {label: t('newMainVolunteer.collection'), svg: <Details/>, name: 'collection',  image: '/img/MainVolunteer/Slider/collection.png',},
    {label: t('newMainVolunteer.chats'), svg: <Messages/>, name: 'messages',  image: '/img/MainVolunteer/Slider/messages.png',},
    {label: t('mainPage.thirdSection.features.calendar'), svg: <Calendar/>, name: 'calendar',  image: '/img/MainVolunteer/Slider/calendar.png',},
    {label: t('newMainVolunteer.reports'), svg: <Reports/>, name: 'reports',  image: '/img/MainVolunteer/Slider/reports.png',},
    {label: t('newMainVolunteer.news'), svg: <News/>, name: 'news',  image: '/img/MainVolunteer/Slider/news.png',},
  ]

  const slides = [
    {
      image: '/img/MainVolunteer/Slider/profile.png'
    },
    {
      image: '/img/MainVolunteer/Slider/ads.png',
    },
    {
      image: '/img/MainVolunteer/Slider/collection.png',
    },
    {
      image: '/img/MainVolunteer/Slider/messages.png',
    },
    {
      image: '/img/MainVolunteer/Slider/calendar.png',
    },
    {
      image: '/img/MainVolunteer/Slider/reports.png',
    },
    {
      image: '/img/MainVolunteer/Slider/news.png',
    }
  ]

  return (
    <div className={styles.root}>
      <div className={styles.list}>
      <div className={styles.tools}>
        {t('mainPage.thirdSection.slider.tools')}
      </div>
        {[...features].map((feature, index) =>
        <div onClick={() => slider.slickGoTo(index)}
        className={cx(styles.item, {[styles.active]: index === currentIndex})}>
          <div>{feature.svg}</div>
          <div className={styles.label}>{feature.label}</div>
        </div>)}
        {[...features].map((feature, index) =>
        <div className={cx(styles.itemMobile, {[styles.active]: feature.name === active})} onClick={() => setIsActive(feature.name)}>
          <div className={styles.top}>
          <div>{feature.svg}</div>
          <div className={styles.label}>{feature.label}</div>
          </div>
          <div className={feature.name === active ? styles.bottom : styles.none} style={{backgroundImage: `url(${feature.image})`}}>
          </div>
        </div>)}
        <div className={styles.otherTools}>
        {t('mainPage.thirdSection.slider.otherTools')}
      </div>
      </div>
      <div className={styles.slider}>
      <Slider {...settings} ref={slider1 => (slider = slider1)}>
        {slides.map((slide, index) => <div className={styles.slide}><img className={styles.mainImg} src={slide.image} alt=''/>
        </div>)}
      </Slider>
      </div>
    </div>
  )

}
