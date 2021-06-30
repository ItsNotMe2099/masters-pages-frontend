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
      <div className={styles.profile}>
        <Avatar image={profile.photo} size={'normal'}/>
        <div className={styles.info}>
          <div className={styles.name}>{profile.firstName} {profile.lastName}</div>
          <div className={styles.rating}>
            <div className={styles.ratingStars}>
              <StarRatings
                rating={profile.rating || 0}
                starRatedColor="#F2B705"
                starEmptyColor={'#616161'}
                numberOfStars={5}
                name='rating'
                svgIconPath={'M4.08729 13.7644C3.74325 13.9408 3.35287 13.6316 3.42239 13.2367L4.16216 9.0209L1.02213 6.02971C0.728899 5.74985 0.88131 5.23824 1.27437 5.18298L5.63993 4.56264L7.58651 0.706016C7.7621 0.358411 8.23716 0.358411 8.41274 0.706016L10.3593 4.56264L14.7249 5.18298C15.1179 5.23824 15.2704 5.74985 14.9771 6.02971L11.8371 9.0209L12.5769 13.2367C12.6464 13.6316 12.256 13.9408 11.912 13.7644L7.99829 11.7536L4.0864 13.7644H4.08729Z'}
                svgIconViewBox={'0 0 16 14'}
                starDimension={'16px'}
                starSpacing={'1px'}
              />
            </div>
            <div className={styles.ratingValue}>({profile.rating || 0})</div>
          </div>
        </div>
      </div>
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
          <Button className={styles.action} href={`/id${profile.id}`}>All Posts</Button>
          <Button className={styles.action} onClick={handleActionNewOrder}>New Order</Button>
          {onDelete && <Button  className={styles.action} onClick={handleActionUnsubscribe}>{deleteActionName}</Button>}
        </div>
            </div>
    </div>
  )
}
export default ContactItem
export const getServerSideProps = getAuthServerSide({redirect: true});
