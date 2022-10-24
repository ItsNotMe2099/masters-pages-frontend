import * as React from 'react'
import styles from './index.module.scss'
import ProjectTabItem from 'components/for_pages/Project/ProjectModal/ProjectTabs/Tab'
import cx from 'classnames'
import { useAppContext } from 'context/state'
import { ProfileRole } from 'data/intefaces/IProfile'
import {IApplication} from "data/intefaces/IApplication";

import {Field, Form, FormikProvider, useFormik} from 'formik'
import MessageField from "components/fields/MessageField";
import {useEffect, useRef, useState} from "react";
import {formatDate} from "utils/formatters";
import {format} from "date-fns";
import CloseIcon from "components/svg/CloseIcon";
import {ApplicationWrapper, useApplicationContext} from "context/application_state";

interface TabOption {
  name: string,
  key: string,
  icon: string
  badge?: number
}
interface Props {
  application: IApplication
}
const ProjectApplicationNoteInner = (props: Props) => {
  const applicationContext = useApplicationContext()
   const notesRef = useRef<HTMLDivElement>()
   const [expanded, setExpanded] = useState(applicationContext.application?.notes?.length > 0)
   const [notes, setNotes] = useState(applicationContext.application?.notes ?? []);
  console.log("notes11", applicationContext.application.id, notes)
   useEffect(() => {
     if( notesRef.current) {
       notesRef.current.scrollTop = notesRef.current.scrollHeight
     }
   }, [])
  useEffect(() => {
    setNotes(props.application?.notes)
  }, [props.application?.id])
  const handleSubmit = (data) => {
    console.log("handleSubmit", data)
    setNotes([...notes, {note: data.message, createdAt: (new Date()).toISOString()}])
    notesRef.current?.scroll({
      top:  notesRef.current.scrollHeight,
      behavior: 'smooth',
    })
    applicationContext.update({notes: [...notes, {note: data.message, createdAt: (new Date()).toISOString()}]})
    formik.resetForm({
      values: {
        message: '',
      },
    })
  }
   const formik = useFormik({
     initialValues: {message: null},
     onSubmit: handleSubmit
   })
   if(!expanded){
     return <div className={styles.collapsed} onClick={() => setExpanded(true)}>
       <img src='/img/projects/account-details.svg' alt=''/>
     </div>
   }
  return (
    <div className={cx(styles.root)}>
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Notes about this volunteer</div>
          <div className={styles.desc}>Volunteer doesnt see these notes!</div>
        </div>
        <div className={styles.close} onClick={() => setExpanded(false)}>
          <CloseIcon className={styles.closeIcon}/>
        </div>
      </div>
      <div className={styles.notes} ref={notesRef}>
        {notes.map(i => <div className={styles.note}>{i.note}{i.createdAt && <div className={styles.time}>{format(new Date(i.createdAt), 'MM.dd.yyy HH:mm')}</div>}</div>)}
      </div>
      <div className={styles.message}>
        <FormikProvider value={formik}>
          <Form>
          <MessageField name={'message'} onSubmit={() => formik.submitForm()}/>
          </Form>
        </FormikProvider>
      </div>
      </div>
  )
}

export default function ProjectApplicationNote(props: Props){
  return ( <ApplicationWrapper application={props.application} applicationId={props.application.id}>
    <ProjectApplicationNoteInner {...props}/>
  </ApplicationWrapper>)

}
