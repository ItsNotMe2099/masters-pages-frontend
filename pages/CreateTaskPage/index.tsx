import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Steps from 'components/Steps'
import Button from "components/ui/Button";
import Loader from "components/ui/Loader";
import Modal from "components/ui/Modal";
import CreateTaskForm from "pages/CreateTaskPage/Form";
import { IRootState } from "types";
import {getAuthServerSide} from 'utils/auth'
import styles from './index.module.scss'
import {createTaskComplete, createTaskeReset} from 'components/CreateTaskPage/actions';
import { useSelector, useDispatch } from 'react-redux'
import SimpleSlider from 'components/Steps/CreateTaskPage/Slider';
import {
  fetchProfileSearchStatRequest,
  resetSearchStat,
  setSearchStatFilter
} from "../../components/ProfileSearch/actions";
import {useEffect, useState} from "react";
import {useTranslation} from "i18n";
import {useRouter} from 'next/router'
import Layout from 'components/layout/Layout'
import {modalClose} from 'components/Modal/actions'

const CreateTaskPage = (props) => {
  const {t} = useTranslation()
  const router = useRouter();
  const dispatch = useDispatch()
  const isCompleted = useSelector((state: IRootState) => state.createTaskComplete.isCompleted)
  const isLoading = useSelector((state: IRootState) => state.createTaskComplete.loading)
  const statFilter = useSelector((state: IRootState) => state.profileSearch.searchStatFilter);
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  useEffect(() => {
    dispatch(resetSearchStat());
    return () => {
      dispatch(createTaskeReset());
      dispatch(resetSearchStat());
    }
  }, [])
  const handleSubmit = (data) => {
    dispatch(createTaskComplete(data));
  }
  const handleChangeForStat = (key, value) => {
    statFilter[key] = value;
    dispatch(setSearchStatFilter(statFilter));
    dispatch(fetchProfileSearchStatRequest({
      limit: 1,
      ...statFilter
    }));
  }
  return (
    <Layout>
      <div className={styles.steps}>
        <div className={styles.stepsContainer}>
        <SimpleSlider/>
        </div>
      </div>
      <div className={styles.container}>

        <div className={styles.required}>* {t('forms.requiredFieldsTip')}</div>
        <CreateTaskForm onSubmit={handleSubmit} onChangeForStat={handleChangeForStat} initialValues={{
          countryCode: profile?.geoname?.country,
          geonameid: profile?.geonameid,
          visibilityType: 'public'
        }}/>

      </div>


      <Modal
        {...props}
        title={t('createTask.successTitle')}
        image={'/img/icons/congratulations.svg'}
        isOpen={isCompleted} onRequestClose={() => {
        dispatch(createTaskeReset());
          dispatch(modalClose());
        router.push('/orders');
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
export const getServerSideProps = getAuthServerSide({redirect: true});
export default CreateTaskPage
