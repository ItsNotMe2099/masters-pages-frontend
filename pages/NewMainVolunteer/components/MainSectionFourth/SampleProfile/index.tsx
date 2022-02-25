import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {useTranslation} from "i18n";
import { useState } from "react";
import cx from 'classnames'
import React from 'react'
import ReactPlayer from 'react-player'
import PlayIcon from "components/svg/PlayIcon";
import Button from "components/ui/Button";
import useSWR from "swr";
import { getMediaPath } from "utils/media";
import { formatSkillList } from "utils/skills";
import { getCategoryTranslation } from "utils/translations";
import Link from 'next/link'

interface IItem {
  image: string
  link: string
}

interface Props{
  item: IItem
}


const SampleProfile = ({item}: Props) => {

  const { t, i18n } = useTranslation('common')

  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src='/img/MainVolunteer/sample1.png' alt=''/>
      </div>
      <div>
        <div className={styles.spot}>
          {t('newMainVolunteer.spotOn')}
        </div>
        <Link href={item.link}>
        <a className={styles.viewProfile}>
          <img src='/img/icons/viewProfile.svg' alt=''/>
          <div>{t('profileComponent.viewProfile')}</div>
        </a>
        </Link>
      </div>
    </div>
  )
}

export default SampleProfile
