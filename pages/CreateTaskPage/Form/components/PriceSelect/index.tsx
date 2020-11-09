import Input from "components/ui/Inputs/Input";
import { Field, reduxForm,formValueSelector } from 'redux-form'

import styles from './index.module.scss'

let PriceSelectForm = props => {
  const { handleSubmit } = props
  const handleHourFieldChange = () => {
    props.change('budget', "");
    props.change('estimate', "");
  }
  const handleFixedFieldChange = () => {
    props.change('ratePerHour', "");
    props.change('maxWeekHours', "");
  }
  return (
    <div className={styles.root}>
      <div className={styles.hourlySection}>
        <div className={styles.title}>Horly task</div>
        <div className={styles.fields}>
          <div className={styles.inputHour}>
            <Field
              name="ratePerHour"
              component={Input}
              label="0.01 - 100"
              title="Rate per hour"
              min="0.01"
              max="100.00"
              step="0.01"
              parse={value => parseInt(value, 10)}
              onChange={handleHourFieldChange}
            />
          </div>
          <div className={styles.inputHour}>
            <Field
              name="maxWeekHours"
              component={Input}
              label="1 - 40"
              title="Max week hours"
              type={'number'}
              min="1"
              max="40"
              parse={value => parseInt(value, 10)}
              onChange={handleHourFieldChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.orSection}>
        <div className={styles.orWrapper}>
        <div className={styles.orText}>or</div>
        <div className={styles.orBorder}></div>
        </div>
      </div>

      <div className={styles.fixedSection}>
        <div className={styles.title}>Fixed price</div>
        <div className={styles.fields}>
          <div className={styles.inputFixed}>
            <Field
              name="budget"
              component={Input}
              label="1 - 5 000"
              title="Budget"
              min="1"
              max="5000"
              type={'number'}
              parse={value => parseInt(value, 10)}
              onChange={handleFixedFieldChange}
            />
          </div>
          <div  className={styles.inputFixed}>
            <Field
              name="estimate"
              component={Input}
              label="max 30 days"
              title="Estimate"
              type={'number'}
              min="1"
              max="30"
              parse={value => parseInt(value, 10)}
              onChange={handleFixedFieldChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default PriceSelectForm
