import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Steps from 'components/Steps'
import Button from "components/ui/Button";
import Loader from "components/ui/Loader";
import Modal from "components/ui/Modal";
import CreateTaskForm from "pages/CreateTaskPage/Form";
import ModalSuccess from "pages/CreateTaskPage/ui/ModalSuccess";
import { IRootState } from "types";
import { withAuthSync } from 'utils/auth'
import styles from './index.module.scss'
import { createTaskComplete } from 'components/CreateTaskPage/actions';
import { useSelector, useDispatch } from 'react-redux'

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
        <Steps
          image='img/icons/form1.svg'
          text='01. Fill up task request'
          image_2='img/icons/form3.svg'
          text_2='02. Get offers'
          image_3='img/icons/chat2.svg'
          text_3='03. Choose a master'
        />
        </div>
      </div>
      <div className={styles.container}>

        <div className={styles.required}>* required field</div>
        <CreateTaskForm onSubmit={handleSubmit}/>
        <Footer/>
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
