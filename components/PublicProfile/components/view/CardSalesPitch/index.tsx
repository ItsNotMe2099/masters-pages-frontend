import styles from './index.module.scss'

import {IRootState, ProfileData, SkillData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import {hideProfileForm, showProfileForm, updateProfileByForm} from 'components/Profile/actions'
import { useSelector, useDispatch } from 'react-redux'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import SalesPitchForm from 'components/PublicProfile/components/view/CardSalesPitch/Form'
import {updateSkill, updateSkillByForm} from 'components/Skill/actions'
import ReactPlayer from 'react-player'
import {getMediaPath, isMediaImage, isMediaVideo} from 'utils/media'
import {useTranslation} from 'react-i18next'
interface Props{
  profile: ProfileData,
  skill: SkillData
  isEdit: boolean
}
const CardSalesPitch = (props: Props) => {
  const { profile, skill, isEdit } = props;
  const dispatch = useDispatch();
  const formLoading = useSelector((state: IRootState) => state.skill.formLoading)
  const showForm = useSelector((state: IRootState) => state.profile.showForms).find(key => key === 'salesPitch');
  const media = 'img.png'
  const file = skill.photos.length > 0 ? skill.photos[0] : null
  const {i18n, t} = useTranslation('common')
  const handleEditClick = () => {
    dispatch(showProfileForm( 'salesPitch'));

  }
  const handleSubmit = (data) => {
    console.log("HandleSubmit", data);
    dispatch(updateSkillByForm(skill.id, {...data, ...(data.photo ? {photos: [data.photo]} : {photos: []})}, 'salesPitch'));
  }
  const handleCancel = () => {
    dispatch(hideProfileForm( 'salesPitch'));
  }
  return (
    <Card isHidden={!isEdit && !file && !skill?.description} title={t('cardSalesPitch.salesPitch')} isLoading={showForm && formLoading} toolbar={isEdit ? [<FormActionButton type={'edit'} title={t('editSmall')} onClick={handleEditClick}/>] : []}>

      {!showForm && <div className={styles.root}> <div className={styles.leftColumn}>
      <div className={styles.text}>{skill?.description}</div>
      <div className={styles.rate}>

      </div>
      </div>
      <div className={styles.rightColumn}>
        {(file && isMediaVideo(file)) && <div className={styles.video}><ReactPlayer width="100%" height={''}  url={getMediaPath(file)} controls={true}/></div>}
        {(file && isMediaImage(file)) && <img className={styles.image} src={getMediaPath(file)} />}

      </div>
       </div>}
      {showForm && <SalesPitchForm onSubmit={handleSubmit} onCancel={handleCancel} initialValues={{...skill, ...(file ? {photo: file} : {})}}/>}
    </Card>
  )
}

export default CardSalesPitch
