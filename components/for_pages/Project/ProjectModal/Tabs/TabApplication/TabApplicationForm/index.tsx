import * as React from 'react'
import styles from 'components/for_pages/Project/ProjectModal/Tabs/TabApplication/TabApplicationForm/index.module.scss'
import {ProjectStatus} from 'data/intefaces/IProject'
import TextField from 'components/fields/TextField'
import Validator from 'utils/validator'
import SelectField from 'components/fields/SelectField'
import {useTranslation} from 'next-i18next'
import TextAreaField from 'components/fields/TextAreaField'
import {Form, FormikProvider, useFormik} from 'formik'
import {useAppContext} from 'context/state'
import {useState} from 'react'
import LanguageFormField from 'components/fields/LanguageFormField'
import Button from 'components/PublicProfile/components/Button'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import { Educations } from 'data/educations'
import DocField from 'components/fields/DocField'
import { useDispatch } from 'react-redux'
import { confirmOpen, modalClose } from 'components/Modal/actions'

interface Props {
  application: IApplication | null
  projectId: number
  onSave: () => any;
  edit?: boolean
}

const TabApplicationForm = ({application, projectId, edit, ...props}: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const profile = appContext.profile
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch()
  const handleSubmit = async (data) => {
    console.log("HandleSubmit", data)
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
    await ProfileRepository.deleteFromSavedProjects({profileId: profile.id}, projectId)
    await formik.submitForm()
  }

  const handleInfoModal = async () => {
    dispatch(confirmOpen({
      description: 'Your application was saved in Projects!',
      infoOnly: true,
      onConfirm: async () => {
        dispatch(modalClose())
      }
    }))
  }
  const handleSubmitDraft = async () => {
    console.log("handleSubmitDraft")
    await formik.setFieldValue('status', ApplicationStatus.Draft);
    await ProfileRepository.deleteFromSavedProjects({profileId: profile.id}, projectId)
    await ProfileRepository.addToSavedProjects({projectId: projectId})
    await formik.submitForm()
    handleInfoModal()
  }
  const handleSubmitSave = async () => {
    console.log("handleSubmitSave")
    await formik.submitForm()
    props.onSave()
  }
  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <div className={styles.columns}>
          <div className={styles.colLeft}>
            <TextAreaField name={'coverLetter'} label={'Cover Letter'} validate={Validator.required}/>
            <DocField name={'coverLetterFile'}
                         addFileButton={<div className={styles.innerContent}>
                           <Button type={'button'} size="small"> <img src="/img/icons/camera.svg"
                                                                      alt=''/> {t('forms.fileInput.uploadFiles')}
                           </Button>
                           <div className={styles.addFileButtonDesc}>
                             {t('forms.fileInput.description')}
                           </div>
                         </div>}
              />
            <TextAreaField name={'resume'} label={'Resume'}/>
            <DocField name={'resumeFile'}
                         addFileButton={<div className={styles.innerContent}>
                           <Button className={styles.btn} type={'button'} size="small"> <img src="/img/icons/camera.svg"
                                                                      alt=''/> {t('forms.fileInput.uploadFiles')}
                           </Button>
                           <div className={styles.addFileButtonDesc}>
                             {t('forms.fileInput.description')}
                           </div>
                         </div>}
              />
          </div>
          <div className={styles.colRight}>
            <SelectField name={'education'} options={Educations()} label={'Education Level'} size='normal'/>
            <TextField name={'age'} type={'number'} label={'Age'}/>
            <LanguageFormField name={'languages'} label={'Languages'}/>
          </div>
        </div>


        <div className={styles.bottomBar}>
          {(!application || application.status === ApplicationStatus.Draft) &&
          <Button size={'small'} color={'red'} type={'button'} onClick={handleSubmitDraft}>Save as draft</Button>}
          {(!application || application.status === ApplicationStatus.Draft ) &&
          <Button size={'small'} color={'red'} type={'button'} onClick={handleSubmitPublish}>Apply</Button>}
          {edit &&
          <Button size={'small'} color={'red'} type={'button'} onClick={handleSubmitSave}>Save</Button>}
        </div>
      </Form>
    </FormikProvider>
  )
}

export default TabApplicationForm
