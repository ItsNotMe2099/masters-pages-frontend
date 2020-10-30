import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Steps from 'components/Steps'
import CreateTaskForm from "pages/CreateTaskPage/Form";
import { withAuthSync } from 'utils/auth'
import styles from './index.module.scss'

const CreateTaskPage = (props) => {
  return (
    <>
      <Header {...props}/>
      <div className={styles.container}>
        Hello Lina
        <Footer/>
      </div>

    </>
  )
}

export default withAuthSync(CreateTaskPage)
