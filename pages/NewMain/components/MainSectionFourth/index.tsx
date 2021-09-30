import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {useTranslation} from "i18n";
import { useState } from "react";
import cx from 'classnames'
import React from 'react'
import ReactPlayer from 'react-player'
import PlayIcon from "components/svg/PlayIcon";
import Video from "./Video";
import SampleProfile from "./SampleProfile";
import Button from "components/ui/Button";


const MainSectionFourth = (props) => {
  
  const { t } = useTranslation('common')

  const videos = [{url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U', title: 'What is master profile'},
  {url: 'https://www.youtube.com/watch?v=COHQ-10xnvc', title: 'Calendar'},
  {url: 'https://www.youtube.com/watch?v=COHQ-10xnvc', title: 'Calendar'}]

  const samples = [{image: '/img/Main/sample1.png', imageLarge: '/img/Main/sample1L.png', category: 'Manicurist profiles', 
  subcategories: [{name: 'Airbrush on nails'}, {name: 'Children’s manicure'}, {name: 'Classic manicure'}, {name: 'European manicure'},
  {name: 'Combo manicure'}, {name: 'Correction on gel Polish'}, {name: 'French manicure'}]},
  {image: '/img/Main/sample2.png', imageLarge: '/img/Main/sample2L.png', category: 'Manicurist profiles', 
  subcategories: [{name: 'Airbrush on nails'}, {name: 'Children’s manicure'}, {name: 'Classic manicure'}, {name: 'European manicure'},
  {name: 'Combo manicure'}, {name: 'Correction on gel Polish'}, {name: 'French manicure'}]},
  {image: '/img/Main/sample3.png', imageLarge: '/img/Main/sample3L.png', category: 'Manicurist profiles', 
  subcategories: [{name: 'Airbrush on nails'}, {name: 'Children’s manicure'}, {name: 'Classic manicure'}, {name: 'European manicure'},
  {name: 'Combo manicure'}, {name: 'Correction on gel Polish'}, {name: 'French manicure'}]},
  {image: '/img/Main/sample4.png', imageLarge: '/img/Main/sample4L.png', category: 'Manicurist profiles', 
  subcategories: [{name: 'Airbrush on nails'}, {name: 'Children’s manicure'}, {name: 'Classic manicure'}, {name: 'European manicure'},
  {name: 'Combo manicure'}, {name: 'Correction on gel Polish'}, {name: 'French manicure'}]}]


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
        {samples.map(item => 
          <SampleProfile image={item.image} category={item.category} subcategories={item.subcategories} imageLarge={item.imageLarge}/>
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
