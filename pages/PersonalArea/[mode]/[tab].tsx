import { changeRole, fetchProfile } from "components/Profile/actions";
import { useEffect } from "react";
import * as React from "react";
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Button from "components/ui/Button";
import { useRouter } from "next/router";
import ProfileSection from "pages/PersonalArea/[mode]/components/ProfileSection";
import TabMessages from "pages/PersonalArea/[mode]/components/TabMessages";
import TabOrders from "pages/PersonalArea/[mode]/components/TabOrders";
import TabPersonal from "pages/PersonalArea/[mode]/components/TabPersonal";
import TabPortfolio from "pages/PersonalArea/[mode]/components/TabPortfolio";
import TabReviews from "pages/PersonalArea/[mode]/components/TabReviews";
import Tabs from "pages/PersonalArea/[mode]/components/Tabs";
import TabSettings from "pages/PersonalArea/[mode]/components/TabSettings";
import { IRootState } from "types";
import { withAuthSync, withRestrictAuthSync } from 'utils/auth'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
const PersonalAreaPage = (props) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const { mode, tab } = router.query
  console.log("mode", mode, tab);

  const tabs = [
    {name: 'Personal information', key: 'personal'},
    {name: 'My portfolio', key: 'portfolio'},
    {name: 'Reviews and rating', key: 'reviews'},
    {name: 'Orders', key: 'orders'},
    {name: 'Messages', key: 'messages'},
    {name: 'Settings', key: 'settings'},
  ].map(item => {
    return{
    ...item,
      link: `/PersonalArea/${mode}/${item.key}`
  }})


  return (
    <>
      <Header {...props}/>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <div className={styles.hello}> Hello {profile?.firstName}</div>

        <div className={styles.buttonList}>
          <Button className={styles.button} red={true} mediumFont={true} onClick={() => dispatch(changeRole('master'))} size={'12px 0px'}>Master</Button>
          <Button className={styles.button} green={true} size={'12px 0px'} onClick={() => dispatch(changeRole('client'))} >Client</Button>
          <Button  className={styles.button} blue={true} size={'12px 0px'} onClick={() => dispatch(changeRole('volunteer'))} >Volunteer</Button>
        </div>
        </div>
        <ProfileSection/>
        <Tabs tabs={tabs} activeTab={tab as string}/>
        <div className={styles.tab}>
          {tab === 'personal' && <TabPersonal/>}
          {tab === 'portfolio' && <TabPortfolio/>}
          {tab === 'reviews' && <TabReviews/>}
          {tab === 'orders' && <TabOrders/>}
          {tab === 'messages' && <TabMessages/>}
          {tab === 'settings' && <TabSettings/>}
        </div>
        <Footer/>
      </div>

    </>
  )
}

export default withRestrictAuthSync(PersonalAreaPage)
