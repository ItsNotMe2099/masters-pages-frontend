import AvatarInput from "components/ui/AvatarInput";
import FormError from "components/ui/Form/FormError";
import Input from "components/ui/Inputs/Input";
import * as React from "react";
import { useSelector, useDispatch, connect } from 'react-redux'
import { IRootState } from "types";
import styles from './index.module.scss'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import {useTranslation, withTranslation} from "react-i18next";
import TextArea from 'components/ui/Inputs/TextArea'
import Button from 'components/PublicProfile/components/Button'
interface Props{
  onCancel: () => void,
  handleSubmit?: () => void,
  onSubmit?: (data) => void
  initialValues?: any
}
let CardBioForm = (props: Props) => {
  const { t } = useTranslation('common');
  const error = useSelector((state: IRootState) => state.profile.formError)

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <Field
        name="bio"
        component={TextArea}
        labelType="placeholder"
        label={'BIO'}
        maxlength={1000}
      />

      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button size={'small'} type={'button'} onClick={props.onCancel}>Cancel</Button>
        <Button size={'small'} type={'submit'}>Save</Button>
      </div>

    </form>
  )
}

CardBioForm  = reduxForm({
  form: 'cardBioForm',

}) (CardBioForm)


const selector = formValueSelector('cardBioForm') // <-- same as form name
CardBioForm = connect(state => {
  return {

  }
})(CardBioForm)
export default CardBioForm
