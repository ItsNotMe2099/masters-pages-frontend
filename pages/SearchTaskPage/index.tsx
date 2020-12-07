import Map from "components/Map";
import Button from "components/ui/Button";
import { DropDown } from "components/ui/DropDown";
import Input from "components/ui/Inputs/Input";
import { withTranslation } from "react-i18next";
import { withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import SearchTaskForm from "./Form";
import Task from "components/Task";

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
      <div className={styles.tasksContainer}>
      <div className={styles.sidebar}>
        <div className={styles.map}>
          <Map/>
        </div>
        <Button className={styles.showOnTheMap} fullWidth={true} white={true} largeFont={true} bold={true}  borderRed={true} size={'16px 20px'}>Show on the map</Button>
        <div className={styles.filter}>
          <div className={styles.filterLabel}>Key words</div>
          <Input input={{value: null, onChange: () => {}}}/>
        </div>
      </div>
      <div className={styles.tasks}>
        <div className={styles.tasksTobBar}>
          <div className={styles.tasksAmount}>Tasks: <span>1212</span></div>
          <div className={styles.tasksSort}>
            <span>Sort by:</span>
            <DropDown options={[{value: 'newFirst', label: 'New First'},
              {value: 'newFirst', label: 'New First'},
              {value: 'highPrice', label: 'Highest price'},
              {value: 'lowPrice', label: 'Lowest price'}]}
                      item={(item) => <div>{item?.label}</div>}
            />
          </div>
        </div>
        <Task
          className={styles.taskItem}
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
        <Task
          className={styles.taskItem}
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
        <Task
          className={styles.taskItem}
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
      </div>
      </div>
      <Footer/>
    </div>
    </>
  )
}
export default withAuthSync(SearchTaskPage)
