import * as React from 'react'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import MessageCardForm from './Form'
import { IProject } from 'data/intefaces/IProject'
import { IAutoMessages } from 'data/intefaces/IAutoMessages'
import classNames from 'classnames'

interface Props {
  name?: string
  project?: IProject
  prevStatus: string
  nextStatus: string
  applicationStatusChange: boolean
  isEvent?: boolean
  onSubmit?: (data) => void
  autoMessages?: IAutoMessages
  loading?: boolean
  className?: string
  desc: boolean
}

const MessageCard = (props: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();

  return (
    <div className={classNames(styles.root, props.className)}>
      {props.name && <div className={styles.title}>
        {props.name}
      </div>}
      <MessageCardForm desc={props.desc} autoMessages={props.autoMessages} isEvent={props.isEvent} onSubmit={props.onSubmit} project={props.project} applicationStatusChange={props.applicationStatusChange} prevStatus={props.prevStatus} nextStatus={props.nextStatus}/> 
    </div>
  )
}

export default MessageCard
