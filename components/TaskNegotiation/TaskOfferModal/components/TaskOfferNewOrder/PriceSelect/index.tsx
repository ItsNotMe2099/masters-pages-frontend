import Input from "components/ui/Inputs/Input";
import SelectInput from "components/ui/Inputs/SelectInput";
import * as React from "react";
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { maskBirthDate } from "utils/masks";
import { required } from "utils/validations";

import styles from './index.module.scss'

let PriceSelectFormMini = props => {
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
      <div className={styles.label}>Price:</div>
      <div className={styles.price}>
        <Field
          name="offerPriceType"
          component={SelectInput}
          withIcon={false}
          size={'small'}
          validate={required}
          options={[
            { label: 'Fixed price', value: 'fixed' },
            { label: 'Rate per hour', value: 'rate' }
          ]}
        />
        {props.offerPriceType === 'fixed' && <Field
          name="budget"
          size={'small'}
          component={Input}
          validate={required}
          format={(value) => `$ ${value || ''}`}
          parse={(value) => value ? parseFloat(value?.replace('$', '').replace(/\s/g, '')) : null}/>}
        {props.offerPriceType === 'rate' && <Field
          name="ratePerHour"
          component={Input}
          size={'small'}
          format={(value) => `$ ${value || ''}`}
          parse={(value) => value ? parseFloat(value?.replace('$', '').replace(/\s/g, '')) : null}

          validate={required}
        />}
      </div>
      <Field
        name="deadline"
        component={Input}
        label="Deadline:"
        validate={required}
        size={'small'}
        labelType={'static'}
        {...maskBirthDate}
      />
    </div>
  )
}
export default PriceSelectFormMini
