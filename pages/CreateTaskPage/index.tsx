
import Loader from 'components/ui/Loader'
import Modal from 'components/ui/Modal'
import CreateTaskForm from 'components/for_pages/CreateTaskPage/Form'
import { IRootState } from 'types'
import {getAuthServerSide} from 'utils/auth'
import styles from './index.module.scss'
import {createTaskComplete, createTaskeReset} from 'components/CreateTaskPage/actions'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchProfileSearchStatRequest,
  resetSearchStat,
  setSearchStatFilter
} from '../../components/ProfileSearch/actions'
import {useEffect} from 'react'
import { useTranslation } from 'next-i18next'
import {useRouter} from 'next/router'
import Layout from 'components/layout/Layout'
import {modalClose} from 'components/Modal/actions'
import {reachGoal} from 'utils/ymetrika'
import {useAppContext} from 'context/state'

const CreateTaskPage = (props) => {
  const {t} = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const isCompleted = useSelector((state: IRootState) => state.createTaskComplete.isCompleted)
  const isLoading = useSelector((state: IRootState) => state.createTaskComplete.loading)
  const statFilter = useSelector((state: IRootState) => state.profileSearch.searchStatFilter)
  const appContext = useAppContext();
  const profile = appContext.profile
  const isMaster = profile.role !== 'client'
  useEffect(() => {
    dispatch(resetSearchStat())
    return () => {
      dispatch(createTaskeReset())
      dispatch(resetSearchStat())
    }
  }, [])
  const handleSubmit = (data) => {
    dispatch(createTaskComplete(data))
    reachGoal('order:create', {role: profile?.role})
  }
  const handleChangeForStat = (key, value) => {
    statFilter[key] = value
    dispatch(setSearchStatFilter(statFilter))
    dispatch(fetchProfileSearchStatRequest({
      limit: 1,
      ...statFilter
    }))
  }
  return (
    <Layout>
      {/*<div className={styles.steps}>
        <div className={styles.stepsContainer}>
        <SimpleSlider/>
        </div>
      </div>*/}
      <div className={styles.container}>

        <div className={styles.required}>* {t('forms.requiredFieldsTip')}</div>
        <CreateTaskForm onSubmit={handleSubmit}    isMaster={isMaster} onChangeForStat={handleChangeForStat} initialValues={{
          countryCode: profile?.geoname?.country,
          geonameid: profile?.geonameid,
          visibilityType: isMaster ? 'private' : 'public',
          masterRole: isMaster ? profile.role : null,
        }}/>

      </div>


      <Modal
        {...props}
        title={t('createTask.successTitle')}
        image={'/img/icons/congratulations.svg'}
        isOpen={isCompleted} onRequestClose={() => {
        dispatch(createTaskeReset())
          dispatch(modalClose())
          if(profile.role === 'client') {
            router.push('/orders/draft')
          }else{
            router.push('/orders/offers')
          }
      }}>

      </Modal>

      <Modal
        {...props}
        isOpen={isLoading} onRequestClose={() => {

      }}>
        <Loader/>
      </Modal>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true})
export default CreateTaskPage
