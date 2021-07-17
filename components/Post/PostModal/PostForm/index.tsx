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

let PostForm = (props) => {
  const {categoryId, subCategoryId, showInPortfolio} = props;
  const dispatch = useDispatch();
  const profile = useSelector((state: IRootState) => state.profile.currentProfile);
  const error = useSelector((state: IRootState) => state.profileGallery.formError)
  const profileTabs = useSelector((state: IRootState) => state.profileTab.list).filter(item => item.type === 'gallery')

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
        label={'Upload photo'}
      />
      <Field
        name="showInPortfolio"
        component={Checkbox}
        label={'Show in portfolio'}
      />
      {(showInPortfolio) && <Field
        name="categoryId"
        component={InputCategory}
        label="Category"
        validate={required}
      />}
      {(showInPortfolio) && <Field
        name="subCategoryId"
        component={RadioListSubCategories}
        label="Sub Category"
        validate={required}
        categoryId={categoryId}
      />}
      {(showInPortfolio && profileTabs.length > 0) && <Field
        name="profileTabId"
        label={'Tab'}
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
        label="Title"
        labelType={'placeholder'}
      />

      <Field
        name="description"
        component={TextArea}
        size={'small'}
        label="Description"
        labelType={'placeholder'}
      />
      <Field
        name="state"
        component={Checkbox}
        label={'Published'}
        format={(value) => value === 'published'}
        parse={(value) =>  value ? 'published' : 'draft'}/>

      <Field
        name="commentsAllowed"
        component={Checkbox}
        label={<div>Comments allowed</div>}
      />
      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button size={'small'} onClick={props.onCancel}>Cancel</Button>
        <Button size={'small'} type={'submit'}>Save</Button>
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
