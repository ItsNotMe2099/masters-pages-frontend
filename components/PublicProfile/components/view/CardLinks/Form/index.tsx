import * as React from 'react'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import Button from 'components/PublicProfile/components/Button'
import { Field, Form, Formik } from 'formik'
import { IOrganization } from 'data/intefaces/IOrganization'
import InputLink from 'components/ui/Formik/InputLink'

interface Props{
  onCancel: () => void,
  handleSubmit?: (data) => void,
  organization: IOrganization
}

export default function CardLinksForm(props: Props) {
  const { t } = useTranslation('common')

  const initialValues = {  

      socialLinks: [
        {
          link: props.organization.socialLinks[0].link,
          type: props.organization.socialLinks[0].type
        },
        {
          link: props.organization.socialLinks[1].link,
          type: props.organization.socialLinks[1].type
        },
        {
          link: props.organization.socialLinks[2].link,
          type: props.organization.socialLinks[2].type
        },
        {
          link: props.organization.socialLinks[3].link,
          type: props.organization.socialLinks[3].type
        },
        {
          link: props.organization.socialLinks[4].link,
          type: props.organization.socialLinks[4].type
        },
      ]
  }

  const Icon =(index: number) => {
    return `/img/CardLinks/icons/${props.organization.socialLinks[index].type}.svg`
  }

  const Link = (index: number) => {
    return `socialLinks[${index}].link`
  }

  const Type = (index: number) => {
    return `socialLinks[${index}].type`
  }

  return (
    <Formik initialValues={initialValues} onSubmit={props.handleSubmit}>
      <Form>
        {props.organization.socialLinks.map((item, index) => 
          <>
          <InputLink classTextarea={styles.textarea} icon={Icon(index)} name={Link(index)}/>
          <Field name={Type(index)} className={styles.invisible}/>
          </>
        )}
        <div className={styles.buttons}>
          <Button size={'small'} type={'button'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
          <Button size={'small'} type={'submit'}>{t('task.save')}</Button>
        </div>
      </Form>
    </Formik>
  )
}