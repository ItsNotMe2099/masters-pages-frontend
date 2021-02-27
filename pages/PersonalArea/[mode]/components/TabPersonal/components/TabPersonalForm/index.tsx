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
import {useTranslation, withTranslation} from "react-i18next";

let TabPersonalForm = (props) => {
  const { t } = useTranslation('common');
  const error = useSelector((state: IRootState) => state.profile.formError)
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <Field
            name="firstName"
            component={Input}
            label={t('personalArea.tabProfile.fieldFirstName')}
            labelType="placeholder"
            validate={required}
          />
          <Field
            name="birthday"
            component={Input}
            labelType="placeholder"
            label={t('personalArea.tabProfile.fieldBirthDate')}
          />
        </div>
        <div className={styles.column}>
          <Field
            name="lastName"
            component={Input}
            label={t('personalArea.tabProfile.fieldLastName')}
            labelType="placeholder"
            validate={required}
          />
          <Field
            name="zipcode"
            component={Input}
            labelType="placeholder"
            label={t('personalArea.tabProfile.fieldZip')}
          />
        </div>
      </div>
      <Field
        name="address1"
        component={Input}
        labelType="placeholder"
        label={t('personalArea.tabProfile.fieldAddress')}

      />
      <Field
        name="address2"
        component={Input}
        labelType="placeholder"
        label={t('personalArea.tabProfile.fieldAddress2')}
      />

      <div className={styles.columns}>
        <div className={styles.column}>
          <Field
            name="country"
            component={InputCountry}
            labelType="placeholder"
            label={t('personalArea.tabProfile.fieldCountry')}
          />
        </div>
        <div className={styles.column}>

          <Field
            name="geonameid"
            component={InputLocation}
            labelType="placeholder"
            label={t('personalArea.tabProfile.fieldLocation')}
          />
        </div>
      </div>

      <FormError error={error}/>
      <div className={styles.wrapper}><Button className={styles.button} grey={true} bold={true} size={'12px 70px'} >{t('personalArea.tabProfile.buttonSave')}</Button></div>

    </form>
  )
}


TabPersonalForm  = reduxForm({
  form: 'tabPersonalForm',

}) (TabPersonalForm)


export default TabPersonalForm
