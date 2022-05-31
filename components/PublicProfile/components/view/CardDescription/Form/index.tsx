import * as React from 'react'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import Button from 'components/PublicProfile/components/Button'
import { Field, Form, Formik } from 'formik'
import { IOrganization } from 'data/intefaces/IOrganization'
import TextAreaInput from 'components/ui/Formik/TextArea'
import DocField from 'components/fields/DocField'
import AvatarField from 'components/fields/AvatarField'

interface Props{
  onCancel: () => void,
  handleSubmit?: (data) => void,
  organization: IOrganization
}

export default function CardDescriptionForm(props: Props) {
  const { t } = useTranslation('common')

  const initialValues = {  

    description: {
      description: props.organization.description?.description,
      visible: true,
    },
    photo: props.organization.photo,
    attachmentsInput: props.organization.attachments
}

return (
  <Formik initialValues={initialValues} onSubmit={props.handleSubmit}>
    <Form>
      <TextAreaInput classTextarea={styles.textarea} name='description.description'/>
      <Field name='description.visible' className={styles.invisible}/>
      <DocField name={'attachmentsInput'} multiple maxAmount={3}
                         addFileButton={<div>
                           <Button type={'button'} size="small"> <img src="/img/icons/camera.svg"
                                                                      alt=''/> {t('forms.fileInput.uploadFiles')}
                           </Button>
                           <div className={styles.addFileButtonDesc}>
                             {t('forms.fileInput.description')}
                           </div>
                         </div>}
              />
      <AvatarField name={'photo'} label={'Upload Photo or Video'} accept={['image/jpeg', 'image/png', 'image/jpg', 'video/mp4']}/>
      <div className={styles.buttons}>
        <Button size={'small'} type={'button'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
        <Button size={'small'} type={'submit'}>{t('task.save')}</Button>
      </div>
    </Form>
  </Formik>
)
}