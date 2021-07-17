import Avatar from "components/ui/Avatar";
import { useRouter } from "next/router";
import * as React from "react";
import Button from "components/ui/Button";
import Input from "components/ui/Inputs/Input";
import { IRootState } from "types";
import StarRatings from 'react-star-ratings';
import { getMediaPath } from "utils/media";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import formatDistance from "date-fns/formatDistance";
import {useTranslation, withTranslation} from "react-i18next";

const ProfileSection = (props) => {
  const {t} = useTranslation();
  const router = useRouter();
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)

  return (
    <div className={styles.root}>
      <div className={styles.details}>
        <div className={styles.avatar}><Avatar image={profile?.photo}/> </div>
        <div className={styles.detailsInfo}>
          <div className={styles.location}><label>{t('personalArea.profile.location')}:</label> <span>{profile?.city}</span></div>
          <div className={styles.stat}>
            <div className={styles.statItem}>
              <img src={'/img/icons/job.svg'}/>
              <span>{profile.tasksCount || 0}</span>
            </div>
            <div className={styles.statItem}>
              <img src={'/img/icons/like.svg'}/>
              <span>{profile.feedbacksCount || 0}</span>
            </div>

          </div>
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
          <div className={styles.registered}>
            <label>{t('personalArea.profile.registered')}:</label> {formatDistance(new Date(), new Date(profile.createdAt))} ago
          </div>
        </div>

      </div>
      <div className={styles.separator}></div>
      <div className={styles.personalLink}>
        <div className={styles.personalLinkWrapper}>
        <Input label={`${t('personalArea.profile.personalLink')}:`}  input={{value: `${ typeof window !== 'undefined' ? window?.location.protocol + "//" + window?.location.host : '/'}/PublicProfile/${profile.id}`}} labelType={'static'} type={'text'}/>
       </div>
      </div>
      <div className={styles.buttonArea}>
      <Button white={true} borderGrey={true} bold={true} size={'12px 23px'} onClick={() => router.push(`/PublicProfile/${profile.id}`)}>{t('personalArea.profile.lookHowPeopleSeeYourAccount')}</Button>
      </div>
    </div>
  )
}

export default withTranslation('common')(ProfileSection)
