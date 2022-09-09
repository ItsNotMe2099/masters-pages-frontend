import * as React from 'react'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import { Form, FormikProvider, useFormik } from 'formik'
import { IProject } from 'data/intefaces/IProject'
import TextAreaField from 'components/fields/TextAreaField'
import {useState} from 'react'
import Button from 'components/PublicProfile/components/Button'
import { IAutoMessages } from 'data/intefaces/IAutoMessages'
import Validator from 'utils/validator'
import SwitchField from 'components/fields/SwitchField'
import { ApplicationStatus } from 'data/intefaces/IApplication'

interface Props {
  project: IProject
  applicationStatusChange?: boolean
  isEvent?: boolean
  prevStatus?: string
  nextStatus?: string
  onSubmit?: (data) => void
  autoMessages?: IAutoMessages
  desc?: boolean
}

const MessageCardForm = ({project, applicationStatusChange, autoMessages, isEvent, ...props}: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const filtered = applicationStatusChange ? autoMessages?.applicationStatusChangeMessages.find(item => item.nextStatus === props.nextStatus && item.prevStatus === props.prevStatus) : isEvent ? autoMessages?.eventMessages.find(item => item.event === props.nextStatus) : autoMessages?.projectStatusChangeMessages.find(item => item.nextStatus === props.nextStatus && item.prevStatus === props.prevStatus)
 
  const initialValues = {
    projectId: project.id,
    applicationStatusChangeMessages: [],
    projectStatusChangeMessages: [] ,
    eventMessages: [],
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

  const renderActionButton = (nextStatus) => {
    switch (nextStatus) {
      case ApplicationStatus.Applied:
        return <Button type='button' projectBtn='green'>APPLY</Button>
      case ApplicationStatus.Shortlist:
        if(props.prevStatus !== ApplicationStatus.Invited){
          return <Button type='button' projectBtn='green'>SHORTLIST</Button>
        }
        else{
          return <Button type='button' projectBtn='red'>CANCEL INVITATION</Button>
        }
      case ApplicationStatus.RejectedByCompany:
        return <Button type='button' projectBtn='red'>REJECT</Button>
      case ApplicationStatus.Invited:
        return <Button type='button' projectBtn='green'>INVITE</Button>
      case 'feedback':
        return <Button type='button' projectBtn='green'>REVIEW</Button>
      case 'recommendation':
        return <Button type='button' projectBtn='green'>RECOMMEND</Button>
    }
  }

  const {values, setFieldValue} = formik

  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <TextAreaField name={'message'} validate={Validator.required}/>
        <div className={styles.controls}>
        <div className={styles.switch}>
        {props.desc && <div className={styles.fakeBtn}>{renderActionButton(props.nextStatus)}</div>}
        <SwitchField  name='enabled' onChange={() => handleSwitch(values)}/>   
        </div>  
        <Button type='submit' size={'small'} color={'red'}>Save</Button>
        </div>
      </Form>
    </FormikProvider>
  )
}

export default MessageCardForm
