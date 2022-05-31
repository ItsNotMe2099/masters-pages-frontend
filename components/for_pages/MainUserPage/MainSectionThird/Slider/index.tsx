import styles from 'components/for_pages/MainUserPage/MainSectionThird/Slider/index.module.scss'
import Slider from 'react-slick'
import React, {useState} from 'react'
import MainSliderControl from 'components/for_pages/MainUserPage/MainSliderControl'
import { useTranslation } from 'next-i18next'
import cx from 'classnames'
import Profile from 'components/svg/Profile'
import Orders from 'components/svg/Orders'
import Calendar from 'components/svg/Calendar'
import News from 'components/svg/News'
import Messages from 'components/svg/Messages'
import Reports from 'components/svg/Reports'

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
    {label: t('mainPage.thirdSection.features.profile'), svg: <Profile/>, name: 'profile', image: '/img/Main/Slider/profile.png',
    list: [{label: 'BIO'}, {label: 'Pitch'}, {label: 'Languages'}, {label: 'Education'}, {label: 'Locations'},
    {label: 'Experience'}, {label: 'Reviews'}, {label: 'Portfolio'}]},
    {label: t('mainPage.thirdSection.features.orders'), svg: <Orders/>, name: 'orders',  image: '/img/Main/Slider/orders.png',
    list: [{label: 'Find'}, {label: 'Negotiation'}, {label: 'Document'}]},
    {label: t('mainPage.thirdSection.features.calendar'), svg: <Calendar/>, name: 'calendar',  image: '/img/Main/Slider/calendar.png',
    list: [{label: 'Schedule'}, {label: 'Confirm'}, {label: 'Attach files'}, {label: 'Get reminders'}]},
    {label: t('mainPage.thirdSection.features.news'), svg: <News/>, name: 'news',  image: '/img/Main/Slider/news.png',
    list: [{label: 'Post photos'}, {label: 'Post videos'}, {label: 'Follow clients'}, {label: 'Collect comments and likes'}]},
    {label: t('mainPage.thirdSection.features.messages'), svg: <Messages/>, name: 'messages',  image: '/img/Main/Slider/messages.png',
    list: [{label: 'By Clients'}, {label: 'by Orders'}, {label: 'Send text and files'}]},
    {label: t('mainPage.thirdSection.features.reports'), svg: <Reports/>, name: 'reports',  image: '/img/Main/Slider/reports.png',
    list: [{label: 'by Orders'}, {label: 'by Clients'}, {label: 'by Profiles'}]},
  ]

  const slides = [
    {
      image: '/img/Main/Slider/profile.png',
      list: [{label: 'BIO'}, {label: 'Pitch'}, {label: 'Languages'}, {label: 'Education'}, {label: 'Locations'},
    {label: 'Experience'}, {label: 'Reviews'}, {label: 'Portfolio'}]
    },
    {
      image: '/img/Main/Slider/orders.png',
      list: [{label: 'Find'}, {label: 'Negotiation'}, {label: 'Document'}]
    },
    {
      image: '/img/Main/Slider/calendar.png',
      list: [{label: 'Schedule'}, {label: 'Confirm'}, {label: 'Attach files'}, {label: 'Get reminders'}]
    },
    {
      image: '/img/Main/Slider/news.png',
      list: [{label: 'Post photos'}, {label: 'Post videos'}, {label: 'Follow clients'}, {label: 'Collect comments and likes'}]
    },
    {
      image: '/img/Main/Slider/messages.png',
      list: [{label: 'By Clients'}, {label: 'by Orders'}, {label: 'Send text and files'}]
    },
    {
      image: '/img/Main/Slider/reports.png',
      list: [{label: 'by Orders'}, {label: 'by Clients'}, {label: 'by Profiles'}]
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
            {feature.list.map(item =>
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
      <Slider {...settings} ref={slider1 => (slider = slider1)}>
        {slides.map((slide, index) => <div className={styles.slide}><img className={styles.mainImg} src={slide.image} alt=''/>
        <div className={styles.listItem}>{slide.list.map(item =>
        <div className={styles.itemList__2}>
        <div>
          <img src='/img/Main/icons/mark.svg' alt=''/>
        </div>
        <div className={styles.listLabel}>{item.label}</div>
      </div>)}
        </div>
        </div>)}
      </Slider>
      </div>
    </div>
  )

}
