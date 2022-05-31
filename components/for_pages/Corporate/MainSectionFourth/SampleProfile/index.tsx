
import styles from 'components/for_pages/Corporate/MainSectionFourth/SampleProfile/index.module.scss'
import { useTranslation } from 'next-i18next'
import React from 'react'
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
