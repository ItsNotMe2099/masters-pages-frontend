import * as React from 'react'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import Button from 'components/PublicProfile/components/Button'
import { Field, Form, Formik } from 'formik'
import { IOrganization } from 'data/intefaces/IOrganization'
import TextAreaInput from 'components/ui/Formik/TextArea'

interface Props{
  onCancel: () => void,
  handleSubmit?: (data) => void,
  organization: IOrganization
}

export default function CardDescriptionForm(props: Props) {
  const { t } = useTranslation('common')

  const initialValues = {  

    description: {
      description: props.organization.about.about,
      visible: props.organization.about.visible
    },
    photo: props.organization.photo
}

return (
  <Formik initialValues={initialValues} onSubmit={props.handleSubmit}>
    <Form>
      <TextAreaInput classTextarea={styles.textarea} name='description.description'/>
      <Field name='about.visible' className={styles.invisible}/>
      <div className={styles.buttons}>
        <Button size={'small'} type={'button'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
        <Button size={'small'} type={'submit'}>{t('task.save')}</Button>
      </div>
    </Form>
  </Formik>
)
}