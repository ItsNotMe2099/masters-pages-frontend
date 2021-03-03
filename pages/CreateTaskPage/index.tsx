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
import { createTaskComplete } from 'components/CreateTaskPage/actions';
import { useSelector, useDispatch } from 'react-redux'
import SimpleSlider from 'components/Steps/CreateTaskPage/Slider';
import {
  fetchProfileSearchStatRequest,
  resetSearchStat,
  setSearchStatFilter
} from "../../components/ProfileSearch/actions";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const CreateTaskPage = (props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const isCompleted = useSelector((state: IRootState) => state.createTaskComplete.isCompleted)
  const isLoading = useSelector((state: IRootState) => state.createTaskComplete.loading)
  const statFilter = useSelector((state: IRootState) => state.profileSearch.searchStatFilter);

  useEffect(() => {
    dispatch(resetSearchStat());
    return () => {
      dispatch(resetSearchStat());
    }
  }, [])
  const handleSubmit = (data) => {
  console.log("HandleSubmit", data)
    dispatch(createTaskComplete(data));
  }
  const handleChangeForStat = (key, value) => {
  console.log("handleChangeForStat", key, value);
    statFilter[key] = value;
    dispatch(setSearchStatFilter(statFilter));
    dispatch(fetchProfileSearchStatRequest({
      limit: 1,
      ...statFilter
    }));
  }

  return (
    <>
      <Header {...props}/>
      <div className={styles.steps}>
        <div className={styles.stepsContainer}>
        <SimpleSlider/>
        </div>
      </div>
      <div className={styles.container}>

        <div className={styles.required}>* {t('forms.requiredFieldsTip')}</div>
        <CreateTaskForm onSubmit={handleSubmit} onChangeForStat={handleChangeForStat}/>
        <div className={styles.footer}>
          <Footer/>
        </div>
      </div>


      <Modal
        {...props}
        title={t('createTask.successTitle')}
        image={'img/icons/congratulations.svg'}
        isOpen={isCompleted} onRequestClose={() => {
        window.location.href = '/'
      }}>

      </Modal>

      <Modal
        {...props}
        isOpen={isLoading} onRequestClose={() => {

      }}>
        <Loader/>
      </Modal>
    </>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default CreateTaskPage
