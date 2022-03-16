import * as React from 'react'
import styles from './index.module.scss'
import ProjectTabItem from 'components/for_pages/Project/ProjectModal/ProjectTabs/Tab'
import cx from 'classnames'
import {IProject} from 'data/intefaces/IProject'
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
interface Props {
  project: IProject | null
}
const ProjectDescriptionTab = ({project}: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const [isLoading, setIsLoading ] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async (data) => {
    console.log('Submit', data)
    setError(null)
    setIsLoading(true);
    try {
  //    const res = await AuthRepository.completeRegistration(data);
      reachGoal('project:created')

    }catch (e){
      setError(e);
    }
    setIsLoading(false);

  }
  const initialValues = {

  }
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <ProjectDescriptionHeader project={project}/>
      <div className={styles.projectFormTitle}>Project Form</div>
      {project?.id && <div className={styles.projectId}>Project id#: {project?.id}</div>}

      <div className={styles.formHeader}>Required fields</div>
      <div className={styles.columns}>
        <div className={styles.colLeft}>
          <TextField name={'title'}  validate={Validator.required} label={'Project title'} size='normal'/>
          <SelectField name={'executionType'} options={[{value: 'physical', label: t('forms.executionTypeInput.values.physical')}, {value: 'virtual', label: t('forms.executionTypeInput.values.virtual')}, {value: 'combo', label: t('forms.executionTypeInput.values.combo')}]} validate={Validator.required} label={'Execution type'} size='normal'/>
          <TextAreaField name={'description'} validate={Validator.required}  label={'Project Description'} />
          <TextAreaField name={'benefits'} validate={Validator.required}  label={'Project benefits'} />
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
          <AvatarField name={'photo'} validate={Validator.required}  label={'Upload Photo or Video'}/>
          <TextAreaField name={'benefits'} validate={Validator.required}  label={'Project benefits'}/>
          <div className={styles.dates}>
            <DateField name={'startDate'} validate={Validator.required}  label={'Expected Project Start Date'}/>
            <DateField name={'endDate'} validate={Validator.required}  label={'Expected Project End Date'}/>
            <DateField name={'closingDate'} validate={Validator.required}  label={'Applications Closing Date'}/>
          </div>
          <TextField name={'relatedLink'}  validate={Validator.required} label={'Related WEB Link'} />
          <TextAreaField name={'inquiries'} validate={Validator.required}  label={'Inquiries'} />

        </div>
        <div className={styles.colRight}>
          <div className={styles.fieldset}>

            <div className={styles.fieldsetTitle}>Limits</div>
            <TextField name={'applicationsLimits'} label={'Applications'} />
            <TextField name={'vacanciesLimits'} label={'Vacancies'} />
          </div>

          <div className={styles.fieldset}>
            <div className={styles.fieldsetTitle}>Files</div>
            <FileField name={'attachmentsInput'}
                       addFileButton={<div >
                         <Button  type={'button'} size="small">  <img src="/img/icons/camera.svg" alt=''/> {t('forms.fileInput.uploadFiles')}</Button>
                         <div className={styles.addFileButtonDesc}>
                           {t('forms.fileInput.description')}
                         </div>
                       </div>}
                       validate={Validator.required} />
          </div>
          <div className={styles.fieldset}>
            <div className={styles.fieldsetTitle}>Relevant For The Following Categories</div>
          <ServiceCategoryFormField name={'skills'}/>
          </div>
        </div>
        s
      </div>
      <div className={styles.formHeader}>Applicant requirements (Optional)</div>
        <div className={styles.columns}>
          <div className={styles.colLeft}>
          <TextAreaField name={'requirements'} validate={Validator.required}  label={'Project Requirements'} />
          </div>
          <div className={styles.colRight}>

            <SelectField name={'education'} options={[{value: 'physical', label: t('forms.executionTypeInput.values.physical')}, {value: 'virtual', label: t('forms.executionTypeInput.values.virtual')}, {value: 'combo', label: t('forms.executionTypeInput.values.combo')}]} validate={Validator.required} label={'Education Level'} size='normal'/>
            <div className={styles.fieldset}>
              <div className={styles.fieldsetTitle}>Age:</div>
              <TextField name={'minAge'} label={'Min Age'} />
              <TextField name={'maxAge'} label={'Max Age'} />

            </div>
            <div className={styles.fieldset}>
              <div className={styles.fieldsetTitle}>Languages</div>
              <LanguageFormField name={'languages'} label={'Languages'}/>
            </div>

          </div>
        </div>
      </Form>
    </FormikProvider>
  )
}

export default ProjectDescriptionTab
