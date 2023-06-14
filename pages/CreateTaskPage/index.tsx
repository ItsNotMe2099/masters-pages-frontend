
import Loader from 'components/ui/Loader'
import Modal from 'components/ui/Modal'
import CreateTaskForm from 'components/for_pages/CreateTaskPage/NewForm'
import {IRootState, ITask, ITaskFormData} from 'types'
import {getAuthServerSide} from 'utils/auth'
import styles from './index.module.scss'
import {createTaskComplete, createTaskeReset} from 'components/CreateTaskPage/actions'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchProfileSearchStatRequest,
  resetSearchStat,
  setSearchStatFilter
} from '../../components/ProfileSearch/actions'
import {useEffect, useState} from 'react'
import { useTranslation } from 'next-i18next'
import {useRouter} from 'next/router'
import Layout from 'components/layout/Layout'
import {modalClose} from 'components/Modal/actions'
import {reachGoal} from 'utils/ymetrika'
import {useAppContext} from 'context/state'
import TaskRepository from "data/repositories/TaskRepository";
import TaskNegotiationRepository from "data/repositories/TaskNegotiationRepository";

const CreateTaskPage = (props) => {
  const {t} = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
 const appContext = useAppContext();
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false)
  const [task, setTask] = useState<ITask | null>(null);
  const profile = appContext.profile
  const isMaster = profile.role !== 'client'
  useEffect(() => {
    dispatch(resetSearchStat())
    return () => {
      dispatch(createTaskeReset())
      dispatch(resetSearchStat())
    }
  }, [])

  const handleSubmit = async (data: ITaskFormData) => {
    setLoading(true)
    const { skills, ...submittedValues } = data
    submittedValues.budget = Number(submittedValues.budget)
    submittedValues.ratePerHour = Number(submittedValues.ratePerHour)
    try {

      const res = await TaskRepository.create(submittedValues)
      console.log("SubmitData", data);
      if(data.visibilityType === 'private' && !(data as any)._isDraft){
        await TaskNegotiationRepository.createTaskOffer({taskId: res.id, profileId: data.profileId})
      }
      setTask(res)
      if (res) {
        setIsCompleted(true)
      }

    } catch (error: any) {
      let errorMessage = error.toString()
      // extract the error message from the error object
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      }
    }
    setLoading(false)
    reachGoal('order:create', {role: profile?.role})
  }


  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.required}>* {t('forms.requiredFieldsTip')}</div>
        <CreateTaskForm isMaster={isMaster} onSubmit={handleSubmit}/>
      </div>


      <Modal
        {...props}
        title={t('createTask.successTitle')}
        image={'/img/icons/congratulations.svg'}
        isOpen={isCompleted} onRequestClose={() => {
        dispatch(createTaskeReset())
          dispatch(modalClose())
          if(profile.role === 'client') {
            if(task.visibilityType === 'private'){
              router.push('/orders/drafts')
            }else{
              router.push('/orders/negotiation')
            }

          }else{
            router.push('/orders/negotiation')
          }
      }}>

      </Modal>

      <Modal
        {...props}
        isOpen={loading} onRequestClose={() => {

      }}>
        <Loader/>
      </Modal>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true})
export default CreateTaskPage
