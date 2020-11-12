import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Steps from 'components/Steps'
import Button from "components/ui/Button";
import Loader from "components/ui/Loader";
import Modal from "components/ui/Modal";
import CreateTaskForm from "pages/CreateTaskPage/Form";
import { IRootState } from "types";
import { withAuthSync } from 'utils/auth'
import styles from './index.module.scss'
import { createTaskComplete } from 'components/CreateTaskPage/actions';
import { useSelector, useDispatch } from 'react-redux'
import SimpleSlider from 'components/Steps/CreateTaskPage/Slider';

const CreateTaskPage = (props) => {
  const dispatch = useDispatch()
  const isCompleted = useSelector((state: IRootState) => state.createTaskComplete.isCompleted)
  const isLoading = useSelector((state: IRootState) => state.createTaskComplete.loading)
  const handleSubmit = (data) => {
  console.log("HandleSubmit", data)
    dispatch(createTaskComplete(data));
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

        <div className={styles.required}>* required field</div>
        <CreateTaskForm onSubmit={handleSubmit}/>
        <div className={styles.footer}>
          <Footer/>
        </div>
      </div>


      <Modal
        {...props}
        title={'Your task created'}
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

export default withAuthSync(CreateTaskPage)
