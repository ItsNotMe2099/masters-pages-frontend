import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import {useTranslation} from "i18n";
import React from 'react'
import Video from "./Video";
import SampleProfile from "./SampleProfile";
import Button from "components/ui/Button";
import useSWR from "swr"
import MainSectionButton from "pages/NewMainVolunteer/components/Button";
import { useSelector, useDispatch } from 'react-redux'
import { signUpOpen } from "components/Modal/actions";

interface IReview {
  image: string
  name: string
  text: string
}

interface ReviewProps {
  item: IReview
}


const MainSectionFourth = (props) => {
  
  const { t } = useTranslation('common')

  const dispatch = useDispatch()

  const videos = [{url: 'https://youtu.be/bFahL1qBliU', title: t('mainPage.fourthSection.videos.firstVideo')},
  {url: 'https://youtu.be/6uzJXmxIJ8U', title: t('mainPage.fourthSection.videos.secondVideo')},]

  const url = '/api/profile/for-main-page'
  //const { data: data } = useSWR(url)

  const data = [
    {image: '/img/MainVolunteer/sample1.png', link: '#'},
    {image: '/img/MainVolunteer/sample1.png', link: '#'},
    {image: '/img/MainVolunteer/sample1.png', link: '#'},
  ]

  const reviews = [
    {image: '/img/MainVolunteer/reviews-avatar.png', name: 'Mark Smith', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis sed orci in nec luctus fermentum et. Ac pulvinar in ac eros, lectus viverra urna. Mauris suscipit proin libero,'},
    {image: '/img/MainVolunteer/reviews-avatar.png', name: 'Mark Smith', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis sed orci in nec luctus fermentum et. Ac pulvinar in ac eros, lectus viverra urna. Mauris suscipit proin libero,'},
    {image: '/img/MainVolunteer/reviews-avatar.png', name: 'Mark Smith', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis sed orci in nec luctus fermentum et. Ac pulvinar in ac eros, lectus viverra urna. Mauris suscipit proin libero,'},
  ]

  const Review = ({item}: ReviewProps) => {
    return (
      <div className={styles.review}>
        <div className={styles.top}>
          <div className={styles.avatar}>
            <img src={item.image} alt=''/>
          </div>
          <div className={styles.name}>
            {item.name}
          </div>
        </div>
        <div className={styles.text}>
          {item.text}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
      <div className={styles.videos}>
        <div className={styles.title}>{t('mainPage.fourthSection.discoverMore')}</div>
        {videos.map(video =>
          <div className={styles.video}>
            <Video url={video.url} title={video.title}/>
          </div>
        )}
      </div>
      <div className={styles.profiles}>
        <div className={styles.title}>{t('newMainVolunteer.sampleProfiles')}</div>
        {data && data.map(item => 
          <SampleProfile item={item}/>
        )}
      </div>
      <div className={styles.reviews}>
        <div className={styles.title}>{t('newMainVolunteer.customerReviews')}</div>
        {reviews.map((item, index) => 
          <Review item={item} key={index}/>
        )}
      </div>
      </div>
      <div className={styles.btns}>
            <MainSectionButton size="normal" color="outlineRed" onClick={() => dispatch(signUpOpen())}>{t('newMainVolunteer.guestAccess')}</MainSectionButton>
            <MainSectionButton size="normal" color="red" onClick={() => dispatch(signUpOpen())}>{t('newMainVolunteer.freeSignUp')}</MainSectionButton>
      </div>
    </div>
  )
}
export const getServerSideProps = getAuthServerSide();
export default MainSectionFourth
