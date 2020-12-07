import Task from "components/Task";
import { useRouter } from "next/router";
import Tabs from "pages/PersonalArea/[mode]/components/TabOrders/components/Tabs";
import * as React from "react";
import styles from './index.module.scss'
interface Props {

}
const TabOrders = (props: Props) => {
  const router = useRouter()
  const { mode, tab, tabSubPage } = router.query

  const tabs = [
    {name: 'Pending', key: 'pending'},
    {name: 'Negotiation', key: 'Negotiation'},
    {name: 'In progress', key: 'in-progress'},
    {name: 'Closed', key: 'closed'},
  ].map(item => {
    return{
      ...item,
      link: `/PersonalArea/${mode}/${tab}/${item.key}`
    }})
  return (
    <div className={styles.root}>
      <Tabs tabs={tabs} activeTab={tabSubPage as string}/>
      <div className={styles.tasks}>
        <Task
          className={styles.taskItem}
          taskTitle='Looking for help'
          taskDesc='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat, lobortis sit amet, scelerisque dignissim aenean enim. Lorem ac nibh cursus sed lacus volutpat lectus. A eleifend in enim fermentum, urna aliquet pellentesque ut. Libero etiam consequat nulla arcu tincidunt arcu.'
          clientName='Jenny Wilson'
          avatar='/img/SearchTaskPage/avatars/jenny.png'
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
          avatar='/img/SearchTaskPage/avatars/jenny.png'
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
          avatar='/img/SearchTaskPage/avatars/jenny.png'
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
  )
}

export default TabOrders
