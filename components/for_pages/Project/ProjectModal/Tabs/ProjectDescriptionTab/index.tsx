import * as React from 'react'
import styles from './index.module.scss'
import ProjectTabItem from 'components/for_pages/Project/ProjectModal/ProjectTabs/Tab'
import cx from 'classnames'
import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import ProjectDescriptionHeader from 'components/for_pages/Project/ProjectModal/ProjectDescriptionHeader'
import TextField from 'components/fields/TextField'
import Validator from 'utils/validator'
import SelectField from 'components/fields/SelectField'
import {useTranslation} from 'next-i18next'
import TextAreaField from 'components/fields/TextAreaField'
import {DateField} from 'components/fields/DateField'
import {reachGoal} from 'utils/ymetrika'
import {Form, FormikProvider, useFormik} from 'formik'
import {useAppContext} from 'context/state'
import {useState} from 'react'
import CheckBoxListField from 'components/fields/CheckBoxListField'
import ServiceCategoryFormField from 'components/fields/ServiceCategoryFormField'
import LanguageFormField from 'components/fields/LanguageFormField'
import AvatarField from 'components/fields/AvatarField'
import FileField from 'components/fields/FileField'
import Button from 'components/PublicProfile/components/Button'
import LocationFormField from 'components/fields/LocationFormField'
import TabDescriptionForm from 'components/for_pages/Project/ProjectModal/Tabs/ProjectDescriptionTab/TabDescriptionForm'
import ProjectPage from 'components/for_pages/Project/ProjectPage'
import BaskerOutlineIcon from 'components/svg/BaskerOutlineIcon'

interface Props {
  project: IProject | null
  onSave: (data) => any;
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
    {isEdit && <TabDescriptionForm project={project} onSave={handleSave}/>}
    {!isEdit && <ProjectPage project={project} onSave={props.onSave} controls={ showType === 'client' ? [
      <Button color={'white'} className={styles.delete}><BaskerOutlineIcon/></Button>,
      <Button color={'red'} className={styles.edit} onClick={() => setIsEdit(true)}>Edit</Button>
    ] : []}/>}
  </div>
  )
}

export default TabProjectDescription
