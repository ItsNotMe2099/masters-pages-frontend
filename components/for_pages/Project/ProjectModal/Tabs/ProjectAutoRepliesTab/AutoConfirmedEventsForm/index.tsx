import * as React from 'react'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import { useAppContext } from 'context/state'
import { Form, FormikProvider, useFormik } from 'formik'
import { IProject } from 'data/intefaces/IProject'
import { useState } from 'react'
import SwitchField from 'components/fields/SwitchField'
import ProjectRepository from 'data/repositories/ProjectRepository'

interface Props {
  project: IProject
  onSubmit?: (data) => void
}

const AutoConfirmedEventsForm = ({ project, ...props }: Props) => {
  const { t } = useTranslation();
  const appContext = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const initialValues = {
    autoConfirmedEvents: true
  }

  const handleSubmit = async (data) => {
    props.onSubmit && props.onSubmit(data)
    setError(null)
    setIsLoading(true);
    try {

    } catch (e) {
      setError(e)
    }
    setIsLoading(false)
  }

  const handleSwitch = async (data) => {
    data.autoConfirmedEvents = data.autoConfirmedEvents ? false : true

    setError(null)
    setIsLoading(true);
    try {
      await ProjectRepository.update(project.id, data)
    } catch (e) {
      setError(e)
    }
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    enableReinitialize: true
  })

  const { values, setFieldValue } = formik

  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <div className={styles.title}>
          EVENTS settings
        </div>
        <div className={styles.switch}>
          <SwitchField label='Auto confirm for event planning' name='autoConfirmedEvents' onChange={() => handleSwitch(values)} />
        </div>
      </Form>
    </FormikProvider>
  )
}

export default AutoConfirmedEventsForm
