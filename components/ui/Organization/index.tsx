import {signUpOpen} from 'components/Modal/actions'
import StarRatings from 'react-star-ratings'
import Avatar from 'components/ui/Avatar'
import Button from 'components/ui/Button'
import {default as React} from 'react'
import styles from './index.module.scss'
import {useDispatch} from 'react-redux'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { IOrganization } from 'data/intefaces/IOrganization'
interface Props {
  organization: IOrganization,
  className?: string,
  isActive?: boolean,
}

export default function Organization({organization, className, isActive}: Props) {
  const dispatch = useDispatch()

  const {t, i18n} = useTranslation('common')
  const handleReadMore = () => {

  }

const profileLink = `/id${organization.corporateProfile.id}`
  return (
    <div className={`${styles.root} ${className} ${isActive && styles.isActive}`}>
      <div className={styles.profile}>
        <Avatar image={organization.corporateProfile.photo} href={profileLink}/>
        <div className={styles.mobileWrapper}>
        <div className={styles.name__mobile} >
          <Link href={profileLink}>
          <a className={styles.nameText}>{organization.name}</a></Link>
            </div>
        <div className={styles.icons}>
          <img src="/img/SearchTaskPage/icons/case.svg" alt=''/>
          <div>{organization.corporateProfile.tasksCount || 0}</div>
          <img src="/img/SearchTaskPage/icons/like.svg" alt=''/>
          <div>{organization.corporateProfile.feedbacksCount || 0}</div>
        </div>
        <div className={styles.stars}>
          <StarRatings
            rating={organization.corporateProfile.rating || 0}
            starRatedColor="#F2B705"
            starEmptyColor={'#616161'}
            numberOfStars={5}
            name='rating'
            svgIconPath={'M4.08729 13.7644C3.74325 13.9408 3.35287 13.6316 3.42239 13.2367L4.16216 9.0209L1.02213 6.02971C0.728899 5.74985 0.88131 5.23824 1.27437 5.18298L5.63993 4.56264L7.58651 0.706016C7.7621 0.358411 8.23716 0.358411 8.41274 0.706016L10.3593 4.56264L14.7249 5.18298C15.1179 5.23824 15.2704 5.74985 14.9771 6.02971L11.8371 9.0209L12.5769 13.2367C12.6464 13.6316 12.256 13.9408 11.912 13.7644L7.99829 11.7536L4.0864 13.7644H4.08729Z'}
            svgIconViewBox={'0 0 16 14'}
            starDimension={'16px'}
            starSpacing={'1px'}

          />
          <div className={styles.comments}>({organization.corporateProfile.rating || 0})</div>
        </div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.mainInfo}>
          <div className={styles.top}>
            <div className={styles.name}>
              <Link href={profileLink}>
              <a
                 className={styles.nameText}>{organization.name}</a></Link>
            </div>
            <div className={styles.approved}>
              <img src='/img/OrganizationCard/approved.svg' alt=''/>
            </div>  
          </div>
          <div className={styles.desc}>
              {organization.description.description}
            </div>
          <div className={styles.bottom}>
            <Button type='button' projectBtn='default' href={profileLink}>VIEW</Button>
            <Button type='button' projectBtn='default' onClick={() => dispatch(signUpOpen())}>SAVE</Button>
            <Button type='button' projectBtn='default' onClick={() => dispatch(signUpOpen())}>SUBSCRIBE</Button>
          </div>
      </div>
      </div>
      <div className={`${styles.payment}`}>
        <div className={styles.paymentContent}>
          <div className={styles.statItem}>
            <div className={styles.statItemLabel}>Open projects:</div>
            <div className={styles.statItemValue}>{organization.corporateProfile.tasksCount || 'N/A'}</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statItemLabel}>Open orders:</div>
            <div className={styles.statItemValue}>{organization.corporateProfile.totalHours || 'N/A'}</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statItemLabel}>Subscribers:</div>
            <div className={styles.statItemValue}>{organization.corporateProfile.totalAmount || 'N/A'}</div>
          </div>


        </div>
      </div>
    </div>
  )
}
Organization.defaultProps = {
  showProfile: true,
  actionsType: 'public'
}
