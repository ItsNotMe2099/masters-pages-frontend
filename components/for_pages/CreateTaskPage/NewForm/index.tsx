import ProfileContactField from 'components/fields/ProfileContactField'
import { useFormik, Form, FormikProvider } from 'formik'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import TextField from 'components/fields/TextField'
import Button from 'components/ui/Button'
import { useSelector } from 'react-redux'
import { IRootState, ITask, ITaskForm } from 'types'
import SkillsField from 'components/fields/SkillsField'
import Validator from 'utils/validator'
import TextAreaField from 'components/fields/TextAreaField'
import FileField from 'components/fields/FileField'
import { DateField } from 'components/fields/DateField'
import SelectField from 'components/fields/SelectField'
import { getCurrencies } from 'data/currency'
import { useAppContext } from 'context/state'
import PriceSelectForm from './components/PriceSelect'
import CountryField from 'components/fields/CountryField'
import CityField from 'components/fields/CityField'
import AddressField from 'components/fields/AddressField'
import { useEffect, useState } from 'react'
import TaskRepository from 'data/repositories/TaskRepository'

interface Props {
  isMaster: boolean
}

export default function CreateTaskForm({ isMaster }: Props) {

  const appContext = useAppContext()
  const profile = appContext.profile

  const [loading, setLoading] = useState(false)

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
    deadline: '',
    executionType: '',
    currency: '',
    visibilityType: isMaster ? 'private' : 'public',
    masterRole: isMaster ? profile.role : null,
    countryCode: '',
    geonameid: null,
    budget: null,
    ratePerHour: null,
    estimate: null,
    address: null,
    mainCategoryId: null,
    categoryId: null,
    subCategoryId: null
  }

  const handleSubmit = async (data) => {
    setLoading(true)
    const {skills, ...submittedValues} = data
    submittedValues.budget = Number(submittedValues.budget)
    submittedValues.ratePerHour = Number(submittedValues.ratePerHour)
    try {
      await TaskRepository.create(submittedValues)
    }
    catch (error: any) {
      let errorMessage = error.toString()
      // extract the error message from the error object
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      }
    }
    setLoading(false)
  }


  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })


  useEffect(() => {
    formik.setFieldValue('mainCategoryId', formik.values.skills.mainCategortyId)
    formik.setFieldValue('categoryId', formik.values.skills.categoryId)
    formik.setFieldValue('subCategoryId', formik.values.skills.subCategoryId)
  }, [formik.values.skills])

  console.log('VALUES!!!!', formik.values)

  const { t } = useTranslation('common')

  const skillsCurrentProfile = useSelector((state: IRootState) => state.skill.list)

  console.log('sdafsegf', skillsCurrentProfile)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.main}>
          <div className={styles.title__top}>{t('createTask.stepFillUpTaskRequest')}</div>
          {isMaster && formik.values.visibilityType === 'private' ? <ProfileContactField
            name='profileId'
            role={isMaster ? 'client' : null}
            label={`Client iD (required field)*`}
            validate={Validator.required}
          /> : null}
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
          <FileField
            name='photos'
            multiple
            largeBtn
          />
          <DateField name='deadline' label='Deadline' />
          <SelectField
            name={'executionType'}
            options={[{ value: 'physical', label: t('forms.executionTypeInput.values.physical') }, { value: 'virtual', label: t('forms.executionTypeInput.values.virtual') }, { value: 'combo', label: t('forms.executionTypeInput.values.combo') }]}
            label={`${t('createTask.fieldExecutionType')}`} />
          <SelectField
            name={'currency'}
            options={Object.entries(getCurrencies()).map(([key, value]) => ({ label: key, value: key }))}
            label={`${t('currency')}`} />
          <PriceSelectForm currency={formik.values.currency}/>
          <CountryField
            name='countryCode'
            label={`${t('createTask.fieldCountry')}`} />
          {formik.values.countryCode ?
            <CityField
              countryCode={formik.values.countryCode}
              name='geonameid'
              label={`${t('createTask.fieldLocation')}`} />
            :
            null
          }
          <AddressField name='address' label={`${t('createTask.fieldAddress')}`} />
          <div className={styles.wrapper}>
            <Button red size="14px 65px">CREATE TASK</Button>
          </div>
        </div>
      </Form>
    </FormikProvider>
  )
}
