import AvatarInput from "components/ui/AvatarInput";
import Button from "components/ui/Button";
import FormError from "components/ui/Form/FormError";
import Input from "components/ui/Inputs/Input";
import InputCountry from "components/ui/Inputs/InputCountry";
import InputLocation from "components/ui/Inputs/InputLocation";
import * as React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from "types";
import { maskBirthDate } from "utils/masks";
import { required } from "utils/validations";
import styles from './index.module.scss'
import { Field, reduxForm } from 'redux-form'

let TabPersonalForm = (props) => {
  const error = useSelector((state: IRootState) => state.profile.formError)
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <Field
            name="firstName"
            component={Input}
            label="First name*"
            labelType="placeholder"
            validate={required}
          />
          <Field
            name="birthday"
            component={Input}
            labelType="placeholder"
            label="BOD* MM / DD / YYYY"
          />
        </div>
        <div className={styles.column}>
          <Field
            name="lastName"
            component={Input}
            label="Last name*"
            labelType="placeholder"
            validate={required}
          />
          <Field
            name="zipcode"
            component={Input}
            labelType="placeholder"
            label="ZIP Code"
          />
        </div>
      </div>
      <Field
        name="address1"
        component={Input}
        labelType="placeholder"
        label="Address"

      />
      <Field
        name="address2"
        component={Input}
        labelType="placeholder"
        label="Address2"
      />

      <div className={styles.columns}>
        <div className={styles.column}>
          <Field
            name="country"
            component={InputCountry}
            labelType="placeholder"
            label="Country*"
          />
        </div>
        <div className={styles.column}>

          <Field
            name="geonameid"
            component={InputLocation}
            labelType="placeholder"
            label="Location*"
          />
        </div>
      </div>

      <FormError error={error}/>
      <div className={styles.wrapper}><Button className={styles.button} grey={true} bold={true} size={'12px 70px'} >Save changes</Button></div>

    </form>
  )
}


TabPersonalForm  = reduxForm({
  form: 'tabPersonalForm',

}) (TabPersonalForm )


export default TabPersonalForm
