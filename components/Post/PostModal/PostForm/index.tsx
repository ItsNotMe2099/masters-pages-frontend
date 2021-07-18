import FormError from "components/ui/Form/FormError";
import Input from "components/ui/Inputs/Input";
import TextArea from "components/ui/Inputs/TextArea";
import * as React from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch, connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Button from 'components/PublicProfile/components/Button'
import {birthdate, date, required} from 'utils/validations'
import SelectInput from 'components/ui/Inputs/SelectInput'
import FileInput from 'components/ui/Inputs/FilesUploadInput'
import AvatarInput from 'components/ui/AvatarInput'
import Checkbox from 'components/ui/Inputs/Checkbox'
import Link from 'next/link'
import InputCategory from 'components/ui/Inputs/InputCategory'
import RadioListSubCategories from 'components/ui/Inputs/RadioListSubCategories'
import {useEffect, useState} from 'react'
import EventReviewForm
  from 'components/Calendar/components/EditEventModal/components/ChatTab/components/EventReview/EventReviewForm'
import {fetchProfileTabList} from 'components/ProfileTab/actions'
import {useTranslation, Trans} from 'react-i18next'

let PostForm = (props) => {
  const {categoryId, subCategoryId, showInPortfolio} = props;
  const dispatch = useDispatch();
  const profile = useSelector((state: IRootState) => state.profile.currentProfile);
  const error = useSelector((state: IRootState) => state.profileGallery.formError)
  const profileTabs = useSelector((state: IRootState) => state.profileTab.list).filter(item => item.type === 'gallery')
  const {t} = useTranslation('common')

  useEffect(() => {
    if(categoryId && subCategoryId) {
      dispatch(fetchProfileTabList({
        profileId: profile.id,
        categoryId,
        subCategoryId
      }));
    }
  }, [categoryId, subCategoryId, showInPortfolio])


  return (
    <form className={styles.root} onSubmit={props.handleSubmit}>
      <Field
        name="photo"
        component={AvatarInput}
        size={'small'}
        labelType="placeholder"
        label={t('follower.postForm.uploadPhoto')}
      />
      <Field
        name="showInPortfolio"
        component={Checkbox}
        label={t('follower.postForm.showInPortfolio')}
      />
      {(showInPortfolio) && <Field
        name="categoryId"
        component={InputCategory}
        label={t('createTask.filter.fieldCategory')}
        validate={required}
      />}
      {(showInPortfolio) && <Field
        name="subCategoryId"
        component={RadioListSubCategories}
        label={t('createTask.filter.fieldSubCategory')}
        validate={required}
        categoryId={categoryId}
      />}
      {(showInPortfolio && profileTabs.length > 0) && <Field
        name="profileTabId"
        label={t('follower.postForm.tab')}
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
        name="state"
        component={Checkbox}
        label={t('follower.postForm.published')}
        format={(value) => value === 'published'}
        parse={(value) =>  value ? 'published' : 'draft'}/>

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


PostForm  = reduxForm({
  form: 'PostForm',

}) (PostForm)
const selector = formValueSelector('PostForm')
PostForm = connect(state =>
  {
    const categoryId = selector(state, 'categoryId')
    const subCategoryId = selector(state, 'subCategoryId')
    const showInPortfolio = selector(state, 'showInPortfolio')
    return {categoryId, subCategoryId, showInPortfolio}
  }
)(PostForm)

export default PostForm
