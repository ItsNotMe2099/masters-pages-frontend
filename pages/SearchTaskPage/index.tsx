import { withTranslation } from "react-i18next";
import { withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import SearchTaskForm from "./Form";
import Task from "components/SearchTaskPage/Task";

const SearchTaskPage = (props) => {
  return (
    <>
    <Header {...props}/>
    <div className={styles.filters}>
      <div className={styles.form}>
        <SearchTaskForm/>
      </div>
    </div>
    <div className={styles.container}>
      <Task
      taskTitle='Looking for help'
      taskDesc='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat, lobortis sit amet, scelerisque dignissim aenean enim. Lorem ac nibh cursus sed lacus volutpat lectus. A eleifend in enim fermentum, urna aliquet pellentesque ut. Libero etiam consequat nulla arcu tincidunt arcu.'
      clientName='Jenny Wilson'
      avatar='img/SearchTaskPage/avatars/jenny.png'
      case='15'
      likes='2079'
      comments='321'
      taskTime='10.10.20 13:31'
      taskPrice='10'
      workHours='10'
      verificationIcon
      />
      <Footer/>
    </div>
    </>
  )
}
export default withAuthSync(SearchTaskPage)
