import styles from 'components/for_pages/Corporate/MainSectionFourth/SampleProfile/index.module.scss'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { getMediaPath } from 'utils/media'
import Link from 'next/link'

interface Props{
  item: any
  type?: string
}


const SampleProfile = ({item, type}: Props) => {

  const { t, i18n } = useTranslation('common')

  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img className={styles.small} src={getMediaPath(item.photoObject?.urlS3)} alt=''/>
      </div>
      <div className={styles.view}>
        <div className={styles.type}>{type}</div>
        <Link href={`${item.profileLink || `/id${item.id}`}`}>
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
