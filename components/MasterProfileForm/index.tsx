import AvatarInput from "components/ui/AvatarInput";
import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import Input from "components/ui/Inputs/Input";
import InputCheckbox from "components/ui/Inputs/InputCheckbox";
import * as React from "react";
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { createTextMask } from "redux-form-input-masks";
import { IRootState } from "types";
import { maskBirthDate } from "utils/masks";
import {arrayNotEmpty, birthdate, date, required} from "utils/validations";
import { useDispatch, useSelector, connect } from 'react-redux'
import InputLocation from 'components/ui/Inputs/InputLocation'
import styles from './index.module.scss'
import CheckboxSubCategory from 'components/ui/Form/MasterProfile/CheckboxSubCategory';
import {useTranslation, Trans} from 'i18n'
import InputCountry from 'components/ui/Inputs/InputCountry'
import RegistrationForm from 'pages/RegistrationPage/Form'

let MasterForm = props => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.profile.formError)
  const {t} = useTranslation();
  console.log("RERENDER");
  return (
    <div>
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.mainForm}>
          <div className={styles.title__top}>1. {t('masterForm.personalInformation')}</div>
          <div className={styles.taskData}>
            <div className={styles.column}>
              <Field
                name="firstName"
                component={Input}
                label={t('masterForm.firstName')}
                validate={required}
              />
              <Field
                name="birthday"
                component={Input}
                label="BOD* MM / DD / YYYY"
                validate={[required, date, birthdate]}
                mask={'99/99/9999'}
              />
            </div>
            <div className={styles.column}>
              <Field
                name="lastName"
                component={Input}
                label={t('masterForm.lastName')}
                validate={required}
              />
            </div>

          </div>
          <div className={styles.taskData}>
            <div className={styles.column}>
              <Field
                name="countryCode"
                component={InputCountry}
                label={t('masterForm.country')}
                validate={required}
              />
            </div>
            <div className={styles.column}>

            <Field
                name="geonameid"
                component={InputLocation}
                countryCode={props.countryCode}
                label={t('masterForm.location')}
                validate={required}
              />
            </div>
          </div>
          <Field
            name="photo"
            component={AvatarInput}
            label={t('masterForm.avatar')}
          />
          <div className={styles.title__top}>3. {t('masterForm.chooseCategories')}</div>
          <div className={styles.taskData}>
            <div className={styles.column}>
              <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/> Nunc dictum
                duis risus imperdiet
              </div>
              <div className={styles.inputContainer}>
                <Field
                  name="categories"
                  component={CheckboxSubCategory}
                  label={t('masterForm.categories')}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.important}>
          <div className={styles.head}>{t('masterForm.importantInformation')}</div>
          <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id quam at lacinia
            integer cursus venenatis fringilla arcu eget. Sed fames sed praesent cursus ornare fermentum. Fusce varius
            quisque
          </div>
          <div className={styles.text__bottom}>dolor elementum neque tellus vivamus nunc. Sodales integer aenean
            vestibulum
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.separator}/>
        <div className={styles.terms}>
          <Field
            name="terms"
            component={InputCheckbox}
            label={<Trans i18nKey="masterForm.rules">С <a href={''}>правилами сайта</a> ознакомился и согласен</Trans>}
          />
        </div>

        <div className={styles.btnContainer}>
          <FormError error={error}/>
          <Button red size="14px 105px">{t('ready')}</Button>
        </div>
      </div>
    </form>
      </div>
  )
}

MasterForm = reduxForm({
  form: 'masterForm',
  validate: (values) => {
    if(!values.categories || values.categories.length === 0){
      return {categories: 'selectCategory'}
    }
  }
})(MasterForm)


export default MasterForm
