import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {useTranslation} from "i18n";
import { useState } from "react";
import cx from 'classnames'
import React from 'react'
import ReactPlayer from 'react-player'
import PlayIcon from "components/svg/PlayIcon";

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
