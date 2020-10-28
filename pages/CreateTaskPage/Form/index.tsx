import Button from 'components/ui/Button'
import { Field, reduxForm } from 'redux-form'
import Input from '../ui/Input'
import InputDrop from '../ui/InputDrop'
import InputLocation from '../ui/InputLocation'
import styles from './index.module.scss'

let CreateTaskForm = props => {
  const { handleSubmit } = props
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <div>
          <Field
            name="taskTitle"
            component={Input}
            label="Task title*"
          />
          <Field
            name="location"
            component={InputLocation}
            label="Location*"
          />
          <Field
            name="master"
            component={InputDrop}
            label="Master or volunteer*"
          />
        </div>
        <div>
          <Field
            name="category"
            component={InputDrop}
            label="Category*"
          />
          <Field
            name="subCategory"
            component={InputDrop}
            label="Sub category*"
          />
          <Field
            name="bank"
            component={InputDrop}
            label="Bank account*"
            bank
          />
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Button registrationBtn>COMPLETE REGISTRATION</Button>
      </div>
    </form>
  )
}

CreateTaskForm   = reduxForm ({
  form: 'taskForm ',
}) (CreateTaskForm  )

export default CreateTaskForm 
