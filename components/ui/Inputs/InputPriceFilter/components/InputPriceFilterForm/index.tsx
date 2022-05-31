import Input from 'components/ui/Inputs/Input'
import SelectInput from 'components/ui/Inputs/SelectInput'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from 'types'
import { parserPrice } from 'utils/formatters'
import { required } from 'utils/validations'
import styles from './index.module.scss'
import { Field, reduxForm } from 'redux-form'
import { useTranslation } from 'next-i18next'

let InputPriceFilterForm = (props) => {
  const {t} = useTranslation()
  const error = useSelector((state: IRootState) => state.profile.formError)

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
            {label: t('forms.priceTypeInput.values.fixed'), value: 'fixed'},
            {label: t('forms.priceTypeInput.values.rate'), value: 'rate'}
          ]}
        />
      </div>
      <div className={styles.column}>
      <Field
        name="min"
        label={t('forms.priceFilterInput.min')}
        size={'small'}
        component={Input}
        noMargin={true}
        format={(value) => `$ ${value || ''}`}
        parse={parserPrice}     />

      <div className={styles.separator}>-</div>

      <Field
        name="max"
        size={'small'}
        label={t('forms.priceFilterInput.max')}
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
