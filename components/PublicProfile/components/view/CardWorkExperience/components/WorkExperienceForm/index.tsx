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

let WorkExperienceForm = (props) => {
  const error = useSelector((state: IRootState) => state.profileWorkExperience.formError)

  return (
    <form className={styles.root} onSubmit={props.handleSubmit}>
      <Field
        name="photo"
        component={AvatarInput}
        labelType="placeholder"
        label={'Upload photo'}
      />
      <Field
        name="title"
        component={Input}
        size={'small'}
        label="Job position"
        labelType={'placeholder'}
      />
      <div className={styles.dates}>
        <Field
          name="fromDate"
          component={Input}
          size={'small'}
          label="From date"
          validate={[required, date]}
          {...dateFormat}
          mask={'99/99/9999'}
          labelType={'placeholder'}
        />
        <Field
          name="toDate"
          component={Input}
          size={'small'}
          label="To date"
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
        label="Company or Institution name"
        labelType={'placeholder'}
      />

      <Field
        name="description"
        component={TextArea}
        size={'small'}
        label="Description"
        labelType={'placeholder'}
      />
      <Field
        name="link"
        component={Input}
        size={'small'}
        label="Add link"

        labelType={'placeholder'}
      />
      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button size={'small'} onClick={props.onCancel}>Cancel</Button>
        <Button size={'small'} type={'submit'}>Save</Button>
      </div>
    </form>
  )
}


WorkExperienceForm  = reduxForm({
  form: 'workExperienceForm',

}) (WorkExperienceForm)


export default WorkExperienceForm
