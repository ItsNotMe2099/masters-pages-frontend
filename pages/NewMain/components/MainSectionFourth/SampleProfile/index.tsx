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

interface Props{
  item: any
}


const SampleProfile = ({item}: Props) => {
  
  const { t, i18n } = useTranslation('common')

  const categories = formatSkillList(item.skills)

  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img className={styles.small} src={getMediaPath(item.photoObject.urlS3)} alt=''/>
      </div>
      <div className={styles.info}>
        {categories.map(category => 
          <div className={styles.category}>
            {`${getCategoryTranslation(category.mainCategory, i18n.language)?.name || ''}/${getCategoryTranslation(category.category, i18n.language).name}`}
          </div>)}
        <div className={styles.subcategories}>
          {categories.map(item =>
            item.skills.map(skill => 
              <div className={styles.item}>
                {getCategoryTranslation(skill.subCategory, i18n.language).name}
              </div>
            )
          )}
        </div>
      </div>
      <div className={styles.view}>
        <Link href={`/id${item.id}`}>
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
