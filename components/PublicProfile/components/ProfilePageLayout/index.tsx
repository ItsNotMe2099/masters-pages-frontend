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
import cookie from 'js-cookie'
import CardOrganizationAbout from '../view/CardOrganizationAbout'
import { IOrganization } from 'data/intefaces/IOrganization'
import CardOrganization from '../view/CardOrganization'
import CardOrganizationLinks from '../view/CardOrganizationLinks'


interface Props{
  profile?: IProfile,
  organization?: IOrganization
  isEdit?: boolean,
  children?: any,
  subCategory?: any,
  isCurrentProfileOpened?: boolean
  onCategoryChange?: (categoryId, subCategoryId) => void
  onOrganizationUpdate?: () => void
  onProfileUpdate?: () => void
}
const ProfilePageLayout = (props: Props) => {
  const {profile, isEdit, onCategoryChange, subCategory, isCurrentProfileOpened, organization, onOrganizationUpdate, onProfileUpdate} = props
  const isMaster = ['master', 'volunteer'].includes(profile.role)
  const [isOpen, setIsOpen] = useState(false)
  const {t} = useTranslation('common')
  const mode = cookie.get('mode')
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
console.log("isMaster111", profile.role)
  return (
    <Layout isCurrentProfileOpened={isCurrentProfileOpened}  title={<>{t('lookingAt')}  <span className={getRoleClass()}>{t(profile.role)} {t('profile')}</span> {t('of')} {profile.firstName} {profile.lastName}</>}>

      <div className={styles.container}>
        <div className={styles.leftColumn}>
          {profile.role === 'corporate' && organization && <CardOrganization onOrganizationUpdate={onOrganizationUpdate} organization={organization} isEdit={isEdit}/>}
          {profile.role !== 'corporate' && <CardProfile onProfileUpdate={onProfileUpdate} profile={profile} isEdit={isEdit}/>}
          <div className={styles.desktop}>
          {profile.role !== 'corporate' && <CardPreferWorkIn onProfileUpdate={onProfileUpdate} profile={profile} isEdit={isEdit}/>}
          {isMaster && profile.role !== 'corporate' && <CardCategories onProfileUpdate={onProfileUpdate} profile={profile} isEdit={isEdit} onCategoryChange={onCategoryChange} subCategory={subCategory}/>}
          {profile.role !== 'corporate' && <CardLanguages onProfileUpdate={onProfileUpdate} profile={profile} isEdit={isEdit}/>}
          {isMaster && <CardBio onProfileUpdate={onProfileUpdate} profile={profile} isEdit={isEdit}/>}
          {profile.role === 'corporate' && organization && <CardOrganizationLinks onOrganizationUpdate={onOrganizationUpdate} organization={organization} isEdit={isEdit}/>}
          {profile.role === 'corporate' && organization && <CardOrganizationAbout onOrganizationUpdate={onOrganizationUpdate} organization={organization} isEdit={isEdit}/>}
          {isMaster && <CardRecommendationsShort profile={profile}/>}
          <CardReviewsShort profile={profile} subCategory={subCategory}/>
          {/*<CardRewards profile={profile}/>*/}
          </div>
          <div className={styles.mobile}>
          {profile.role !== 'corporate' && <div className={styles.additionalInfo} onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)}>
            {t('personalArea.profile.additionalInfo')}
            <img className={isOpen && styles.reverse} src='/img/icons/arrowDown.svg' alt=''/>
          </div>}
          {profile.role === 'corporate' && organization && <CardOrganizationLinks onOrganizationUpdate={onOrganizationUpdate} organization={organization} isEdit={isEdit}/>}
          {profile.role === 'corporate' && organization && <CardOrganizationAbout onOrganizationUpdate={onOrganizationUpdate} organization={organization} isEdit={isEdit}/>}
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
