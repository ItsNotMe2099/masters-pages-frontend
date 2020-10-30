import Accordion from 'components/ui/Accordion'
import Button from 'components/ui/Button'
import Checkbox from 'components/ui/Checkbox'
import Link from 'next/link'
import { Field, reduxForm } from 'redux-form'
import Input from '../ui/Input'
import InputDrop from '../ui/InputDrop'
import InputLocation from '../ui/InputLocation'
import InputPayment from '../ui/InputPayment'
import TextArea from '../ui/TextArea'
import styles from './index.module.scss'

let CreateTaskForm = props => {
  const { handleSubmit } = props
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.mainForm}>
          <div className={styles.title__top}>Fill up task request</div>
          <div className={styles.taskData}>
            <div className={styles.firstColumn}>
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
                title="Master or volunteer*"
              />
            </div>
            <div className={styles.secondColumn}>
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
            </div>
          </div>
          <div className={styles.taskDesc}>
            <Field
              name="taskDescription"
              component={TextArea}
              label="Task description*"
            />
          </div>
      <div className={styles.payment}>
        <div className={styles.wrapper}>
          <div className={styles.horly}>
            <div className={styles.title}>Horly task</div>
            <div className={styles.fields}>
              <div>
                <Field
                  name="ratePerHour"
                  component={InputPayment}
                  label="0.01 - 100"
                  title="Rate per hour"
                />
              </div>
              <div className={styles.week}>
                <Field
                  name="weekHours"
                  component={InputPayment}
                  label="1 - 40"
                  title="Max week hours"
                />
              </div>
            </div>
          </div>
          <div className={styles.or}>or</div>
          <div className={styles.border}></div>
          <div className={styles.fixed}>
            <div className={styles.title}>Fixed price</div>
            <div className={styles.fields}>
              <div>
                <Field
                  name="budget"
                  component={InputPayment}
                  label="1 - 5 000"
                  title="Budget"
                />
              </div>
                <div>
                  <Field
                    name="estimate"
                    component={InputPayment}
                    label="max 30 days"
                    title="Estimate"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.terms}>
            <Field
              name="terms"
              component={Checkbox}
            ><span>I am agree with <Link href="/">terms and conditions</Link></span>
            </Field>
        </div>
        <div className={styles.btnContainer}>
            <Button red size="14px 65px">CREATE TASK</Button>
          </div>
        </div>
        <div className={styles.faq}>
          <div className={styles.title}>FAQ</div>
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
  form: 'taskForm ',
}) (CreateTaskForm  )

export default CreateTaskForm
