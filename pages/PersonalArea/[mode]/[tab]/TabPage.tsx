import { changeRole, fetchProfile } from "components/Profile/actions";
import { useEffect } from "react";
import * as React from "react";
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Button from "components/ui/Button";
import { Router, useRouter } from "next/router";
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
const TabPage = (props) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const role = useSelector((state: IRootState) => state.profile.role)
  const { mode, tab } = router.query

  useEffect(() => {
    if(role && mode && role != mode){
      router.push('/PersonalArea')
    }
  }, [mode, role])
  const tabs = [
    {name: 'Personal information', key: 'personal'},
    ...(mode !== 'client' ? [{name: 'My portfolio', key: 'portfolio'}] : []),
    {name: 'Reviews and rating', key: 'reviews'},
    {name: 'Orders', key: 'orders'},
    {name: 'Messages', key: 'messages'},
    {name: 'Settings', key: 'settings'},
  ].map(item => {
    return{
      ...item,
      link: `/PersonalArea/${mode}/${item.key}`
    }})

  const getModeName = (mode) => {
    switch (mode) {
      case 'master':
        return 'Master mode'
      case 'client':
        return 'Client mode'
      case 'volunteer':
        return 'Volunteer mode'
    }
  }

  return (
    <>
      <Header {...props}/>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <div className={styles.hello}> Hello {profile?.firstName}. You are in «{getModeName(mode)}».</div>


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

export default TabPage
