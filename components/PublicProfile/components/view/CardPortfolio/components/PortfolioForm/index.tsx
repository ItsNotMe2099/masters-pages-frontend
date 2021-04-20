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

let PortfolioForm = (props) => {
  const error = useSelector((state: IRootState) => state.profilePortfolio.formError)
  const profileTabs = useSelector((state: IRootState) => state.profileTab.list).filter(item => item.type === 'portfolio')

  return (
    <form className={styles.root} onSubmit={props.handleSubmit}>
      <Field
        name="photo"
        component={AvatarInput}
        size={'small'}
        labelType="placeholder"
        label={'Upload photo'}
      />
      {profileTabs.length > 0 && <Field
        name="profileTabId"
        label={'Category'}
        component={SelectInput}
        size={'small'}
        options={profileTabs.map(item => ({label: item.title, value: item.id}))}
        withIcon={false}
        showEmpty={false}
        validate={required}
      />}
      <Field
        name="length"
        label={'Length'}
        component={SelectInput}
        size={'small'}
        options={[
          {label: '1 month', value: '1 month'},
          {label: '2 months', value: '2 months'},
          {label: '3 months', value:  '3 month'},
          {label: '4 months', value: '4 months'},
          {label: '5 months', value: '5 months'},
        ]}
        withIcon={false}
        showEmpty={true}
      />
      <Field
        name="title"
        component={Input}
        size={'small'}
        label="Title"
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
        label="Description"
        labelType={'placeholder'}
      />
      <Field
        name="files"
        component={FileInput}
        addFileButton={<div >
          <Button  type={'button'} size="small">  <img src="/img/icons/camera.svg" alt=''/> Upload files</Button>
          <div className={styles.addFileButtonDesc}>
            Upload your photo, Format allowed PNG and JPEG
          </div>
        </div>}
        label="Photos"
        multiple={true}
        onChange={(files) => {
          console.log("onChangeFiles", files);
        }}
        min="1"
        max="30"
      />
      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button size={'small'} onClick={props.onCancel}>Cancel</Button>
        <Button size={'small'} type={'submit'}>Save</Button>
      </div>
    </form>
  )
}


PortfolioForm  = reduxForm({
  form: 'portfolioForm',

}) (PortfolioForm)


export default PortfolioForm
