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
import ApplicationRepository from 'data/repositories/ApplicationRepository'

interface Props {
  application: IApplication | null
  projectId: number
  onSave: () => any;
}

const TabApplicationForm = ({application, projectId, ...props}: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async (data) => {
    if(application){
      const res = await ApplicationRepository.update(application.id, data);
    }else{
      const res = await ApplicationRepository.create({...data, projectId});
    }

    props.onSave()


  }
  const initialValues = {
    resume: application?.resume ?? '',
    coverLetter: application?.coverLetter ?? '',
    coverLetterFile: application?.coverLetterFile ?? null,
    resumeFile: application?.resumeFile ?? null,
    education: application?.education ?? null,
    age: application?.age ?? null,
    languages: application?.languages ?? appContext.profile.languages ?? []
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
  const handleSubmitPublish = async () => {
    console.log("handleSubmitPublish")
    await formik.setFieldValue('status', ApplicationStatus.Applied)
    await formik.submitForm();
  }
  const handleSubmitDraft = async () => {
    console.log("handleSubmitDraft")
    await formik.setFieldValue('status', ProjectStatus.Draft);
    await formik.submitForm();
  }
  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <div className={styles.columns}>
          <div className={styles.colLeft}>
            <TextAreaField name={'coverLetter'} label={'Cover Letter'} validate={Validator.required}/>
            <AvatarField name={'coverLetterFile'} label={'Upload Photo or Video'}/>
            <TextAreaField name={'resume'} label={'Resume'}/>
            <AvatarField name={'resumeFile'} label={'Upload Photo or Video'}/>
          </div>
          <div className={styles.colRight}>
            <SelectField name={'education'} options={[{
              value: 'physical',
              label: t('forms.executionTypeInput.values.physical')
            }, {value: 'virtual', label: t('forms.executionTypeInput.values.virtual')}, {
              value: 'combo',
              label: t('forms.executionTypeInput.values.combo')
            }]} label={'Education Level'} size='normal'/>
            <TextField name={'age'} type={'number'} label={'Age'}/>
            <LanguageFormField name={'languages'} label={'Languages'}/>
          </div>
        </div>


        <div className={styles.bottomBar}>
          {(!application || application.status === ApplicationStatus.Draft) &&
          <Button size={'small'} color={'red'} type={'button'} onClick={handleSubmitDraft}>Save as draft</Button>}
          {(!application || application.status === ApplicationStatus.Draft) &&
          <Button size={'small'} color={'red'} type={'button'} onClick={handleSubmitPublish}>Apply</Button>}
        </div>
      </Form>
    </FormikProvider>
  )
}

export default TabApplicationForm
