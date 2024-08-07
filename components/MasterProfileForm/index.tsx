import AvatarInput from 'components/ui/AvatarInput'
import Button from 'components/ui/Button'
import FormError from 'components/ui/Form/FormError'
import Input from 'components/ui/Inputs/Input'
import InputCheckbox from 'components/ui/Inputs/InputCheckbox'
import * as React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { IRootState } from 'types'
import { birthdate, date, required} from 'utils/validations'
import { useSelector, connect } from 'react-redux'
import InputLocation from 'components/ui/Inputs/InputLocation'
import styles from './index.module.scss'
import CheckboxSubCategory from 'components/ui/Form/MasterProfile/CheckboxSubCategory'
import {useTranslation, Trans} from 'next-i18next'
import InputCountry from 'components/ui/Inputs/InputCountry'
import InputDate from 'components/ui/Inputs/InputDate'

let MasterForm = props => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.profile.formError)
  const {t} = useTranslation()
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
                component={InputDate}
                label="BOD* DD / MM / YYYY"
                validate={[required, date, birthdate]}
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

        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.separator}/>
        <div className={styles.terms}>
          <Field
            name="terms"
            component={InputCheckbox}
            validate={required}
            label={<Trans i18nKey="masterForm.rules">С <a href={''}>правилами сайта</a> ознакомился и согласен</Trans>}
          />
        </div>

        <div className={styles.btnContainer}>
          <FormError error={error}/>
          <Button red size="14px 105px">{t('task.save')}</Button>
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
const selector = formValueSelector('masterForm')
MasterForm = connect(state => {
  const countryCode = selector(state, 'countryCode')
  return {
    countryCode,
  }
})(MasterForm)
export default MasterForm
