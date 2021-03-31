import styles from './index.module.scss'

import {ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import CardWorkExperienceListItem
  from 'components/PublicProfile/components/view/CardWorkExperience/components/CardWorkExperienceListItem'

interface Props{
  profile: ProfileData
}
const CardWorkExperience = (props: Props) => {
  const { profile } = props;
  return (
    <Card className={styles.root} title={'Proffesional qualifications and work experience'}>
      <CardWorkExperienceListItem/>
      <CardWorkExperienceListItem/>
      <CardWorkExperienceListItem/>
    </Card>
  )
}

export default CardWorkExperience
