import * as React from "react";
import {IRootState, ITask, ProfileData} from "types";
import styles from './index.module.scss'
import {useTranslation, withTranslation} from "react-i18next";
import {getAuthServerSide} from 'utils/auth'
import Avatar from 'components/ui/Avatar'
import StarRatings from 'react-star-ratings';
import Button from 'components/PublicProfile/components/Button'
import {taskNegotiationSetCurrentProfile} from 'components/TaskNegotiation/actions'
import {taskOfferOpen} from 'components/Modal/actions'

import { useDispatch, useSelector } from 'react-redux'
import {SkillDropDown} from 'components/Contacts/ContactItem/SkillDropDown'
import {getCategoryTranslation} from 'utils/translations'
import ProfileCard from 'components/ui/ProfileCard'
interface Props {
  profile: ProfileData,
  deleteActionName: string
  onDelete?: (profile) => void
}

const ContactItem = ({profile, onDelete, deleteActionName}: Props) => {
  const {t} = useTranslation('common');
  const dispatch = useDispatch();
  const handleActionProfile = () => {

  }
  const handleActionNewOrder = () => {

    dispatch(taskNegotiationSetCurrentProfile(profile));
    dispatch(taskOfferOpen());
  }

  const handleActionUnsubscribe = () => {
    onDelete(profile);
  }
  return (
    <div className={styles.root}>
      <div className={styles.cell}>
      <ProfileCard profile={profile}/>
      </div>
        <div className={styles.cell}>
        <div className={styles.separator}/>
        </div>
          <div className={styles.cell}>
            <SkillDropDown role={profile.role}
                           items={profile.skills.filter(item => item.subCategory).map((item, index)  => ({
                             label: `${getCategoryTranslation(item.category).name}/${getCategoryTranslation(item.subCategory).name}`,
                             link: `/sk${item.id}`
                           }))}/>
          </div>
            <div className={styles.cell}>
        <div className={styles.actions}>
          <Button className={styles.action} href={`/id${profile.id}`} onClick={handleActionProfile}>Profile</Button>
          <Button className={styles.action} href={`/id${profile.id}/news`}>All Posts</Button>
          <Button className={styles.action} onClick={handleActionNewOrder}>New Order</Button>
          {onDelete && <Button  className={styles.action} onClick={handleActionUnsubscribe}>{deleteActionName}</Button>}
        </div>
            </div>
    </div>
  )
}
export default ContactItem
