import { changeRole, fetchProfile } from "components/Profile/actions";
import Tabs from "components/ui/Tabs";
import { useEffect, useState } from "react";
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
import TabSettings from "pages/PersonalArea/[mode]/components/TabSettings";
import { IRootState } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { TabSelect } from "components/TabSelect";
import TabSaved from "../components/TabSaved";
import Link from "next/link";
import NotificationBadge from "../../../../components/ui/NotificationBadge";
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
    {name: 'Reviews and rating', key: 'reviews', badge: profile.feedbackNotificationsCount},
    {name: 'Orders', key: 'orders', badge: profile.taskResponseDeclinedNotificationsCount + profile.taskOfferDeclinedNotificationsCount + profile.taskResponseNotificationsCount + profile.taskOfferNotificationsCount},
    {name: 'Messages', key: 'messages',  badge: profile.messageNotificationsCount },
    {name: 'Saved', key: 'saved'},
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
      <div className={styles.desktop}>
        <div className={styles.topBar}>
          <div className={styles.hello}> Hello {profile?.firstName}. You are in «{getModeName(mode)}».</div>
      </div>
      </div>
      <div className={styles.mobile}>
         <div className={styles.topBar}>
         {tab !== 'orders' ?
         <div className={styles.hello}> Hello {profile?.firstName}. You are in «{getModeName(mode)}».</div>
         :
         <><img src="/img/icons/Vector 9.svg" alt=""/><Link href={`/PersonalArea/${mode}/personal`}><a className={styles.back}>back</a></Link><div className={styles.orders}>Orders</div></>}
      </div>
        </div>

        <div className={styles.desktop}>
        <ProfileSection/>
        <Tabs style={'outline'} tabs={tabs} activeTab={tab as string}/>
        </div>
        {tab !== 'orders' && <><div className={styles.mobile}>
          <ProfileSection/>
          <div className={styles.select}><TabSelect tabs={tabs} activeTab={tab as string}/></div>
        </div></>}
        <div className={tab !== 'orders' ? styles.tab : styles.tabOrders}>
          {tab === 'personal' && <TabPersonal {...props}/>}
          {tab === 'portfolio' && <TabPortfolio {...props}/>}
          {tab === 'reviews' && <TabReviews {...props}/>}
          {tab === 'orders' && <TabOrders {...props}/>}
          {tab === 'messages' && <TabMessages {...props}/>}
          {tab === 'saved' && <TabSaved {...props}/>}
          {tab === 'settings' && <TabSettings {...props}/>}
        </div>
        <Footer/>
      </div>

    </>
  )
}

export default TabPage
