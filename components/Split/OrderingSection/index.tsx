import Link from 'next/link'
import { useEffect } from 'react'
import styles from './index.module.scss'
import Task from './Task'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTaskSearchListWithLimit } from './Task/actions'
import { IRootState } from 'types'
import Loader from 'components/ui/Loader'
import {useTranslation, Trans} from "i18n";

interface Props {}

export default function OrderingSection(props: Props) {


  const dispatch = useDispatch()
  const tasks = useSelector((state: IRootState) => state.taskSearchWithLimit.task)
  const {t} = useTranslation('common')
  useEffect(() => {
    dispatch(fetchTaskSearchListWithLimit(4))
  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {t('split.peopleOrdering')}
      </div>
      {!tasks ?

      <Loader/>
      :

      tasks.map(task =>
        <Link href="/">
        <a>
          <Task task={task}
          taskImage='/img/icons/design.svg'
          color='#A4E4B6'
          />
        </a>
      </Link>
        )}
    </div>
  )
}
