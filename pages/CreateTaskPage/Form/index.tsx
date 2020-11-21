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
import { Field, reduxForm,formValueSelector } from 'redux-form'
import { IRootState } from "types";
import { required } from "utils/validations";
import { useSelector, useDispatch } from 'react-redux'
import InputLocation from 'components/ui/Inputs/InputLocation'
import styles from './index.module.scss'
import { connect } from 'react-redux'

let CreateTaskForm = props => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.createTaskComplete.formError)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.mainForm}>
          <div className={styles.title__top}>Fill up task request</div>
          <div className={styles.taskData}>
            <div className={styles.column}>
              <Field
                name="title"
                component={Input}
                label="Task title*"
                validate={required}
              />
              <Field
                name="geonameid"
                component={InputLocation}
                label="Location*"
                validate={required}
              />
              <Field
                name="masterRole"
                component={SelectInput}
                label="Master or volunteer*"
                options={[{value: 'master', label: 'Master'}, {value: 'volunteer', label: 'Volunteer'}]}
                validate={required}
              />
            </div>
            <div className={styles.column}>
              <Field
                name="categoryId"
                component={InputCategory}
                label="Category*"
                validate={required}
              />
              <Field
                name="subCategoryId"
                component={InputSubCategory}
                label="Sub category*"
                categoryId={props.categoryId}
                validate={required}
              />
            </div>
          </div>
          <div className={styles.address}>
          <Field
            name="address"
            component={InputAddress}
            label="Address"
          />
          </div>
          <div className={styles.taskDesc}>
            <Field
              name="description"
              component={TextArea}
              label="Task description*"
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
            ><span>I am agree with <Link href="/">terms and conditions</Link></span>
            </Field>
        </div>
          <FormError error={error}/>
        <div className={styles.btnContainer}>
            <Button red size="14px 65px">CREATE TASK</Button>
          </div>
        </div>
        <div className={styles.faq}>
          <div className={styles.title__top}>FAQ</div>
          <Accordion title="Question #1" content="Answer"/>
          <Accordion title="Question #2" content="Answer"/>
          <Accordion title="Question #3" content="Answer"/>
          <Accordion title="Question #4" content="Answer"/>
          <Accordion title="Question #5" content="Answer"/>
          <Accordion title="Question #6" content="Answer"/>
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
