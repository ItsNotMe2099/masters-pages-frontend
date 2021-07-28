import FormError from "components/ui/Form/FormError";
import Input from "components/ui/Inputs/Input";
import TextArea from "components/ui/Inputs/TextArea";
import * as React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from "types";
import styles from './index.module.scss'
import { Field, reduxForm } from 'redux-form'
import Button from 'components/PublicProfile/components/Button'
import {birthdate, date, required} from 'utils/validations'
import SelectInput from 'components/ui/Inputs/SelectInput'
import FileInput from 'components/ui/Inputs/FilesUploadInput'
import AvatarInput from 'components/ui/AvatarInput'
import {useTranslation} from 'i18n'


let PortfolioForm = (props) => {
  const error = useSelector((state: IRootState) => state.profilePortfolio.formError)
  const profileTabs = useSelector((state: IRootState) => state.profileTab.list).filter(item => item.type === 'portfolio')
  const {t} = useTranslation('common');

  return (
    <form className={styles.root} onSubmit={props.handleSubmit}>
      <Field
        name="photo"
        component={AvatarInput}
        size={'small'}
        labelType="placeholder"
        label={t('follower.postForm.uploadPhoto')}
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
        name="length"
        label={t('length')}
        component={SelectInput}
        size={'small'}
        options={[
          {label: t('portfolio.1 month'), value: '1 month'},
          {label: t('portfolio.2 month'), value: '2 months'},
          {label: t('portfolio.3 month'), value:  '3 month'},
          {label: t('portfolio.4 month'), value: '4 months'},
          {label: t('portfolio.5 month'), value: '5 months'},
        ]}
        withIcon={false}
        showEmpty={true}
      />
      <Field
        name="title"
        component={Input}
        size={'small'}
        label={t('follower.postForm.title')}
        labelType={'placeholder'}
      />
      <Field
        name="link"
        component={Input}
        size={'small'}
        label="Add link"
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
        name="files"
        component={FileInput}
        addFileButton={<div >
          <Button  type={'button'} size="small">  <img src="/img/icons/camera.svg" alt=''/> {t('forms.fileInput.uploadFiles')}</Button>
          <div className={styles.addFileButtonDesc}>
            {t('forms.fileInput.description')}
          </div>
        </div>}
        label={t('photos')}
        multiple={true}
        onChange={(files) => {

        }}
        min="1"
        max="30"
      />
      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button size={'small'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
        <Button size={'small'} type={'submit'}>{t('task.save')}</Button>
      </div>
    </form>
  )
}


PortfolioForm  = reduxForm({
  form: 'portfolioForm',

}) (PortfolioForm)


export default PortfolioForm
