import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import Slider from "react-slick";
import SlideWithCards from 'pages/NewMain/components/MainSectionSecond/components/SlideWithCards'
import React, {useState} from 'react'
import SliderControl from 'components/ui/SliderControl'
import MainSliderControl from 'pages/NewMain/components/MainSliderControl'
import LastSlide from 'pages/NewMain/components/MainSectionSecond/components/LastSlide'

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
      title: `Advertise and tell the world about
            yourself – Yourname.MastersPages`,
      description: `Every diamond shines best in its own ring – every person and every
            profession requires a tailored approach to make their creativity and skills glow.`,
      icons: [
        {icon: 'story.svg', text: 'Tell your story or pitch your services in text of video'},
        {icon: 'education.svg', text: 'Present your credentials – Education, Professional experiences'},
        {
          icon: 'post.svg',
          text: 'Brag your achievements – Post pictures, videos of things you made, or services your rendered'
        },
        {
          icon: 'speaker.svg',
          text: 'Let others speak for you - every job you do, every service you render makes someone happy.'
        },
        {icon: 'emotions.svg', text: 'Give your customers the pleasure of sharing their gratitude.'},
        {icon: 'underwriting.svg', text: 'Underwriting – publish verified references and reviews of your works.'},
        {icon: 'pages.svg', text: 'Underwriting – publish verified references and reviews of your works'},

      ]
    },
    {
      title: `Communicate with your clients in one place – Messages.MastersPages`,
      description: `Let MastersPages bring order and organization to your business communications with clients.
Everything relating to your business is stored in one place. Nothing is omitted or forgotten, any
information is one-click-away.`,
      icons: [
        {icon: 'chat.svg', text: 'Use MastersPages to chat and negotiate with your clients in one place'},
        {icon: 'partnership.svg', text: 'Use effective deal closing format, which clearly fixes main features of your engagement and\n' +
            'consent of both parties - no chance for ambiguity'},
        {
          icon: 'report.svg',
          text: 'Report your execution and get confirmations and acceptance'
        },
        {
          icon: 'send.svg',
          text: 'Automatically send updates to your faithful customer base'
        },
        {icon: 'reviews.svg', text: 'Collect your customers feedback and reviews'},

      ]
    },
    {
      title: `“Time is money”`,
      description: `. It is impossible to beat this famous quote by Benjamin Franklin, who was known for
his productivity and various talents. In his 84 years, he became not only a prominent politician and
diplomat, but also an actor, musician, inventor, and satirist.

Plan and co-ordinate your work, make time work for you and take full control of the 4th dimension with
MastersPages integrated time-management system:`,
      icons: [
        {icon: 'time.svg', text: 'Co-ordinate your time with your customers'},
        {icon: 'reminders.svg', text: 'Get remainders and impress your customers with your timekeeping'},
        {
          icon: 'plan.svg',
          text: 'Plan ahead of make the most of 24h'
        },

      ]
    },

    {
      title: `Note your jobs – Tasks.MastersPages`,
      description: `Every job you make changes the Word. It’s worthwhile taking notes of what you’ve done.
MastersPages helps navigate in the universe of your tasks and recollect all details:`,
      icons: [
        {icon: 'files.svg', text: 'Attach files to your jobs – Photos, Videos, documents, budgets, calculations, external links'},

      ]
    },
    {
      title: `Organize your records – Reports.MastersPages`,
      description: `Creativity and Diligence lead to customers and orders. Keeping track or jobs and payments could become messy as success grows. MastersPages remembers every hour you spent, every job you made,
every order you delivered. Use MastesPages reporting system to store, retrieve and report your statistics:`,
      icons: [
        {icon: 'fields.svg', text: 'Customized fields'},
        {icon: 'sort.svg', text: 'Sorted by clients, services, time'},
        {icon: 'star.svg', text: 'Retrievable is most popular formats'},
        {icon: 'report.svg', text: 'Reporting and statistics made easy'},

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
