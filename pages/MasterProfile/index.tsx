import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Steps from 'components/Steps'
import { withAuthSync } from 'utils/auth'
import styles from './index.module.scss'
import { createTaskComplete } from 'components/CreateTaskPage/actions';
import { useDispatch } from 'react-redux'
import MasterForm from './Form'
import SimpleSlider from 'components/Steps/MasterProfile/Slider'

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
        <SimpleSlider/>
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
