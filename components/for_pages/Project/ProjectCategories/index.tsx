import styles from './index.module.scss'

import {formatSkillList} from 'utils/skills'
import Accordion from './Accordion'
import {getCategoryTranslation} from 'utils/translations'
import Tab from 'components/PublicProfile/components/Tab'
import { useTranslation } from 'next-i18next'
import {ISkill} from 'data/intefaces/ISkill'
interface Props{
  skills: ISkill[]
}
const ProjectCategories = (props: Props) => {
  const {i18n, t} = useTranslation('common')

  const skills = formatSkillList(props.skills)

  return (
    <div className={styles.root}>
      {skills.map((category) => <Accordion title={<><div className={styles.accordionTitle}>{getCategoryTranslation(category.mainCategory, i18n.language)?.name}/{getCategoryTranslation(category.category, i18n.language)?.name}</div> </>} >
        {category.skills.map(skill => skill.subCategory ? <Tab><div className={styles.tabTitle}>{getCategoryTranslation(skill.subCategory, i18n.language)?.name}</div></Tab> : null)}
      </Accordion>)}
    </div>
  )
}

export default ProjectCategories
