import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Steps from 'components/Steps'
import { withAuthSync } from 'utils/auth'
import styles from './index.module.scss'
import { createTaskComplete } from 'components/CreateTaskPage/actions';
import { useDispatch } from 'react-redux'
import MasterForm from './Form'

const MasterProfile = (props) => {
  const dispatch = useDispatch()
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
          text='01. Complete profile'
          image_2='img/icons/form3.svg'
          text_2='02. Find a task'
          image_3='img/icons/file.svg'
          text_3='03. Do task and earn money'
        />
        </div>
      </div>
      <div className={styles.container}>

        <div className={styles.required}>* required field</div>
        <MasterForm onSubmit={handleSubmit}/>
        <div className={styles.footer}>
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default withAuthSync(MasterProfile)
