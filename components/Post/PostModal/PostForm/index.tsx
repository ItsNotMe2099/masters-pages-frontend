import FormError from 'components/ui/Form/FormError'
import Input from 'components/ui/Inputs/Input'
import TextArea from 'components/ui/Inputs/TextArea'
import * as React from 'react'
import { IRootState } from 'types'
import styles from './index.module.scss'
import { useSelector, useDispatch, connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Button from 'components/PublicProfile/components/Button'
import { required } from 'utils/validations'
import SelectInput from 'components/ui/Inputs/SelectInput'
import AvatarInput from 'components/ui/AvatarInput'
import Checkbox from 'components/ui/Inputs/Checkbox'
import { useEffect } from 'react'

import { fetchProfileTabList } from 'components/ProfileTab/actions'
import { useTranslation } from 'next-i18next'
import InputSkill from 'components/ui/Inputs/InputSkill'
import { useAppContext } from 'context/state'
import ProjectRepository from 'data/repositories/ProjectRepository'
import { IProject } from 'data/intefaces/IProject'
import { ProfileRole } from 'data/intefaces/IProfile'
import { ApplicationStatus, IApplication } from 'data/intefaces/IApplication'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import { useRouter } from 'next/router'

let PostForm = (props) => {
  const { categoryId, subCategoryId, showInPortfolio, projectId } = props
  const dispatch = useDispatch()
  const appContext = useAppContext();
  const profile = appContext.profile
  const error = useSelector((state: IRootState) => state.profileGallery.formError)
  const profileTabs = useSelector((state: IRootState) => state.profileTab.list).filter(item => item.type === 'gallery')
  const { t } = useTranslation('common')
  const router = useRouter()

  const [projects, setProjects] = React.useState<IProject[]>([])

  useEffect(() => {
    if (categoryId && subCategoryId) {
      dispatch(fetchProfileTabList({
        profileId: profile.id,
        categoryId,
        subCategoryId
      }))
    }
  }, [categoryId, subCategoryId, showInPortfolio])

  const fetchProjects = async () => {
    await ProjectRepository.fetch().then(i => {
      if (i) {
        setProjects(i.data)
      }
    })
  }

  const [app, setApp] = React.useState<IApplication | null>(null)

  const fetchApplication = async () => {
    await ApplicationRepository.fetchOneByProject(projectId).then(i => {
      if (i) {
        setProjects([i.project])
      }
    })
  }

  const fetchApplicationsVolunteer = async (role: ProfileRole) => {
    await ApplicationRepository.listApplicationsByProfileRole(role).then(data => {
      if (data) {
        const filtered = data.data.filter(i => i.status === ApplicationStatus.Execution
          || i.status === ApplicationStatus.CompleteRequest || i.status === ApplicationStatus.Completed)
        // Extract an array of i.project items from filtered
      const projectArray = filtered.map(i => i.project)

      // Now you can use projectArray as needed
      setProjects(projectArray)
      }
    })
  }

  useEffect(() => {
    if (profile.role === ProfileRole.Corporate) {
      fetchProjects()
    }
    if (profile.role === ProfileRole.Volunteer) {
      if (router.asPath !== '/Posts') {
        fetchApplication()
      }
      else {
        //fetchApplicationsVolunteer(ProfileRole.Volunteer)
        fetchProjects()
      }
    }
  }, [])


  return (
    <form className={styles.root} onSubmit={props.handleSubmit}>
      <Field
        name="photo"
        component={AvatarInput}
        size={'small'}
        labelType="placeholder"
        label={t('follower.postForm.uploadPhoto')}
      />


      {(showInPortfolio) && <Field
        name="subCategoryId"
        component={InputSkill}
        useSubCategoryId={true}
        label={`${t('createTask.fieldCategory')}`}
        validate={required}
        size={'small'}
        labelType={'static'}
      />}
      {(showInPortfolio && profileTabs.length > 0) && <Field
        name="profileTabId"
        label={t('follower.postForm.tab')}
        component={SelectInput}
        size={'small'}
        options={profileTabs.map(item => ({ label: item.title, value: item.id }))}
        withIcon={false}
        showEmpty={false}
        validate={required}
      />}
      <Field
        name="projectId"
        component={SelectInput}
        options={projects.map(i => ({ label: i.title, value: i.id }))}
        size={'small'}
        label={'Choose your project'}
        labelType={'placeholder'}
      />
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
        parse={(value) => value ? 'published' : 'draft'} />

      <Field
        name="commentsAllowed"
        component={Checkbox}
        label={<div>{t('follower.postForm.commentsAllowed')}</div>}
      />
      {profile.role !== ProfileRole.Corporate && <Field
        name="showInPortfolio"
        component={Checkbox}
        label={t('follower.postForm.showInPortfolio')}
      />}
      <FormError error={error} />
      <div className={styles.buttons}>
        <Button size={'small'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
        <Button size={'small'} type={'submit'}>{t('task.save')}</Button>
      </div>
    </form>
  )
}


PostForm = reduxForm({
  form: 'PostForm',

})(PostForm)
const selector = formValueSelector('PostForm')
PostForm = connect(state => {
  const mainCategoryId = selector(state, 'mainCategoryId')
  const categoryId = selector(state, 'categoryId')
  const showInPortfolio = selector(state, 'showInPortfolio')
  return { categoryId, mainCategoryId, showInPortfolio }
}
)(PostForm)

export default PostForm
