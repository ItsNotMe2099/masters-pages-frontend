import * as React from 'react'
import styles from './index.module.scss'
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
import {useEffect, useState} from 'react'
import CheckBoxListField from 'components/fields/CheckBoxListField'
import ServiceCategoryFormField from 'components/fields/ServiceCategoryFormField'
import LanguageFormField from 'components/fields/LanguageFormField'
import AvatarField from 'components/fields/AvatarField'
import Button from 'components/PublicProfile/components/Button'
import LocationFormField from 'components/fields/LocationFormField'
import { Educations } from 'data/educations'
import ProjectRepository from 'data/repositories/ProjectRepository'
import DocField from 'components/fields/DocField'
import { useDispatch } from 'react-redux'
import {confirmChangeData, confirmModalClose, confirmOpen} from 'components/Modal/actions'
import {useProjectContext} from "context/project_state";

interface Props {
  project: IProject | null
  onSave: () => any;
  onPreview?: (data) => any
}

const TabDescriptionForm = ({project, ...props}: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const projectContext = useProjectContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSaveProject = async (data: IProject) => {
    console.log('handleSaveProject', project)
    if(project?.id){
      projectContext.update(data)
       await props.onSave()
    }else{
      projectContext.create(data)
      await props.onSave()
    }
  }

  const handleSubmit = async (data) => {
    const dartFormatted = {...data};
    dartFormatted.skills = data.skills.map(i => ({
      id: i.id,
      mainCategoryId: i.mainCategory?.id,
      categoryId: i.category?.id,
      subCategoryId: i.subCategory?.id
    }))
    console.log(" dartFormatted.skills",  dartFormatted.skills)
    dartFormatted.locationsIds = data.locations.map(i => i.id)
    handleSaveProject(dartFormatted)

    setError(null)
    setIsLoading(true);
    try {
      //    const res = await AuthRepository.completeRegistration(data);
      reachGoal('project:created')

    } catch (e) {
      setError(e);
    }
    setIsLoading(false);

  }

  const handleSubmitFormPreview = async (data) => {

    const dartFormatted = {...data};
    dartFormatted.skills = data.skills.map(i => ({
      ...i,
      id: i.id,
      mainCategoryId: i.mainCategory?.id,
      categoryId: i.category?.id,
      subCategoryId: i.subCategory?.id
    }))
    console.log(" dartFormatted.skills",  dartFormatted)
    dartFormatted.locationids = data.locations.map(i => (i.id))
    dartFormatted.attachments = dartFormatted.attachmentsInput
    dartFormatted.attachmentsObjects = dartFormatted.attachments.map(i => ({urlS3: i}))
    props.onPreview(dartFormatted)
    setError(null)
    setIsLoading(true);
    try {
      //    const res = await AuthRepository.completeRegistration(data);

    } catch (e) {
      setError(e);
    }
    setIsLoading(false);
  }
  const initialValues = {
    title: project?.title ?? '',
    description: project?.description ?? '',
    executionType: project?.executionType ?? 'offline',
    replyOptions: project?.replyOptions ?? [],
    locations: project?.locations ?? [],
    photo: project?.photo ?? null,
    benefits: project?.benefits ?? null,
    startDate: project?.startDate ?? null,
    endDate: project?.endDate ?? null,
    applicationsClothingDate: project?.applicationsClothingDate ?? null,
    webLink: project?.webLink ?? null,
    inquiries: project?.inquiries ?? null,
    applicationsLimits: project?.applicationsLimits ?? null,
    vacanciesLimits: project?.vacanciesLimits ?? null,
    attachmentsInput: project?.attachments ?? [],
    skills: project?.skills ?? [],
    requirements: project?.requirements ?? null,
    education: project?.education ?? null,
    minAge: project?.minAge ?? null,
    maxAge: project?.maxAge ?? null,
    languages: project?.languages ?? [],
  }

  const dispatch = useDispatch()

  const handlePublishModal = async () => {
    dispatch(confirmOpen({
      description: `${t('task.confirmPublish')}`,
      onConfirm: async () => {
        dispatch(confirmChangeData({loading: true}))
        await formik.setFieldValue('status', ProjectStatus.Published)
        await formik.submitForm();
        dispatch(confirmModalClose());
      }
    }))
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    enableReinitialize: true
  })
  const handleSubmitPublish = async () => {
    console.log("handleSubmitPublish")
    handlePublishModal()
    //await formik.setFieldValue('status', ProjectStatus.Published)
    //await formik.submitForm();
  }
  const handleSubmitDraft = async () => {
    console.log("handleSubmitDraft")
    await formik.setFieldValue('status', ProjectStatus.Draft);
    await formik.submitForm();
  }
  const handleSubmitPreview = async () => {
    console.log("handleSubmitPreview")
    handleSubmitFormPreview(values)
  }

  const [isDisabled, setIsDisabled] = useState(false)

  const {values, setFieldValue} = formik

  console.log('VALLLLLLLLL', values)

  const range = (minAge: number | string, maxAge: number | string) => {
    if(minAge === ''){
      setFieldValue('minAge', null)
    }
    if(maxAge === ''){
      setFieldValue('maxAge', null)
    }
  }

  const handleSave = async () => {
    await formik.setFieldValue('status', project.status);
    await formik.submitForm();
  }

  useEffect(() => {
    range(values.minAge, values.maxAge)
  }, [values.minAge, values.maxAge])

  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <ProjectDescriptionHeader project={project} title={'Volunteers'}/>
        <div className={styles.projectFormTitle}>Project Form</div>
        {project?.id && <div className={styles.projectId}>Project id#: {project?.id}</div>}

        <div className={styles.formHeader}>Required fields</div>
        <div className={styles.columns}>
          <div className={styles.colLeft}>
            <TextField name={'title'} label={'Project title*'} size='normal' validate={Validator.required}/>
            <SelectField name={'executionType'} options={[{
              value: 'online',
              label: t('forms.executionTypeInput.values.online')
            }, {value: 'offline', label: t('forms.executionTypeInput.values.offline')}, {
              value: 'combo',
              label: t('forms.executionTypeInput.values.combo')
            }]} label={'Execution type'} size='normal'/>
            <TextAreaField name={'description'} label={'Project Description'}  validate={Validator.required}/>
          </div>
          <div className={styles.colRight}>
            <div className={styles.fieldset}>
              <div className={styles.fieldsetTitle}>Reply Options</div>
              <CheckBoxListField name={'replyOptions'} options={[
                {value: 'volunteerProfile', label: 'Masterspages Volunter Profile'},
                {value: 'resume', label: 'Resume'},
                {value: 'coverLetter', label: 'Cover Letter'},
                {value: 'profileLink', label: 'Profile link'},
              ]}/>
            </div>
            <div className={styles.fieldset}>
              <div className={styles.fieldsetTitle}>Project Locations</div>
              <LocationFormField name={'locations'}/>
            </div>
          </div>
        </div>
        <div className={styles.formHeader}>Optional fields</div>
        <div className={styles.columns}>
          <div className={styles.colLeft}>
            <AvatarField style='projectEdit' className={styles.avatar} name={'photo'} label={'Upload Photo or Video'}/>
            <TextAreaField name={'benefits'} label={'Project benefits'}/>
            <div className={styles.dates}>
              <DateField name={'startDate'} label={'Expected Project Start Date'}/>
              <DateField name={'endDate'} label={'Expected Project End Date'}/>
              <DateField name={'applicationsClothingDate'} label={'Applications Closing Date'}/>
            </div>
            <TextField name={'webLink'} label={'Related WEB Link'}/>
            <TextAreaField name={'inquiries'} label={'Inquiries'}/>

          </div>
          <div className={styles.colRight}>
            <div className={styles.fieldset}>

              <div className={styles.fieldsetTitle}>Limits</div>
              <TextField type={'number'} name={'applicationsLimits'} label={'Applications'}/>
              <TextField type={'number'} name={'vacanciesLimits'} label={'Vacancies'}/>
            </div>

            <div className={styles.fieldset}>
              <div className={styles.fieldsetTitle}>Files</div>
              {/*<FileField name={'attachmentsInput'} multiple
                         addFileButton={<div>
                           <Button type={'button'} size="small"> <img src="/img/icons/camera.svg"
                                                                      alt=''/> {t('forms.fileInput.uploadFiles')}
                           </Button>
                           <div className={styles.addFileButtonDesc}>
                             {t('forms.fileInput.description')}
                           </div>
                         </div>}
                         />*/}
              <DocField name={'attachmentsInput'} multiple maxAmount={3}
                         addFileButton={<div className={styles.addFileBtn}>
                          <Button type={'button'} size="small"> <img src="/img/icons/staple.svg"
                                                                     alt=''/> {t('forms.fileInput.uploadFiles')}
                          </Button>
                        </div>}
              />
            </div>
            <div className={styles.fieldset}>
              <div className={styles.fieldsetTitle}>Relevant For The Following Categories</div>
              <ServiceCategoryFormField name={'skills'}/>
            </div>
          </div>
        </div>
        <div className={styles.formHeader}>Applicant requirements (Optional)</div>
        <div className={styles.columns}>
          <div className={styles.colLeft}>
            <TextAreaField name={'requirements'} label={'Project Requirements'}/>
          </div>
          <div className={styles.colRight}>

            <SelectField name={'education'} options={Educations()} label={'Education Level'} size='normal'/>
            <div className={styles.fieldset}>
              <div className={styles.fieldsetTitle}>Age:</div>
              <TextField name={'minAge'} type={'number'} label={'Min Age'} disabled={isDisabled} validate={Validator.combine([Validator.numberOnly, Validator.minAgeHigherThanMaxAge(values)])}/>
              <TextField name={'maxAge'} type={'number'} label={'Max Age'} validate={Validator.numberOnly}/>

            </div>
            <div className={styles.fieldset}>
              <div className={styles.fieldsetTitle}>Languages</div>
              <LanguageFormField name={'languages'} label={'Languages'}/>
            </div>

          </div>
        </div>

        <div className={styles.bottomBar}>

          {(!project || !project.status) ? <Button size={'small'} projectBtn='default' type={'button'} onClick={handleSubmitDraft}>Save as draft</Button>
            :
            <Button size={'small'} projectBtn='default' type={'button'} onClick={handleSave}>Save</Button>
          }
          <Button size={'small'} projectBtn='default' type={'button'}  onClick={handleSubmitPreview}>Preview</Button>
          {project?.status !== ProjectStatus.Published  && <Button size={'small'} projectBtn='default' type={'button'} onClick={handleSubmitPublish}>Publish</Button>}
        </div>
      </Form>
    </FormikProvider>
  )
}

export default TabDescriptionForm
