import AvatarInput from "components/ui/AvatarInput";
import Button from "components/ui/Button";
import FormError from "components/ui/Form/FormError";
import CheckboxListSubCategories from "components/ui/Inputs/CheckboxListSubCategories";
import Input from "components/ui/Inputs/Input";
import InputCategory from "components/ui/Inputs/InputCategory";
import InputCountry from "components/ui/Inputs/InputCountry";
import InputLocation from "components/ui/Inputs/InputLocation";
import { RadioList } from "components/ui/Inputs/RadioList";
import RadioListSubCategories from "components/ui/Inputs/RadioListSubCategories";
import FileInput from "components/ui/Inputs/FilesUploadInput";
import SelectInput from "components/ui/Inputs/SelectInput";
import TextArea from "components/ui/Inputs/TextArea";
import { useEffect, useState } from "react";
import * as React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from "types";
import { parserNumber } from "utils/formatters";
import { maskBirthDate } from "utils/masks";
import { arrayNotEmpty, required } from "utils/validations";
import styles from 'components/Portfolio/SkillForm/index.module.scss'
import { Field, reduxForm } from 'redux-form'
import {useTranslation, Trans} from 'i18n'

let SkillForm = (props) => {
  const error = useSelector((state: IRootState) => state.profile.formError)
  const [categoryId, setCategoryId] = useState(null);
  const [priceType, setPriceType] = useState(props.initialValues?.priceType || 'fixed')
  const {t} = useTranslation('common');
  useEffect(() => {

    const categoryId = props.initialValues?.categoryId
    if(categoryId){
      setCategoryId(categoryId);
    }
  }, [])

  const handlePriceTypeChange = (value) => {
    if(value === 'fixed'){
      props.change('pricePerHour', null);
    }
    if(value === 'rate'){
      props.change('price', null);
    }
    setPriceType(value);
  }
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>

      <div className={styles.container}>
        {!props.initialValues?.id && <Field
            name="categoryId"
            component={InputCategory}
            label={t('createTask.fieldCategory')}
            validate={required}
            onChange={(val) => setCategoryId(val)}
          />}
        {!props.initialValues?.id && <Field
            name="subCategoryId"
            component={RadioListSubCategories}
            label="BOD* MM / DD / YYYY"
            validate={required}
            restrictedValues={props.skills.map(item => item.subCategoryId)}
            categoryId={categoryId}
          />}
          <Field
            name="description"
            component={TextArea}
            label={t('portfolio.skillForm.description')}
          />

          <Field
            name="photos"
            component={FileInput}
            addFileButton={<div >
              <Button  type={'button'} grey={true} mediumFont={true} bold={true} size="8px 25px">  <img src="/img/icons/camera.svg" alt=''/> {t('portfolio.skillForm.choosePhoto')}</Button>
              <div className={styles.addFileButtonDesc}>
              {t('portfolio.skillForm.upload')}
              </div>
            </div>}
            label={t('photos')}
            multiple={true}
            min="1"
            max="30"
          />

      </div>

        <div className={styles.priceSection}>
          <div className={styles.priceInput}>
          <Field
            name="priceType"
            component={SelectInput}
            label={t('priceType')}
            onChange={handlePriceTypeChange}
            options={[
              {value: 'rate', label: t('pricePerHour')},
              {value: 'fixed', label: t('task.fixedPrice')}
            ]}
            labelType={'static'}
          />
          </div>
          <div className={styles.priceInput}>
            {priceType === 'rate' && <Field
              name="ratePerHour"
              component={Input}
              label={`${t('perHour')}:`}
              labelType={'static'}
              parse={parserNumber}
            />}
            {priceType === 'fixed' && <Field
              name="price"
              component={Input}
              label={`${t('taskSearch.filter.fieldPrice')}:`}
              labelType={'static'}
              parse={parserNumber}

            />}
          </div>
        </div>

      <div className={styles.container}>
      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button className={styles.button} white={true} borderGrey={true} bold={true} size={'12px 40px'} type={'button'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
        <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true} size={'12px 40px'} type={'submit'}>{t('task.save')}</Button>
      </div>
      </div>
    </form>
  )
}


SkillForm  = reduxForm({
  form: 'skillForm',

}) (SkillForm )


export default SkillForm
