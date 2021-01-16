import Input from "components/ui/Inputs/Input";
import { Field, reduxForm,formValueSelector } from 'redux-form'

import styles from './index.module.scss'

let PriceSelectForm = props => {
  const { handleSubmit } = props
  const handleHourFieldChange = () => {
    props.change('budget', null);
  }
  const handleFixedFieldChange = () => {
    props.change('ratePerHour', null);
    props.change('estimate', null);
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
              placeholder="0.01 - 100"
              label="Rate per hour"
              labelType={'static'}
              min="0.01"
              max="100.00"
              step="0.01"
              parse={value => value ? parseFloat(value) : ''}
              onChange={handleHourFieldChange}
            />
          </div>
          <div className={styles.inputHour}>
            <Field
              name="estimate"
              component={Input}
              placeholder="max 30 days"
              label="Estimate"
              labelType={'static'}
              type={'number'}
              min="1"
              max="30"
              parse={value => value ? parseFloat(value) : ''}
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
              placeholder="1 - 5 000"
              label="Budget"
              labelType={'static'}
              min="1"
              max="5000"
              type={'number'}
              parse={value => value ? parseFloat(value) : ''}
              onChange={handleFixedFieldChange}
            />
          </div>
          <div  className={styles.inputFixed}>

          </div>
        </div>
      </div>
    </div>
  )
}
export default PriceSelectForm
