import styles from 'components/for_pages/Corporate/MainSectionFourth/index.module.scss'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import Video from 'components/for_pages/Corporate/MainSectionFourth/Video'
import SampleProfile from 'components/for_pages/MainUserPage/MainSectionFourth/SampleProfile'
import MainSectionButton from 'components/for_pages/Corporate/Button'
import { useDispatch } from 'react-redux'
import { signUpOpen } from 'components/Modal/actions'
import { IProfile } from 'data/intefaces/IProfile'
import ProfileRepository from 'data/repositories/ProfileRepostory'

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

  const videos = [{url: 'https://youtu.be/FMa-WUJKw0k', title: 'How to set up an organisation\' profile'},
  {url: 'https://youtu.be/6uzJXmxIJ8U', title: t('mainPage.fourthSection.videos.secondVideo')},]

  const url = '/api/profile/for-main-page'
  //const { data: data } = useSWR(url)

  const [data, setData] = useState<IProfile[]>([])

  useEffect(() => {
    ProfileRepository.fetchProfilesForMainPage().then(data => {
      if(data){
        setData(data)
      }
    })
  }, [])

  const reviews = [
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
      <div className={styles.separator}></div>
      <div className={styles.profiles}>
        <div className={styles.title}>{t('newMainVolunteer.sampleProfiles')}</div>
        {data && data.slice(0, 3).map(item =>
          <SampleProfile item={item}/>
        )}
      </div>
      <div className={styles.separator}></div>
      <div className={styles.reviews}>
        <div className={styles.title}>{t('newMainVolunteer.customerReviews')}</div>
        {reviews.map((item, index) =>
          <Review item={item} key={index}/>
        )}
      </div>
      </div>
      <div className={styles.btns}>
            <MainSectionButton size="normal" color="outlineRed" href='/guestpage'>{t('newMainVolunteer.guestAccess')}</MainSectionButton>
            <MainSectionButton size="normal" color="red" onClick={() => dispatch(signUpOpen())}>{t('newMainVolunteer.freeSignUp')}</MainSectionButton>
      </div>
    </div>
  )
}
export default MainSectionFourth
