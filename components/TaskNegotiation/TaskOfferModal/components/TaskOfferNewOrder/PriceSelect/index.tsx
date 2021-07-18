import Input from "components/ui/Inputs/Input";
import SelectInput from "components/ui/Inputs/SelectInput";
import * as React from "react";
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { maskBirthDate } from "utils/masks";
import { required } from "utils/validations";

import styles from './index.module.scss'
import {getCurrencySymbol} from 'data/currency'
import InputCurrency from 'components/ui/Inputs/InputCurrency'
import {parserPrice} from 'utils/formatters'
import {useTranslation, Trans} from "i18n";

let PriceSelectFormMini = props => {
  const { handleSubmit } = props
  const handleHourFieldChange = () => {
    props.change('budget', null);
  }
  const handleFixedFieldChange = () => {
    props.change('ratePerHour', null);
    props.change('estimate', null);
  }
  const {t} = useTranslation('common')
  return (
    <div className={styles.root}>
      <div className={styles.label}>{`${t('price')}:`}</div>
      <div className={styles.price}>
        <Field
          name="offerPriceType"
          component={SelectInput}
          withIcon={false}
          size={'small'}
          validate={required}
          options={[
            { label: t('fixedPrice'), value: 'fixed' },
            { label: t('perHour'), value: 'rate' }
          ]}
        />
        {props.offerPriceType === 'fixed' && <Field
          name="budget"
          size={'small'}
          component={Input}
          validate={required}
          format={(value) => `${getCurrencySymbol(props.currency)}   ${value || ''}`}
          parse={parserPrice}/>}
        {props.offerPriceType === 'rate' && <Field
          name="ratePerHour"
          component={Input}
          size={'small'}
          format={(value) => `${getCurrencySymbol(props.currency)}   ${value || ''}`}
          parse={parserPrice}

          validate={required}
        />}
      </div>
      <Field
        name="currency"
        component={InputCurrency}
        withIcon={false}
        size={'small'}
        label={`${t('currency')}:`}
        labelType={'static'}
        validate={required}
      />
      <Field
        name="deadline"
        component={Input}
        label={`${t('deadline')}:`}
        validate={required}
        size={'small'}
        labelType={'static'}
        mask={'99/99/9999'}
      />

    </div>
  )
}
export default PriceSelectFormMini
