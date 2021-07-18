import Accordion from 'components/ui/Accordion'
import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import Checkbox from 'components/ui/Inputs/Checkbox'
import Input from "components/ui/Inputs/Input";
import InputAddress from "components/ui/Inputs/InputAddress";
import InputCategory from 'components/ui/Inputs/InputCategory'
import InputSubCategory from 'components/ui/Inputs/InputSubCategory'
import FileInput from "components/ui/Inputs/FilesUploadInput";
import SelectInput from "components/ui/Inputs/SelectInput";
import TextArea from "components/ui/Inputs/TextArea";
import Link from 'next/link'
import PriceSelectForm from "pages/CreateTaskPage/Form/components/PriceSelect";
import { Field, reduxForm,formValueSelector } from 'redux-form'
import { IRootState } from "types";
import { required } from "utils/validations";
import { useSelector, useDispatch } from 'react-redux'
import InputLocation from 'components/ui/Inputs/InputLocation'
import styles from './index.module.scss'
import { connect } from 'react-redux'
import {useTranslation} from "i18n";

let TabOrderForm = props => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.createTaskComplete.formError)
  const {t} = useTranslation('common');

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
       <div className={styles.taskData}>
          <div className={styles.column}>
            <Field
              name="title"
              component={Input}
              label={`${t('taskTitle')}*`}
              validate={required}
            />
            <Field
              name="geonameid"
              component={InputLocation}
              label={`${t('location')}*`}
              validate={required}
            />
            <Field
              name="masterRole"
              component={SelectInput}
              label={`${t('masterOrVolunteer')}*`}
              options={[{value: 'master', label: t('master')}, {value: 'volunteer', label: t('volunteer')}]}
              validate={required}
            />
          </div>
          <div className={styles.column}>
            <Field
              name="categoryId"
              component={InputCategory}
              label={`${t('category')}*`}
              validate={required}
            />
            <Field
              name="subCategoryId"
              component={InputSubCategory}
              label={`${t('subCategory')}*`}
              categoryId={props.categoryId}
              validate={required}
            />
          </div>
        </div>
        <div className={styles.address}>
          <Field
            name="address"
            component={InputAddress}
            label={t('address')}
          />
        </div>
        <div className={styles.taskDesc}>
          <Field
            name="description"
            component={TextArea}
            label={`${t('taskDescription')}*`}
            validate={required}
          />
        </div>
        <Field
          name="photos"
          component={FileInput}
          label={t('photos')}
          multiple={true}
          title={t('estimate')}
          min="1"
          max="30"
        />
        <PriceSelectForm {...props}/>
        <FormError error={error}/>
      <div className={styles.buttons}>
        <Button className={styles.button} white={true} borderGrey={true} bold={true} size={'12px 40px'} type={'button'} onClick={props.onCancel}>{t('cancel')}</Button>
        <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true} size={'12px 40px'} type={'submit'}>{t('save')}</Button>
      </div>

    </form>
  )
}

TabOrderForm   = reduxForm ({
  form: 'orderForm',
}) (TabOrderForm )

const selector = formValueSelector('orderForm') // <-- same as form name
TabOrderForm = connect(state => {
  const categoryId = selector(state, 'categoryId')
  return {
    categoryId
  }
})(TabOrderForm)
export default TabOrderForm
