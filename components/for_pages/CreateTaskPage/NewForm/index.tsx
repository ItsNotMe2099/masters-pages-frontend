import ProfileContactField from 'components/fields/ProfileContactField'
import { useFormik, Form, FormikProvider } from 'formik'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import TextField from 'components/fields/TextField'
import Button from 'components/ui/Button'
import { useSelector } from 'react-redux'
import { IRootState } from 'types'
import SkillsField from 'components/fields/SkillsField'
import Validator from 'utils/validator'
import TextAreaField from 'components/fields/TextAreaField'
import FileField from 'components/fields/FileField'
import DocField from 'components/fields/DocField'
import { FileUploadAcceptType } from 'types/enums'
import { DateField } from 'components/fields/DateField'

interface Props {
  isMaster: boolean
}

export default function CreateTaskForm({ isMaster }: Props) {

  const initialValues = {
    profileId: null,
    title: '',
    skills: {
      mainCategoryId: null,
      categoryId: null,
      subCategoryId: null
    },
    description: '',
    photos: [],
    deadline: ''
  }

  const handleSubmit = async () => {

  }


  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('VALUES!!!!', formik.values)

  const { t } = useTranslation('common')

  const skillsCurrentProfile = useSelector((state: IRootState) => state.skill.list)

  console.log('sdafsegf', skillsCurrentProfile)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.main}>
          <div className={styles.title__top}>{t('createTask.stepFillUpTaskRequest')}</div>
          <ProfileContactField
            name='profileId'
            role={isMaster ? 'client' : null}
            label={`Client iD (required field)*`}
            validate={Validator.required}
          />
          <TextField
            name='title'
            label='Task title (required field)*'
            validate={Validator.required}
          />
          <SkillsField
            name='skills'
            label='Master Profile (required field)*'
            validate={Validator.required}
          />
          <div className={styles.tip}>
            Complete optional fields<br />
            or
          </div>
          <div className={styles.btnContainer}>
            <Button red size="14px 65px">CREATE TASK NOW</Button>
          </div>
        </div>
        <div className={styles.optional}>
          <div className={styles.title__top}>Optional fields</div>
          <div className={styles.separator}></div>
          <TextAreaField
            name='description'
            label='Task description'
          />
          <FileField name='photos' multiple largeBtn/>
          <DateField name='deadline' label='Deadline'/>
        </div>
      </Form>
    </FormikProvider>
  )
}
