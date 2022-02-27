import Button from 'components/ui/Button'
import FormError from 'components/ui/Form/FormError'
import Input from 'components/ui/Inputs/Input'
import InputCountry from 'components/ui/Inputs/InputCountry'
import InputLocation from 'components/ui/Inputs/InputLocation'
import * as React from 'react'
import { useSelector, connect } from 'react-redux'
import { IRootState } from 'types'
import {birthdate, date, required} from 'utils/validations'
import styles from 'components/for_pages/Settings/TabPersonalForm/index.module.scss'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { useTranslation } from 'next-i18next'
import InputDate from 'components/ui/Inputs/InputDate'

let TabPersonalForm = (props) => {
  const { t } = useTranslation('common')
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
            component={InputDate}
            labelType="placeholder"
            label={t('personalArea.tabProfile.fieldBirthDate')}
            validate={[date, birthdate]}
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
            name="countryCode"
            component={InputCountry}
            onChange={() =>  {
              props.change('geonameid', null)}}
            labelType="placeholder"
            label={t('personalArea.tabProfile.fieldCountry')}
          />
        </div>
        <div className={styles.column}>

          <Field
            name="geonameid"
            component={InputLocation}
            countryCode={props.countryCode}
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


const selector = formValueSelector('tabPersonalForm') // <-- same as form name
TabPersonalForm = connect(state => {
  const countryCode = selector(state, 'countryCode')
  const geonameid = selector(state, 'geonameid')
  return {
    countryCode,
    geonameid
  }
})(TabPersonalForm)
export default TabPersonalForm
