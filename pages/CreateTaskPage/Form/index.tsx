import Accordion from 'components/ui/Accordion'
import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import Checkbox from 'components/ui/Inputs/Checkbox'
import Input from "components/ui/Inputs/Input";
import InputAddress from "components/ui/Inputs/InputAddress";
import InputCategory from 'components/ui/Inputs/InputCategory'
import InputSubCategory from 'components/ui/Inputs/InputSubCategory'
import FileInput from "components/ui/Inputs/S3FileUpload";
import SelectInput from "components/ui/Inputs/SelectInput";
import TextArea from "components/ui/Inputs/TextArea";
import Link from 'next/link'
import PriceSelectForm from "pages/CreateTaskPage/Form/components/PriceSelect";
import * as React from "react";
import { Field, reduxForm,formValueSelector } from 'redux-form'
import { IRootState } from "types";
import { maskBirthDate } from "utils/masks";
import { required } from "utils/validations";
import { useSelector, useDispatch } from 'react-redux'
import InputLocation from 'components/ui/Inputs/InputLocation'
import styles from './index.module.scss'
import { connect } from 'react-redux'
import {useTranslation} from "react-i18next";
const queryString = require('query-string')

let CreateTaskForm = props => {
  const {t} = useTranslation()
  const { handleSubmit, onChangeForStat } = props
  const error = useSelector((state: IRootState) => state.createTaskComplete.formError)
  const searchStatCount = useSelector((state: IRootState) => state.profileSearch.searchStatCount)
  const statFilter = useSelector((state: IRootState) => state.profileSearch.searchStatFilter);

  const getSearchStatFilterLink = () => {
    console.log("StatFilter", statFilter.masterRole);
    return `/${statFilter.masterRole === 'volunteer' ?'SearchVolunteerPage' : 'SearchMasterPage'}/?${queryString.stringify({filter: JSON.stringify(statFilter)}, {encode: true}).replace(/(")/g, '%22')}`
  }
  //=%7B"categoryId"%3A4%2C"subCategoryId"%3A11%7D
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.mainForm}>
          <div className={styles.title__top}>{t('createTask.stepFillUpTaskRequest')}</div>
          <div className={styles.taskData}>
            <div className={styles.column}>
              <Field
                name="title"
                component={Input}
                label={`${t('createTask.fieldTitle')}`}
                validate={required}
              />
              <Field
                name="geonameid"
                component={InputLocation}
                label={`${t('createTask.fieldLocation')}`}
                validate={required}
              />
              <Field
                name="masterRole"
                onChange={(value) => onChangeForStat('masterRole', value)}
                component={SelectInput}
                label={`${t('createTask.fieldMasterType')}`}
                options={[{value: 'master', label: 'Master'}, {value: 'volunteer', label: 'Volunteer'}]}
                validate={required}
              />
            </div>
            <div className={styles.column}>
              <Field
                name="categoryId"
                component={InputCategory}
                onChange={(value) => onChangeForStat('categoryId', value)}
                label={`${t('createTask.fieldCategory')}`}
                validate={required}
              />
              <Field
                name="subCategoryId"
                component={InputSubCategory}
                onChange={(value) => onChangeForStat('subCategoryId', value)}
                label={`${t('createTask.fieldSubCategory')}`}
                categoryId={props.categoryId}
                validate={required}
              />
            </div>
          </div>
          <div className={styles.column}>
            <Field
              name="executionType"
              component={SelectInput}
              label={`${t('createTask.fieldExecutionType')}`}
              options={[{value: 'physical', label: 'Physical'}, {value: 'virtual', label: 'Virtual'}, {value: 'combo', label: 'Combo'}]}
              validate={required}
              labelType={'cross'}
            />
            <Field
              name="deadline"
              component={Input}
              label={`${t('createTask.fieldDeadline')}`}
              validate={required}

              labelType={'cross'}
              mask={'99/99/9999'}
            />
          </div>
          <div className={styles.address}>
          <Field
            name="address"
            component={InputAddress}
            label={`${t('createTask.fieldAddress')}`}
          />
          </div>
          <div className={styles.taskDesc}>
            <Field
              name="description"
              component={TextArea}
              label={`${t('createTask.fieldDescription')}`}
              validate={required}
            />
          </div>
          <Field
            name="photos"
            component={FileInput}
            label="Photos"
            multiple={true}
            title="Estimate"
            min="1"
            max="30"
          />
           <PriceSelectForm {...props}/>

        <div className={styles.terms}>
          <Field
            name="terms"
            component={Checkbox}
            label={<div>{t('agreeWith')} <Link href="/">{t('termsAndConditions')}</Link></div>}
          />
        </div>
          <FormError error={error}/>
        <div className={styles.btnContainer}>
            <Button red size="14px 65px">{t('createTask.buttonCreateTask')}</Button>
          </div>
        </div>
      <div className={styles.right}>
      {searchStatCount && <div className={styles.stat}>
        <Link href={getSearchStatFilterLink()}>
          <a>{t('createTask.stat', {count: searchStatCount})}</a>
        </Link>
      </div>}

      <div className={styles.faq}>
          <div className={styles.title__top}>{t('createTask.faq')}</div>
          <Accordion title="Question #1" content="Answer"/>
          <Accordion title="Question #2" content="Answer"/>
          <Accordion title="Question #3" content="Answer"/>
          <Accordion title="Question #4" content="Answer"/>
          <Accordion title="Question #5" content="Answer"/>
          <Accordion title="Question #6" content="Answer"/>
        </div>
      </div>
      </form>
  )
}

CreateTaskForm   = reduxForm ({
  form: 'taskForm',
}) (CreateTaskForm )

const selector = formValueSelector('taskForm') // <-- same as form name
CreateTaskForm = connect(state => {
  // can select values individually
  const categoryId = selector(state, 'categoryId')
  console.log("getCategoryId", categoryId)
  return {
    categoryId
  }
})(CreateTaskForm)
export default CreateTaskForm
