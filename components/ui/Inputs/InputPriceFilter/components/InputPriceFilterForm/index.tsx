import Button from "components/ui/Button";
import FormError from "components/ui/Form/FormError";
import Input from "components/ui/Inputs/Input";
import { RadioList } from "components/ui/Inputs/RadioList";
import SelectInput from "components/ui/Inputs/SelectInput";
import { useEffect, useState } from "react";
import * as React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from "types";
import { connect,  } from 'react-redux'
import { parserPrice } from "utils/formatters";
import { arrayNotEmpty, required } from "utils/validations";
import styles from './index.module.scss'
import { Field, reduxForm,formValueSelector } from 'redux-form'

let InputPriceFilterForm = (props) => {
  const error = useSelector((state: IRootState) => state.profile.formError)

  console.log("InputPriceFilterForm", props.form)
  return (
    <form className={styles.root} onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="type"
          component={SelectInput}
          withIcon={false}
          size={'small'}
          validate={required}
          options={[
            {label: 'Fixed price', value: 'fixed'},
            {label: 'Rate per hour', value: 'rate'}
          ]}
        />
      </div>
      <div className={styles.column}>
      <Field
        name="min"
        label="Min"
        size={'small'}
        component={Input}
        noMargin={true}
        format={(value) => `$ ${value || ''}`}
        parse={parserPrice}     />

      <div className={styles.separator}>-</div>

      <Field
        name="max"
        size={'small'}
        label="Max"
        component={Input}
        noMargin={true}
        format={(value) => `$ ${value || ''}`}
        parse={parserPrice}     />
      </div>

    </form>
  )
}


InputPriceFilterForm  = reduxForm({
  form: 'InputPriceFilterForm',

}) (InputPriceFilterForm )


export default InputPriceFilterForm
