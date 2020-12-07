import { useRouter } from "next/router";
import Tabs from "pages/PersonalArea/[mode]/components/TabOrders/components/Tabs";
import * as React from "react";
import styles from './index.module.scss'
interface Props {

}
const TabOrders = (props: Props) => {
  const router = useRouter()
  const { mode, tab, status } = router.query

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
      Tab Orders
      <Tabs tabs={tabs} activeTab={status as string}/>
    </div>
  )
}

export default TabOrders
