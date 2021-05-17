import Input from "components/ui/Inputs/Input";
import * as React from "react";
import { Field, reduxForm,formValueSelector } from 'redux-form'
import { required } from "utils/validations";
import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import {useTranslation} from "react-i18next";
import {CheckboxList} from 'components/ui/Inputs/CheckboxList'
import SelectInput from 'components/ui/Inputs/SelectInput'
import Button from 'components/PublicProfile/components/Button'
import ShareLabel from 'components/Share/ShareLabel'
import {IRootState} from 'types'
const queryString = require('query-string')

let PersonalLabelForm = props => {
  const {t} = useTranslation()
  const { handleSubmit, onChangeForStat } = props

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
        <div className={styles.rowSelect}>
          <Field
            name="style"
            size={'small'}
            component={SelectInput}
            withIcon={false}
            showEmpty={false}
            noMargin={false}
            options={[
              {label: 'Vertical style', value: 'vertical'},
              {label: 'Horizontal style', value: 'horizontal'}
            ]}
          />
          <Field
            name="theme"
            size={'small'}
            component={SelectInput}
            withIcon={false}
            showEmpty={false}
            noMargin={false}
            options={[
              {label: 'Light theme', value: 'light'},
              {label: 'Dark theme', value: 'dark'}
            ]}
          />
        </div>
      <div className={styles.rowCheckboxes}>
        <Field
          name="options"
          component={CheckboxList}
          flex={'row'}
          parse={(value) => ({
            qrCode: value.includes('qrCode'),
            name: value.includes('name'),
            phone: value.includes('phone'),
            webAddress: value.includes('webAddress'),
          })}
          format={(value) => ([
            ...(value?.qrCode ? ['qrCode'] : []),
            ...(value?.name ? ['name'] : []),
            ...(value?.phone ? ['phone'] : []),
            ...(value?.webAddress ? ['webAddress'] : []),
          ])}
          options={[
            {label: 'QR code', value: 'qrCode'},
            {label: 'Web address', value: 'webAddress'},
            {label: 'Name', value: 'name'},
            {label: 'Phone', value: 'phone'},
          ]}
        />
      </div>


      </form>
  )
}

PersonalLabelForm   = reduxForm ({
  form: 'PersonalLabelForm',
}) (PersonalLabelForm )

const selector = formValueSelector('PersonalLabelForm') // <-- same as form name
export default PersonalLabelForm
