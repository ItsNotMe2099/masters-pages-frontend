import * as React from 'react'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import { Form, FormikProvider, useFormik } from 'formik'
import { IProject } from 'data/intefaces/IProject'
import TextAreaField from 'components/fields/TextAreaField'
import {useState, useEffect} from 'react'
import AutoMessagesRepository from 'data/repositories/AutoMessagesRepository'
import Button from 'components/PublicProfile/components/Button'
import Switch from 'react-switch'
import { IAutoMessages } from 'data/intefaces/IAutoMessages'
import Validator from 'utils/validator'
import SwitchField from 'components/fields/SwitchField'
import Loader from 'components/ui/Loader'

interface Props {
  project: IProject
  applicationStatusChange?: boolean
  prevStatus?: string
  nextStatus?: string
  onSubmit?: (data) => void
  autoMessages?: IAutoMessages
}

const MessageCardForm = ({project, applicationStatusChange, autoMessages, ...props}: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const filtered = applicationStatusChange ? autoMessages?.applicationStatusChangeMessages.find(item => item.nextStatus === props.nextStatus) : autoMessages?.projectStatusChangeMessages.find(item => item.nextStatus === props.nextStatus)
 
  const initialValues = {
    projectId: project.id,
    applicationStatusChangeMessages: [],
    projectStatusChangeMessages: [] ,
    message: filtered ? filtered?.message : '',
    enabled: filtered ? filtered?.enabled : false
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

  const handleSwitch = (data) => {
    data.enabled = data.enabled ? false : true
    props.onSubmit && props.onSubmit(data)
  
    setError(null)
    setIsLoading(true);
    try {

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

  const {values, setFieldValue} = formik

    console.log('AUTOMESSAGESFORM', autoMessages)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <TextAreaField name={'message'} validate={Validator.required}/>
        <div className={styles.controls}>
        <SwitchField  name='enabled' onChange={() => handleSwitch(values)}/>     
        <Button type='submit' size={'small'} color={'red'}>Save</Button>
        </div>
      </Form>
    </FormikProvider>
  )
}

export default MessageCardForm
