import { useFormik, Form, FormikProvider } from 'formik'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import TextField from 'components/fields/TextField'
import Button from 'components/ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState, ITaskFormData } from 'types'
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
import Loader from 'components/ui/Loader'
import Modal from 'components/ui/Modal'
import { useRouter } from 'next/dist/client/router'
import { createTaskeReset } from 'components/CreateTaskPage/actions'
import { modalClose } from 'components/Modal/actions'
import ServiceCategoryField from 'components/fields/ServiceCategoryField'
import RadioListField from 'components/fields/RadioListField'
import ProfileSearchField from 'components/fields/ProfileSearchField'
import TaskNegotiationRepository from "data/repositories/TaskNegotiationRepository";
import {ProjectStatus} from "data/intefaces/IProject";

interface Props {
  isMaster: boolean
  onSubmit: (data: ITaskFormData) => void
}

export default function CreateTaskForm({ isMaster, onSubmit }: Props) {

  const appContext = useAppContext()
  const profile = appContext.profile

  const [loading, setLoading] = useState<boolean>(false)

  const [success, setSuccess] = useState<boolean>(false)

  const initialValues = {
    profileId: null,
    title: null,
    skills: {
      mainCategoryId: 7855,
      categoryId: 7856,
      subCategoryId: 7857
    },
    description: '',
    photos: [],
    deadline: null,
    executionType: null,
    currency: 'USD',
    visibilityType: isMaster ? 'private' : 'public',
    masterRole: isMaster ? profile.role : null,
    countryCode: null,
    geonameid: null,
    budget: null,
    ratePerHour: null,
    estimate: null,
    address: null,
    mainCategoryId: null,
    categoryId: null,
    subCategoryId: null
  }

  const handleSubmitDraft = async () => {
    console.log("handleSubmitDraft")
    await formik.setFieldValue('_isDraft', true);
    await formik.submitForm();
  }
  const handleSubmit = async () => {
    console.log("handleSubmitDraft")
    await formik.setFieldValue('_isDraft', false);
    await formik.submitForm();
  }
  const formik = useFormik({
    initialValues,
    onSubmit,
  })

  const dispatch = useDispatch()

  const router = useRouter()


  useEffect(() => {
    formik.setFieldValue('mainCategoryId', formik.values.skills.mainCategoryId)
    formik.setFieldValue('categoryId', formik.values.skills.categoryId)
    formik.setFieldValue('subCategoryId', formik.values.skills.subCategoryId)
  }, [formik.values.skills])

  console.log('VALUES!!!!', formik.values)

  const { t } = useTranslation('common')

  const skillsCurrentProfile = useSelector((state: IRootState) => state.skill.list)

  console.log('sdafsegf', skillsCurrentProfile)

  return (
    <>
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <div className={styles.main}>
            <div className={styles.title__top}>Fill up the order request</div>
            {!isMaster ?
              <>
                <RadioListField
                  name="visibilityType"
                  options={[{ label: t('public'), value: 'public' }, { label: t('private'), value: 'private' }]} flex />
                {formik.values.visibilityType === 'private' ?
                  <ProfileSearchField
                    name='profileId'
                    validate={Validator.required}
                    label={`Master iD (required field)*`}
                    role={appContext.profile.role}
                  /> : null
                }
                <SelectField
                  name={'executionType'}
                  options={[{ value: 'physical', label: t('forms.executionTypeInput.values.physical') }, { value: 'virtual', label: t('forms.executionTypeInput.values.virtual') }, { value: 'combo', label: t('forms.executionTypeInput.values.combo') }]}
                  label={`Execution Type (required field)*`} validate={Validator.required} />
              </>
              : null
            }
            {isMaster && formik.values.visibilityType === 'private' ? <ProfileSearchField
              name='profileId'
              validate={Validator.required}
              label={`Client iD (required field)*`}
              role={appContext.profile.role}
            /> : null}
            <TextField
              name='title'
              label='Order title (required field)*'
              validate={Validator.required}
            />
            {isMaster ? <SkillsField
              name='skills'
              label='Master’s Profile (required field)*'
              validate={Validator.required}
            /> : null}

            {!isMaster ?
              <>
                <ServiceCategoryField name={'mainCategoryId'} validate={Validator.required} label={'Main category (required field)*'} />
                <ServiceCategoryField name={'categoryId'} categoryId={formik.values.mainCategoryId} validate={Validator.required} label={'Category (required field)*'} />
                <ServiceCategoryField name={'subCategoryId'} categoryId={formik.values.categoryId} validate={Validator.required} label={'Sub category (required field)*'} />
              </>
              :
              null}
            <div className={styles.tip}>
              Complete optional fields<br />
              or
            </div>
            <div className={styles.buttons}>
              <Button type={'button'} red={isMaster} green={!isMaster} size="14px 30px" onClick={handleSubmitDraft}>SAVE AS DRAFT</Button>
              <Button type={'button'} red={isMaster} green={!isMaster} size="14px 30px" onClick={handleSubmit}>CREATE ORDER</Button>
            </div>
          </div>
          <div className={styles.optional}>
            <div className={styles.title__top}>Optional fields</div>
            <div className={styles.separator}></div>
            <TextAreaField
              name='description'
              label='Order description'
            />
            <FileField
              name='photos'
              multiple
              largeBtn
            />
            <DateField name='deadline' label='Deadline' />
            {isMaster ? <SelectField
              name={'executionType'}
              options={[{ value: 'physical', label: t('forms.executionTypeInput.values.physical') }, { value: 'virtual', label: t('forms.executionTypeInput.values.virtual') }, { value: 'combo', label: t('forms.executionTypeInput.values.combo') }]}
              label={`${t('createTask.fieldExecutionType')}`} /> : null}
            <SelectField
              name={'currency'}
              options={Object.entries(getCurrencies()).map(([key, value]) => ({ label: key, value: key }))}
              label={`${t('currency')}`} />
            <PriceSelectForm currency={formik.values.currency} />
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
            <div className={styles.buttons}>
              <Button type={'button'} red={isMaster} green={!isMaster} size="14px 30px" onClick={handleSubmitDraft}>SAVE AS DRAFT</Button>
              <Button type={'button'} red={isMaster} green={!isMaster} size="14px 30px" onClick={handleSubmit}>CREATE ORDER</Button>
            </div>
          </div>
        </Form>
      </FormikProvider>
      <Modal
        isOpen={loading} onRequestClose={() => {

        }}>
        <Loader />
      </Modal>
      <Modal
        title={t('createTask.successTitle')}
        image={'/img/icons/congratulations.svg'}
        isOpen={success} onRequestClose={() => {
          dispatch(createTaskeReset())
          dispatch(modalClose())
          if (profile.role === 'client') {
            router.push('/orders/draft')
          } else {
            router.push('/orders/offers')
          }
        }}>

      </Modal>
    </>
  )
}
