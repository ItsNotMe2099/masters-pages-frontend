import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import {useTranslation} from "i18n";
import React from 'react'
import Video from "./Video";
import SampleProfile from "./SampleProfile";
import Button from "components/ui/Button";
import useSWR from "swr";


const MainSectionFourth = (props) => {
  
  const { t } = useTranslation('common')

  const videos = [{url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U', title: 'What is master profile'},
  {url: 'https://www.youtube.com/watch?v=COHQ-10xnvc', title: 'Calendar'},
  {url: 'https://www.youtube.com/watch?v=COHQ-10xnvc', title: 'Calendar'}]

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
export const getServerSideProps = getAuthServerSide();
export default MainSectionFourth
