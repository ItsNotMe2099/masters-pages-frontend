import * as React from 'react'
import styles from './index.module.scss'
import {IRootState} from 'types'
import Card from 'components/PublicProfile/components/Card'
import Avatar from 'components/ui/Avatar'
import StarRatings from 'react-star-ratings'
import Button from 'components/PublicProfile/components/Button'
import UserIcon from 'components/svg/UserIcon'
import {useSelector, useDispatch} from 'react-redux'
import {signInOpen} from 'components/Modal/actions'
import AvatarForm from 'components/for_pages/Invite/AvatarForm'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import {createFollower} from 'components/Follower/actions'
import { useTranslation } from 'next-i18next'
import ProfileStatus from 'components/ui/ProfileStatus'
import { IOrganization } from 'data/intefaces/IOrganization'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import { useAppContext } from 'context/state'

interface Props{
  organization: IOrganization,
  isEdit: boolean
  onOrganizationUpdate: () => void
}
const CardOrganization = (props: Props) => {
  const {isEdit, organization, onOrganizationUpdate} = props
  const dispatch = useDispatch()
  const recommendationLoading = useSelector((state: IRootState) => state.follower.formLoading)
  const isTempSubscribed = useSelector((state: IRootState) => state.follower.isSubscribed)
  const recommendationTotal = useSelector((state: IRootState) => state.profileRecommendation.totalShort)
  //const showForm = useSelector((state: IRootState) => state.profile.showForms).find(key => key === 'avatar')
  const [showForm, setShowForm] = React.useState(false)
  const {t} = useTranslation('common')
  const isSubscribed = organization.corporateProfile.isSubscribedByCurrentProfile || isTempSubscribed
  const context = useAppContext()
  const handleEditClick = () => {
    setShowForm(showForm ? false : true)
  }
  const handleSubscribe = () => {
    if(!context.profile){
      dispatch(signInOpen())
      return
    }
    dispatch(createFollower({organizationId: organization.corporateProfile.id}))
  }

  const handleSubmit = async (data) => {
    await ProfileRepository.updateProfile(organization.corporateProfile.id, {...data})
    setShowForm(false)
    onOrganizationUpdate && onOrganizationUpdate()
  }

  return (
    <Card className={styles.root} toolbar={isEdit ? [<FormActionButton type={'edit'} title={showForm ? t('cancel')  : t('task.edit')} onClick={handleEditClick}/>] : []}>

        {isEdit && showForm && <AvatarForm organization={organization} onSubmit={handleSubmit}/>}
        {(!showForm || !isEdit) &&  <a href={`/id${organization.corporateProfile.id}`}><Avatar size={'large'} image={organization.corporateProfile.photo}/></a>}
      <a href={`/id${organization.id}`} className={styles.name}>{organization.name}</a>
      <div className={styles.allStats}>
      <div className={styles.left}>
      <div className={styles.stat}>
        <div className={styles.statItem}>
          <img src={'/img/icons/job.svg'}/>
          <span>{organization.corporateProfile.tasksCount || 0}</span>
        </div>
        <div className={styles.statItem}>
          <img src={'/img/icons/like.svg'}/>
          <span>{organization.corporateProfile.feedbacksCount || 0}</span>
        </div>

      </div>

      <div className={styles.rating}>
        <div className={styles.ratingStars}>
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
        </div>
        <div className={styles.ratingValue}>({organization.corporateProfile.rating || 0})</div>
      </div>
      <div className={styles.lastSeen}>
        <div className={styles.followersValue}><UserIcon/> {recommendationTotal} {t('personalArea.profile.recommended')} </div>
        <ProfileStatus activityStatus={organization.corporateProfile.activityStatus}/>
      </div>
      </div>
      <div className={styles.followers}>
        {!isEdit && (isSubscribed ? <div className={styles.subscribed}>{t('cardProfile.subscribed')}</div> : <Button className={styles.actionFollow} color={'green'} disabled={recommendationLoading} onClick={handleSubscribe}>{t('personalArea.profile.subscribe')}</Button>)}
        {!isEdit && <Button className={styles.actionFollow} color={'green'} href={`/Chat/dialog/${organization.corporateProfile.id}`}>{t('personalArea.profile.sendMessage')}</Button>}
        {!isEdit && <Button className={styles.actionFollowLast} color={'green'} href={`/id${organization.corporateProfile.id}/news`}>{t('news')}</Button>}
      </div>
      </div>
    </Card>
  )
}

export default CardOrganization
