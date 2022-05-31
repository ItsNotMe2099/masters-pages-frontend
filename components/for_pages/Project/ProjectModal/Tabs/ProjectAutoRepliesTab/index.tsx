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
import Tabs from 'components/ui/Tabs'
import {ApplicationStatus} from 'data/intefaces/IApplication'

interface Props {
  project: IProject | null
}

export enum ProjectAutoRepliesTabType {
  Status = 'status',
  Applications = 'applications',
  Shortlist = 'shortList',
  Invited = 'invited',
  Accepted = 'accepted',
  Completed = 'completed',
}

const ProjectDescriptionTab = ({project}: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const [activeTab, setActiveTab] = useState(ProjectAutoRepliesTabType.Status)
  const tabs = [
    {name: 'Status', key: ProjectAutoRepliesTabType.Status},
    {name: 'Applications', key: ProjectAutoRepliesTabType.Applications},
    {name: 'Shortlist', key: ProjectAutoRepliesTabType.Shortlist},
    {name: 'Invited', key: ProjectAutoRepliesTabType.Invited},
    {name: 'Accepted', key: ProjectAutoRepliesTabType.Accepted},
    {name: 'Completed', key: ProjectAutoRepliesTabType.Completed},
  ];
  const entities = {
    [ProjectAutoRepliesTabType.Status]: [{
      type: 'application',
      prevStatus: ApplicationStatus.Applied,
      nextStatus: ApplicationStatus.Applied,
      enabled: false
    },
      {
        type: 'application',
        nextStatus: ApplicationStatus.Applied,
        enabled: false
      }
      ]
  }
  return (
    <div className={styles.root}>
      <Tabs style={'fullWidthRound'} tabs={tabs} activeTab={activeTab as string}/>
    </div>
  )
}

export default ProjectDescriptionTab
