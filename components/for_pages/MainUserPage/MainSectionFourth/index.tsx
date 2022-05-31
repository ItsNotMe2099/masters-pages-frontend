import styles from 'components/for_pages/MainUserPage/MainSectionFourth/index.module.scss'
import { useTranslation } from 'next-i18next'
import React from 'react'
import Video from 'components/for_pages/MainUserPage/MainSectionFourth/Video'
import SampleProfile from 'components/for_pages/MainUserPage/MainSectionFourth/SampleProfile'
import Button from 'components/ui/Button'
import useSWR from 'swr'


const MainSectionFourth = (props) => {

  const { t } = useTranslation('common')

  const videos = [{url: 'https://youtu.be/bFahL1qBliU', title: t('mainPage.fourthSection.videos.firstVideo')},
  {url: 'https://youtu.be/6uzJXmxIJ8U', title: t('mainPage.fourthSection.videos.secondVideo')},]

  const url = '/api/profile/for-main-page'
  const { data: data } = useSWR(url)

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
        <div className={styles.title}>{t('mainPage.fourthSection.sampleProfiles')}</div>
        {data && data.map(item =>
          <SampleProfile item={item}/>
        )}
        <div className={styles.btns}>
          <div className={styles.firstBtn}>
            <Button href='/SearchMasterPage' target='_self' outlineRed className={styles.findMaster}>{t('findMaster')}</Button>
          </div>
            <Button href='/SearchVolunteerPage' target='_self' outlineBlue className={styles.findMaster}>{t('findVolunteer')}</Button>
        </div>
      </div>
      </div>
    </div>
  )
}
export default MainSectionFourth
