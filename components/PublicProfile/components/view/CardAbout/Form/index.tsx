import * as React from 'react'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import Button from 'components/PublicProfile/components/Button'
import { Field, Form, Formik } from 'formik'
import TextAreaInput from 'components/ui/Formik/TextArea'
import { IOrganization } from 'data/intefaces/IOrganization'
import OrganizationRepository from 'data/repositories/OrganizationRepository'

interface Props{
  onCancel: () => void,
  handleSubmit?: (data) => void,
  organization: IOrganization
}

export default function CardAboutForm(props: Props) {
  const { t } = useTranslation('common')

  const initialValues = {  

      about: {
        about: props.organization.about?.about,
        visible: true
      }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={props.handleSubmit}>
      <Form>
        <TextAreaInput classTextarea={styles.textarea} name='about.about'/>
        <Field name='about.visible' className={styles.invisible}/>
        <div className={styles.buttons}>
          <Button size={'small'} type={'button'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
          <Button size={'small'} type={'submit'}>{t('task.save')}</Button>
        </div>
      </Form>
    </Formik>
  )
}