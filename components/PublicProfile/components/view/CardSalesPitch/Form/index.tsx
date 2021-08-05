import AvatarInput from "components/ui/AvatarInput";
import FormError from "components/ui/Form/FormError";
import Input from "components/ui/Inputs/Input";
import * as React from "react";
import { useSelector, useDispatch, connect } from 'react-redux'
import { IRootState } from "types";
import styles from './index.module.scss'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import {useTranslation, withTranslation} from "i18n";
import TextArea from 'components/ui/Inputs/TextArea'
import Button from 'components/PublicProfile/components/Button'
import {bioMaxLength} from 'utils/validations'
interface Props{
  onCancel: () => void,
  handleSubmit?: () => void,
  onSubmit?: (data) => void
  initialValues?: any
}
let SalesPitchForm = (props: Props) => {
  const { t } = useTranslation('common');
  const error = useSelector((state: IRootState) => state.skill.formError)

  return (
    <form className={styles.root} onSubmit={props.handleSubmit}>
      <div className={styles.form}>
        <div className={styles.description}>
        <Field
          name="description"
          component={TextArea}
          labelType="placeholder"
          validate={[bioMaxLength]}
          label={t('cardSalesPitch.form.fillUpSalePitch')}
        />
        </div>
        <div className={styles.photo}>
        <Field
          name="photo"
          component={AvatarInput}
          accept={["image/jpeg", "image/png", "video/mp4"]}
          maxSize={5242880 * 10}
          labelType="placeholder"
          label={t('uploadPhoto')}
          infoTitle={t('uploadPhotoOrVideo')}
          infoFormatAllowed={t('formatAllowed')}
        />
        </div>
      </div>

      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button size={'small'} type={'button'} onClick={props.onCancel}>{t('cancel')}</Button>
        <Button size={'small'} type={'submit'}>{t('save')}</Button>
      </div>

    </form>
  )
}

SalesPitchForm  = reduxForm({
  form: 'salesPitchForm',

}) (SalesPitchForm)


const selector = formValueSelector('salesPitchForm') // <-- same as form name
SalesPitchForm = connect(state => {
  return {

  }
})(SalesPitchForm)
export default SalesPitchForm
