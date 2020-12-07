import AvatarInput from "components/ui/AvatarInput";
import Button from "components/ui/Button";
import FormError from "components/ui/Form/FormError";
import Input from "components/ui/Inputs/Input";
import InputCountry from "components/ui/Inputs/InputCountry";
import InputLocation from "components/ui/Inputs/InputLocation";
import SelectInput from "components/ui/Inputs/SelectInput";
import * as React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from "types";
import { maskBirthDate } from "utils/masks";
import { required } from "utils/validations";
import styles from './index.module.scss'
import { Field, reduxForm } from 'redux-form'

let TabSettingsForm = (props) => {
  const error = useSelector((state: IRootState) => state.profile.formError)
  return (
    <form className={styles.root} onSubmit={props.handleSubmit}>
      <div className={styles.rows}>
        <div className={styles.row}>
          <div className={styles.label}>Main currency:</div>
          <Field
            name="currency"
            component={SelectInput}
            label="Main currency"
            validate={required}
            options={[{label: 'Canadian dollar', value: 'USD'}]}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Language:</div>
          <Field
            name="language"
            component={SelectInput}
            label="Language"
            validate={required}
            options={[{label: 'RU', value: 'ru'}]}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Language:</div>
          <Field
            name="sendNotifications"
            component={SelectInput}
            label="Send notification"
            validate={required}
            options={[{label: 'To all devices', value: 'all'}]}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Region:</div>
          <Field
            name="region"
            component={SelectInput}
            label="Region"
            options={[{label: 'Whole world', value: ''}]}
          />
        </div>

      </div>

       <FormError error={error}/>
      <Button className={styles.button} grey={true} bold={true} size={'12px 70px'}  type={'submit'}>Save changes</Button>


    </form>
  )
}


TabSettingsForm  = reduxForm({
  form: 'tabSettingsForm',

}) (TabSettingsForm )


export default TabSettingsForm
