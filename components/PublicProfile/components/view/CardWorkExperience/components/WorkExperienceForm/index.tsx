import FormError from "components/ui/Form/FormError";
import Input from "components/ui/Inputs/Input";
import TextArea from "components/ui/Inputs/TextArea";
import * as React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from "types";
import styles from './index.module.scss'
import { Field, reduxForm } from 'redux-form'
import Button from 'components/PublicProfile/components/Button'
import {birthdate, date, required} from 'utils/validations'
import AvatarInput from 'components/ui/AvatarInput'
import {format, parse} from 'date-fns'
import {dateFormat} from 'utils/masks'
import {useTranslation} from 'i18n'

let WorkExperienceForm = (props) => {
  const error = useSelector((state: IRootState) => state.profileWorkExperience.formError)
  const {i18n, t} = useTranslation('common')

  return (
    <form className={styles.root} onSubmit={props.handleSubmit}>
      <Field
        name="photo"
        component={AvatarInput}
        labelType="placeholder"
        label={t('uploadPhoto')}
      />
      <Field
        name="title"
        component={Input}
        size={'small'}
        label={t('cardWorkExperience.form.jobPosition')}
        labelType={'placeholder'}
      />
      <div className={styles.dates}>
        <Field
          name="fromDate"
          component={Input}
          size={'small'}
          label={t('cardWorkExperience.form.fromDate')}
          validate={[required, date]}
          {...dateFormat}
          mask={'99/99/9999'}
          labelType={'placeholder'}
        />
        <Field
          name="toDate"
          component={Input}
          size={'small'}
          label={t('cardWorkExperience.form.toDate')}
          validate={[required, date]}
          {...dateFormat}
          mask={'99/99/9999'}
          labelType={'placeholder'}
        />
      </div>
      <Field
        name="company"
        component={Input}
        size={'small'}
        label={t('cardWorkExperience.form.companyOrInstitution')}
        labelType={'placeholder'}
      />

      <Field
        name="description"
        component={TextArea}
        size={'small'}
        label={t('follower.postForm.description')}
        labelType={'placeholder'}
      />
      <Field
        name="link"
        component={Input}
        size={'small'}
        label={t('addLink')}

        labelType={'placeholder'}
      />
      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button size={'small'} onClick={props.onCancel}>{t('cancel')}</Button>
        <Button size={'small'} type={'submit'}>{t('save')}</Button>
      </div>
    </form>
  )
}


WorkExperienceForm  = reduxForm({
  form: 'workExperienceForm',

}) (WorkExperienceForm)


export default WorkExperienceForm
