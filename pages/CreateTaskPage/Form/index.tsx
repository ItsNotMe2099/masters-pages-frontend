import Accordion from 'components/ui/Accordion'
import Button from 'components/ui/Button'
import Checkbox from 'components/ui/Checkbox'
import InputCategory from 'components/ui/InputCategory'
import InputSubCategory from 'components/ui/InputSubCategory'
import Link from 'next/link'
import { Field, reduxForm } from 'redux-form'
import Input from '../ui/Input'
import InputLocation from 'components/ui/InputLocation'
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
            <div className={styles.column}>
              <Field
                name="title"
                component={Input}
                label="Task title*"
              />
              <Field
                name="geonameid"
                component={InputLocation}
                label="Location*"
                isTask={true}
              />
              <Field
                name="masterRole"
                component={InputCategory}
                label="Master or volunteer*"
                isMaster={true}
              />
            </div>
            <div className={styles.column}>
              <Field
                name="categoryId"
                component={InputCategory}
                label="Category*"
              />
              <Field
                name="subCategoryId"
                component={InputSubCategory}
                label="Sub category*"
              />
            </div>
          </div>
          <div className={styles.taskDesc}>
            <Field
              name="description"
              component={TextArea}
              label="Task description*"
            />
          </div>
      <div className={styles.payment}>
        <div className={styles.wrapper}>
          <div className={styles.horly}>
            <div className={styles.title}>Horly task</div>
            <div className={styles.fields}>
              <div className={styles.first}>
                <Field
                  name="ratePerHour"
                  component={InputPayment}
                  label="0.01 - 100"
                  title="Rate per hour"
                  min="0.01"
                  max="100.00"
                  step="0.01"
                />
              </div>
              <div className={styles.week}>
                <Field
                  name="maxWeekHours"
                  component={InputPayment}
                  label="1 - 40"
                  title="Max week hours"
                  min="1"
                  max="40"
                />
              </div>
            </div>
          </div>
          <div className={styles.or}>or</div>
          <div className={styles.border}></div>
          <div className={styles.fixed}>
            <div className={styles.title}>Fixed price</div>
            <div className={styles.fields}>
              <div className={styles.first}>
                <Field
                  name="budget"
                  component={InputPayment}
                  label="1 - 5 000"
                  title="Budget"
                  min="1"
                  max="5000"
                />
              </div>
                <div>
                  <Field
                    name="estimate"
                    component={InputPayment}
                    label="max 30 days"
                    title="Estimate"
                    min="1"
                    max="30"
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
  form: 'taskForm ',
}) (CreateTaskForm  )

export default CreateTaskForm
