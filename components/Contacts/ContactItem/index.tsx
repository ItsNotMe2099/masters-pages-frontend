import * as React from 'react'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import Button from 'components/PublicProfile/components/Button'
import {taskNegotiationSetCurrentProfile} from 'components/TaskNegotiation/actions'
import {taskOfferOpen} from 'components/Modal/actions'

import { useDispatch } from 'react-redux'
import {SkillDropDown} from 'components/Contacts/ContactItem/SkillDropDown'
import {getCategoryTranslation} from 'utils/translations'
import ProfileCard from 'components/ui/ProfileCard'
import {IProfile} from 'data/intefaces/IProfile'

interface Props {
  profile: IProfile,
  deleteActionName: string
  onDelete?: (profile) => void
}

const ContactItem = ({profile, onDelete, deleteActionName}: Props) => {
  const {t, i18n} = useTranslation('common')
  const dispatch = useDispatch()
  const handleActionProfile = () => {

  }
  const handleActionNewOrder = () => {

    dispatch(taskNegotiationSetCurrentProfile(profile))
    dispatch(taskOfferOpen())
  }

  const handleActionUnsubscribe = () => {
    onDelete(profile)
  }
  return (
    <div className={styles.root}>
      <div className={styles.cell}>
      <ProfileCard profile={profile}/>
      </div>
        <div className={styles.cell}>
        <div className={styles.separator}/>
        </div>
          <div className={styles.cellSkill}>
            {profile.role !== 'client' && <SkillDropDown role={profile.role}
                           items={profile.skills.filter(item => item.subCategory).map((item, index)  => ({
                             label: `${getCategoryTranslation(item.mainCategory, i18n.language)?.name || ''}${getCategoryTranslation(item.category, i18n.language).name}/${getCategoryTranslation(item.subCategory, i18n.language).name}`,
                             link: `/sk${item.id}`
                           }))}/>}
          </div>
            <div className={styles.cell}>
        <div className={styles.actions}>
          <Button className={styles.action} href={`/id${profile.id}`} onClick={handleActionProfile}>{t('menu.profile')}</Button>
          <Button className={styles.action} href={`/id${profile.id}/news`}>{t('allPosts')}</Button>
          <Button className={styles.action} onClick={handleActionNewOrder}>{t('newOrder')}</Button>
          {onDelete && <Button  className={styles.action} onClick={handleActionUnsubscribe}>{deleteActionName}</Button>}
        </div>
            </div>
    </div>
  )
}
export default ContactItem
