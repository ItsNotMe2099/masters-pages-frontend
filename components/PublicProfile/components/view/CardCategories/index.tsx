import styles from './index.module.scss'

import {ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import {formatSkillList} from 'utils/skills'
import Accordion from 'components/PublicProfile/components/view/CardCategories/components/Accordion'
import {getCategoryTranslation} from 'utils/translations'
import Tab from 'components/PublicProfile/components/Tab'
interface Props{
  profile: ProfileData
}
const CardCategories = (props: Props) => {
  const {profile} = props;
  const list = formatSkillList(profile.skills);
  console.log("SkillList", list);
  return (
    <Card className={styles.root} title={'Works in the following categories'}>
      {list.map((category) => <Accordion title={getCategoryTranslation(category)?.name} >
        {category.skills.map(skill => <Tab title={getCategoryTranslation(skill.subCategory)?.name}/>)}
        {category.skills.map(skill => <Tab title={getCategoryTranslation(skill.subCategory)?.name}/>)}
        {category.skills.map(skill => <Tab title={getCategoryTranslation(skill.subCategory)?.name}/>)}
        {category.skills.map(skill => <Tab title={getCategoryTranslation(skill.subCategory)?.name}/>)}
        {category.skills.map(skill => <Tab title={getCategoryTranslation(skill.subCategory)?.name}/>)}
      </Accordion>)}
    </Card>
  )
}

export default CardCategories
