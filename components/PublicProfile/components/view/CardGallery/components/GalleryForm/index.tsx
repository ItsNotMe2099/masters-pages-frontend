import FormError from 'components/ui/Form/FormError'
import Input from 'components/ui/Inputs/Input'
import TextArea from 'components/ui/Inputs/TextArea'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from 'types'
import styles from './index.module.scss'
import { Field, reduxForm } from 'redux-form'
import Button from 'components/PublicProfile/components/Button'
import { required} from 'utils/validations'
import SelectInput from 'components/ui/Inputs/SelectInput'
import AvatarInput from 'components/ui/AvatarInput'
import Checkbox from 'components/ui/Inputs/Checkbox'
import { useTranslation } from 'next-i18next'

let GalleryForm = (props) => {
  const error = useSelector((state: IRootState) => state.profilePortfolio.formError)
  const profileTabs = useSelector((state: IRootState) => state.profileTab.list).filter(item => item.type === 'gallery')
  const { t } = useTranslation('common')

  return (
    <form className={styles.root} onSubmit={props.handleSubmit}>
      <Field
        name="photo"
        component={AvatarInput}
        size={'small'}
        labelType="placeholder"
        label={t('follower.postForm.uploadPhoto')}
        validate={required}
      />
      {profileTabs.length > 0 && <Field
        name="profileTabId"
        label={t('createTask.fieldCategory')}
        component={SelectInput}
        size={'small'}
        options={profileTabs.map(item => ({label: item.title, value: item.id}))}
        withIcon={false}
        showEmpty={false}
        validate={required}
      />}
      <Field
        name="title"
        component={Input}
        size={'small'}
        label={t('follower.postForm.title')}
        labelType={'placeholder'}
      />

      <Field
        name="description"
        component={TextArea}
        size={'small'}
        label={t('follower.postForm.description')}
        labelType={'placeholder'}
      />
      <Field
        name="commentsAllowed"
        component={Checkbox}
        label={<div>{t('follower.postForm.commentsAllowed')}</div>}
      />
      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button size={'small'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
        <Button size={'small'} type={'submit'}>{t('task.save')}</Button>
      </div>
    </form>
  )
}


GalleryForm  = reduxForm({
  form: 'GalleryForm',

}) (GalleryForm)


export default GalleryForm
