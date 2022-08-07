import * as React from 'react'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import MessageCardForm from './Form'
import { IProject } from 'data/intefaces/IProject'
import { IAutoMessages } from 'data/intefaces/IAutoMessages'

interface Props {
  name: string
  project?: IProject
  prevStatus: string
  nextStatus: string
  applicationStatusChange: boolean
  onSubmit?: (data) => void
  autoMessages?: IAutoMessages
  loading?: boolean
}

const MessageCard = (props: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {props.name}
      </div>
      <MessageCardForm autoMessages={props.autoMessages} onSubmit={props.onSubmit} project={props.project} applicationStatusChange={props.applicationStatusChange} prevStatus={props.prevStatus} nextStatus={props.nextStatus}/> 
    </div>
  )
}

export default MessageCard
