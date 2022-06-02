import * as React from 'react'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import Button from 'components/PublicProfile/components/Button'
import { Form, Formik } from 'formik'
import { IOrganization } from 'data/intefaces/IOrganization'
import AvatarField from 'components/fields/AvatarField'
import { IProfile } from 'data/intefaces/IProfile'

interface Props{
  onSubmit?: (data) => void,
  organization?: IOrganization
  profile?: IProfile
}

export default function AvatarForm(props: Props) {
  const { t } = useTranslation('common')

  const initialValues = {  
    photo: props.organization ? props.organization?.corporateProfile.photo : props.profile?.photo
}

return (
  <Formik initialValues={initialValues} onSubmit={props.onSubmit}>
    <Form>
      <AvatarField name={'photo'} label={'Upload Photo or Video'} accept={['image/jpeg', 'image/png', 'image/jpg', 'video/mp4']}/>
      <div className={styles.buttons}>
        <Button size={'small'} type={'submit'}>{t('task.save')}</Button>
      </div>
    </Form>
  </Formik>
)
}