import AvatarInput from "components/ui/AvatarInput";
import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import Input from "components/ui/Inputs/Input";
import InputCheckbox from "components/ui/Inputs/InputCheckbox";
import * as React from "react";
import { Field, reduxForm } from 'redux-form'
import { createTextMask } from "redux-form-input-masks";
import { IRootState } from "types";
import { maskBirthDate } from "utils/masks";
import { required } from "utils/validations";
import { useSelector, useDispatch } from 'react-redux'
import InputLocation from 'components/ui/Inputs/InputLocation'
import styles from './index.module.scss'
import CheckboxSubCategory from 'components/ui/Form/MasterProfile/CheckboxSubCategory';

let MasterForm = props => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.profile.formError)

  console.log(`props: ${props}`)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.mainForm}>
          <div className={styles.title__top}>1. Personal information</div>
          <div className={styles.taskData}>
            <div className={styles.column}>
              <Field
                name="firstName"
                component={Input}
                label="First name*"
                validate={required}
              />
              <Field
                name="birth"
                component={Input}
                label="BOD* MM / DD / YYYY"
                validate={required}
                {...maskBirthDate}
              />
            </div>
            <div className={styles.column}>
              <Field
                name="lastName"
                component={Input}
                label="Last name*"
                validate={required}
              />
              <Field
                name="geonameid"
                component={InputLocation}
                label="Location*"
                validate={required}
              />
            </div>
          </div>
          <Field
            name="photo"
            component={AvatarInput}
            label="Avatar*"
          />
          <div className={styles.title__top}>3. Choose categories</div>
          <div className={styles.taskData}>
            <div className={styles.column}>
              <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/> Nunc dictum
                duis risus imperdiet
              </div>
              <div className={styles.inputContainer}>
                <Field
                  name="categories"
                  component={CheckboxSubCategory}
                  label="Categoires*"
                  validate={required}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.important}>
          <div className={styles.head}>Important information</div>
          <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id quam at lacinia
            integer cursus venenatis fringilla arcu eget. Sed fames sed praesent cursus ornare fermentum. Fusce varius
            quisque
          </div>
          <div className={styles.text__bottom}>dolor elementum neque tellus vivamus nunc. Sodales integer aenean
            vestibulum
          </div>
        </div>
      </div>
      <div className={styles.containerBottom}>
        <div className={styles.separator}></div>
        <div className={styles.terms}>
          <Field
            name="terms"
            component={InputCheckbox}
            label={<div>С <a href={''}>правилами сайта</a> ознакомился и согласен</div>}
            validate={required}
          />
        </div>

        <div className={styles.btnContainer}>
          <FormError error={error}/>
          <Button red size="14px 105px">ГОТОВО</Button>
        </div>
      </div>
    </form>
  )
}

MasterForm = reduxForm({
  form: 'masterForm',
})(MasterForm)

export default MasterForm
