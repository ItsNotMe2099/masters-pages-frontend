import styles from './index.module.scss'
import CardProfile from 'components/PublicProfile/components/view/CardProfile'
import CardPreferWorkIn from 'components/PublicProfile/components/view/CardPreferWorkIn'
import CardCategories from 'components/PublicProfile/components/view/CardCategories'
import CardLanguages from 'components/PublicProfile/components/view/CardLanguages'
import CardBio from 'components/PublicProfile/components/view/CardBio'
import CardReviewsShort from 'components/PublicProfile/components/view/CardReviewsShort'

import Modals from 'components/layout/Modals'

import {default as React, useState} from 'react'
import CardRecommendationsShort from 'components/PublicProfile/components/view/CardRecommendationsShort'
import Layout from 'components/layout/Layout'
import { useTranslation } from 'next-i18next'
import {IProfile} from 'data/intefaces/IProfile'


interface Props{
  profile: IProfile,
  isEdit: boolean,
  children?: any,
  subCategory: any,
  isCurrentProfileOpened?: boolean
  onCategoryChange: (categoryId, subCategoryId) => void
}
const ProfilePageLayout = (props: Props) => {
  const {profile, isEdit, onCategoryChange, subCategory, isCurrentProfileOpened} = props
  const isMaster = ['master', 'volunteer'].includes(profile.role)
  const [isOpen, setIsOpen] = useState(false)
  const {t} = useTranslation('common')
  const getRoleClass = () => {
    switch (profile.role) {
      case 'master':
        return styles.roleMaster
      case 'volunteer':
        return styles.roleVolunteer
      case 'client':
      default:
        return styles.roleClient
    }
  }
  return (
    <Layout isCurrentProfileOpened={isCurrentProfileOpened}  title={<>{t('lookingAt')}  <span className={getRoleClass()}>{t(profile.role)} {t('profile')}</span> {t('of')} {profile.firstName} {profile.lastName}</>}>

      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <CardProfile profile={profile} isEdit={isEdit}/>
          <div className={styles.desktop}>
          <CardPreferWorkIn profile={profile} isEdit={isEdit}/>
          {isMaster && <CardCategories profile={profile} isEdit={isEdit} onCategoryChange={onCategoryChange} subCategory={subCategory}/>}
          <CardLanguages profile={profile} isEdit={isEdit}/>
          {isMaster && <CardBio profile={profile} isEdit={isEdit}/>}
          {isMaster && <CardRecommendationsShort profile={profile}/>}
          <CardReviewsShort profile={profile} subCategory={subCategory}/>
          {/*<CardRewards profile={profile}/>*/}
          </div>
          <div className={styles.mobile}>
          <div className={styles.additionalInfo} onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)}>
            {t('personalArea.profile.additionalInfo')}
            <img className={isOpen && styles.reverse} src='/img/icons/arrowDown.svg' alt=''/>
          </div>
          {isOpen &&
          <div className={styles.cards}>
          <CardPreferWorkIn profile={profile} isEdit={isEdit}/>
          {isMaster && <CardCategories profile={profile} isEdit={isEdit} onCategoryChange={onCategoryChange} subCategory={subCategory}/>}
          <CardLanguages profile={profile} isEdit={isEdit}/>
          {isMaster && <CardBio profile={profile} isEdit={isEdit}/>}
          {isMaster && <CardRecommendationsShort profile={profile}/>}
          <CardReviewsShort profile={profile} subCategory={subCategory}/>
          {/*<CardRewards profile={profile}/>*/}</div>}
          </div>
        </div>
        <div className={styles.rightColumn}>
          {props.children}
        </div>
      </div>
      <Modals/>
    </Layout>
  )
}

export default ProfilePageLayout
