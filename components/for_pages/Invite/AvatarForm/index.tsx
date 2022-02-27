import AvatarInput from 'components/ui/AvatarInput'
import * as React from 'react'
import { required } from 'utils/validations'
import styles from 'components/for_pages/Invite/AvatarForm/index.module.scss'
import { Field, reduxForm } from 'redux-form'
import {IRootState} from 'types'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
let AvatarForm = (props) => {
  const { t } = useTranslation('common')
  const error = useSelector((state: IRootState) => state.profile.avatarFormError)
  const loading = useSelector((state: IRootState) => state.profile.avatarLoading)
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <Field
        name="photo"
        component={AvatarInput}
        label={`${t('avatar')}*`}
        loading={loading}
        error={error}
        validate={required}
        handleChangePhoto={() => props.handleSubmit()}
        handleDeletePhoto={() => {props.handleDelete()}}
      />
    </form>
  )
}


AvatarForm  = reduxForm({
  form: 'tabPersonalFormAvatar',

}) (AvatarForm )


export default AvatarForm
