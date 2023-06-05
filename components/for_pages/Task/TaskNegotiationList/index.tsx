import TaskActionButton from 'components/Task/components/ActionButton'
import { format } from 'date-fns'
import styles from 'components/for_pages/Task/description/index.module.scss'
import { useDispatch } from 'react-redux'
import {ITask, ITaskNegotiation} from 'types'
import * as React from 'react'
import { useTranslation } from 'next-i18next'
import {useState} from "react";
import Task from "components/Task";


interface Props {
  task: ITask
}

const TaskNegotiationList = (props: Props) => {

  const [items, setItems] = useState<ITaskNegotiation[]>([]);
  return (
   <div className={styles.root}>

   </div>
  )
}

export default TaskNegotiationList
