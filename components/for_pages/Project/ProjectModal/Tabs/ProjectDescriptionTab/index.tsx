import * as React from 'react'
import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import {useTranslation} from 'next-i18next'
import {useState} from 'react'
import Button from 'components/PublicProfile/components/Button'
import TabDescriptionForm from 'components/for_pages/Project/ProjectModal/Tabs/ProjectDescriptionTab/TabDescriptionForm'
import ProjectPage from 'components/for_pages/Project/ProjectPage'
import BaskerOutlineIcon from 'components/svg/BaskerOutlineIcon'

interface Props {
  project: IProject | null
  onSave: (data) => any
  showType: 'client' | 'public'
}


const TabProjectDescription = ({project, showType, ...props}: Props) => {
  const {t} = useTranslation();
  const [isEdit, setIsEdit] = useState(!project)
  const handleSave = (data) => {
    setIsEdit(false);
    props.onSave(data);
  }
  return (
  <div className={styles.root}>
    {(isEdit || !project) && <TabDescriptionForm project={project} onSave={handleSave}/>}
    {(!isEdit && project) && <ProjectPage project={project} onSave={props.onSave} controls={ showType === 'client' ? [
      <Button color={'white'} className={styles.delete}><BaskerOutlineIcon/></Button>,
      <Button color={'red'} className={styles.edit} onClick={() => setIsEdit(true)}>Edit</Button>
    ] : []}/>}
  </div>
  )
}

export default TabProjectDescription
