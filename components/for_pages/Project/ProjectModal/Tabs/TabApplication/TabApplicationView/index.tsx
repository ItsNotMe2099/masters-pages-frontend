import * as React from 'react'
import styles from 'components/for_pages/Project/ProjectModal/Tabs/TabApplication/TabApplicationForm/index.module.scss'
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
import Button from 'components/PublicProfile/components/Button'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import ApplicationPage from 'components/for_pages/Project/ApplicationPage'

interface Props {
  application: IApplication | null
  project: IProject
}

const TabApplicationView = ({application, project, ...props}: Props) => {

  return (
    <div className={styles.root}>
      <ApplicationPage application={application} project={project}/>
    </div>
  )
}

export default TabApplicationView
