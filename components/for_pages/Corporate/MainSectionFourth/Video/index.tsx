import styles from 'components/for_pages/Corporate/MainSectionFourth/Video/index.module.scss'
import { useTranslation } from 'next-i18next'
import React, { ReactElement } from 'react'
import ReactPlayer from 'react-player'
import PlayIcon from 'components/svg/PlayIcon'
import classNames from 'classnames'
import PlayIconAlt from 'components/svg/PlayIconAlt'

interface Props{
  url: string
  title: string
  className?: string
  style?: 'altIcon'
  playBtn?: ReactElement
}


const Video = (props: Props) => {

  const { t } = useTranslation('common')

  const getClassName = () => {
    return classNames(
      {
        [styles.altIcon]: props.style === 'altIcon'
      }
    )
  }


  return (
    <div className={classNames(styles.root, props.className, getClassName())}>
      <ReactPlayer
       url={props.url}
       light
       controls
       playIcon={props.style === 'altIcon' ? <PlayIconAlt/> : props.playBtn ? props.playBtn : <PlayIcon/>}
       width='100%'
       height='100%'
      />
      <div className={styles.title}>{props.title}</div>
    </div>
  )
}

export default Video
