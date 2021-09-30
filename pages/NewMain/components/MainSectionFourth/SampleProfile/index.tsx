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

interface Props{
  image: string
  category: string
  subcategories: any[]
}


const SampleProfile = (props: Props) => {
  
  const { t } = useTranslation('common')


  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={props.image} alt=''/>
      </div>
      <div className={styles.info}>
        <div className={styles.category}>
          / {props.category}
        </div>
        <div className={styles.subcategories}>
          {props.subcategories.map(item =>
            <div className={styles.item}>
              {item.name}
            </div>
          )}
        </div>
      </div>
      <div className={styles.view}>
        <div className={styles.viewProfile}>
          <img src='/img/icons/viewProfile.svg' alt=''/>
          <div>{t('profileComponent.viewProfile')}</div>
        </div>
      </div>
    </div>
  )
}

export default SampleProfile
