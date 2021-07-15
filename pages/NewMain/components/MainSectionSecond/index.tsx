import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import Slider from "react-slick";
import SlideWithCards from 'pages/NewMain/components/MainSectionSecond/components/SlideWithCards'
import React, {useState} from 'react'
import SliderControl from 'components/ui/SliderControl'
import MainSliderControl from 'pages/NewMain/components/MainSliderControl'
import LastSlide from 'pages/NewMain/components/MainSectionSecond/components/LastSlide'
import {useTranslation} from "react-i18next";

const Title = (props) => {
  const title = ['A', 'C', 'T', 'N', 'O', 'W' ]
  return (
    <div className={`${styles.title} ${props.isLast && styles.titleLast}`}>

      <div className={styles.titleContainer}>      <div className={styles.titleWrapper}>{title.map((char, i) =>{
    return  <>{i === 3 ? <>&nbsp;&nbsp;&nbsp;</> : ''}{i == props.index ? <span className={styles.titleHighlight}>{char}</span> : <>{char}</>}</>

      })}</div></div></div>
  )
}

const MainSectionSecond = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation('common')
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: `${styles.dots}`,
    nextArrow: <MainSliderControl direction='next'/>,
    prevArrow: <MainSliderControl direction='prev' />,
    beforeChange: (oldIndex, newIndex) => setCurrentIndex(newIndex)
  };
  const slides = [
    {
      title: t('mainPage.secondSection.firstSlide.title'),
      description: t('mainPage.secondSection.firstSlide.description'),
      icons: [
        {icon: 'story.svg', text: t('mainPage.secondSection.firstSlide.icons.text1')},
        {icon: 'education.svg', text: t('mainPage.secondSection.firstSlide.icons.text2')},
        {
          icon: 'post.svg',
          text: t('mainPage.secondSection.firstSlide.icons.text3')
        },
        {
          icon: 'speaker.svg',
          text: t('mainPage.secondSection.firstSlide.icons.text4')
        },
        {icon: 'emotions.svg', text: t('mainPage.secondSection.firstSlide.icons.text5')},
        {icon: 'underwriting.svg', text: t('mainPage.secondSection.firstSlide.icons.text6')},
        {icon: 'pages.svg', text: t('mainPage.secondSection.firstSlide.icons.text7')},

      ]
    },
    {
      title: t('mainPage.secondSection.secondSlide.title'),
      description: t('mainPage.secondSection.secondSlide.description'),
      icons: [
        {icon: 'chat.svg', text: t('mainPage.secondSection.secondSlide.icons.text1')},
        {icon: 'partnership.svg', text: t('mainPage.secondSection.secondSlide.icons.text2')},
        {
          icon: 'report.svg',
          text: t('mainPage.secondSection.secondSlide.icons.text3')
        },
        {
          icon: 'send.svg',
          text: t('mainPage.secondSection.secondSlide.icons.text4')
        },
        {icon: 'reviews.svg', text: t('mainPage.secondSection.secondSlide.icons.text5')},

      ]
    },
    {
      title: t('mainPage.secondSection.thirdSlide.title'),
      description: t('mainPage.secondSection.thirdSlide.description'),

      icons: [
        {icon: 'time.svg', text: t('mainPage.secondSection.thirdSlide.icons.text1')},
        {icon: 'reminders.svg', text: t('mainPage.secondSection.thirdSlide.icons.text2')},
        {
          icon: 'plan.svg',
          text: t('mainPage.secondSection.thirdSlide.icons.text3')
        },

      ]
    },

    {
      title: t('mainPage.secondSection.fourthSlide.title'),
      description: t('mainPage.secondSection.fourthSlide.description'),
      icons: [
        {icon: 'files.svg', text: t('mainPage.secondSection.fourthSlide.icons.text1')},

      ]
    },
    {
      title: t('mainPage.secondSection.fifthSlide.title'),
      description: t('mainPage.secondSection.fifthSlide.description'),
      icons: [
        {icon: 'fields.svg', text: t('mainPage.secondSection.fifthSlide.icons.text1')},
        {icon: 'sort.svg', text: t('mainPage.secondSection.fifthSlide.icons.text2')},
        {icon: 'star.svg', text: t('mainPage.secondSection.fifthSlide.icons.text3')},
        {icon: 'report.svg', text: t('mainPage.secondSection.fifthSlide.icons.text4')},

      ]
    },
  ]

  return (
    <div className={styles.root}  style={{backgroundImage: `url(/img/Main/bg/second_${currentIndex === 0 ? 1 : currentIndex}_${Math.floor(Math.random() * 4) + 1 }.png)`}}>
      <Title index={currentIndex} isLast={currentIndex === 5}/>
      <Slider {...settings}>
        {slides.map((slide, index) => <SlideWithCards index={index} title={slide.title} description={slide.description} icons={slide.icons}/>)}
        <LastSlide/>
      </Slider>
    </div>
  )
}
export const getServerSideProps = getAuthServerSide();
export default MainSectionSecond
