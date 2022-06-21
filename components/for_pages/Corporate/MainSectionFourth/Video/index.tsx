
import styles from 'components/for_pages/Corporate/MainSectionFourth/Video/index.module.scss'
import { useTranslation } from 'next-i18next'
import React from 'react'
import ReactPlayer from 'react-player'
import PlayIcon from 'components/svg/PlayIcon'

interface Props{
  url: string
  title: string
}


const Video = (props: Props) => {

  const { t } = useTranslation('common')


  return (
    <div className={styles.root}>
      <ReactPlayer
       url={props.url}
       light
       controls
       playIcon={<PlayIcon/>}
       width='100%'
       height='100%'
      />
      <div className={styles.title}>{props.title}</div>
    </div>
  )
}

export default Video
