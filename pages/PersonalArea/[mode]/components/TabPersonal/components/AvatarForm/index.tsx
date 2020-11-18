import AvatarInput from "components/ui/AvatarInput";
import Input from "components/ui/Inputs/Input";
import InputLocation from "components/ui/Inputs/InputLocation";
import RegistrationForm from "pages/RegistrationPage/Form";
import * as React from "react";
import { required } from "utils/validations";
import styles from './index.module.scss'
import { Field, reduxForm } from 'redux-form'

let AvatarForm = (props) => {
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <Field
        name="photo"
        component={AvatarInput}
        label="Avatar*"
        validate={required}
        handleChangePhoto={() => props.handleSubmit()}
        handleDeletePhoto={() => {props.handleDelete()}}
      />
    </form>
  )
}


AvatarForm  = reduxForm({
  form: 'tabPersonalFormAvatar',

}) (AvatarForm )


export default AvatarForm
