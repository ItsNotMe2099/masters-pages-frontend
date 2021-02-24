import { changeRole, fetchProfile } from "components/Profile/actions";
import Tabs from "components/ui/Tabs";
import { useEffect, useState } from "react";
import * as React from "react";
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Button from "components/ui/Button";
import { Router, useRouter } from "next/router";
import ProfileSection from "pages/PublicProfile/components/ProfileSection";
import TabPortfolio from "pages/PublicProfile/components/TabPortfolio";
import TabReviews from "pages/PublicProfile/components/TabReviews";
import styles from './index.module.scss'
import { TabSelect } from "components/TabSelect";
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from "types";
import { fetchProfileById } from "components/PublicProfile/actions";
import Modals from "../../../../components/layout/Modals";

const TabPage = (props) => {
  const router = useRouter()
  const { mySuperId } = router.query
  const dispatch = useDispatch()
  const profile = props.profile
  const tab = router.query.tab ? router.query.tab : (profile.role !== 'client' ? 'portfolio' : 'reviews');
  React.useEffect(() => {
    dispatch(fetchProfileById(router.query.mySuperId))
  },[])

  console.log("Profile1", profile)
  const tabs = [
    ...(profile.role !== 'client' ? [{name: 'Portfolio', key: 'portfolio'}] : []),
    {name: 'Reviews and rating', key: 'reviews'}
  ].map(item => {
    return{
      ...item,
      link: `/PublicProfile/${mySuperId}/${item.key}`
    }})

  return (
    <>
      <Header {...props}/>
      {profile && <div className={styles.container}>
        <div className={styles.topBar}>
          <div className={styles.hello}>{profile.firstName} {profile.lastName}</div>


        </div>
        <ProfileSection profile={props.profile} publicProfile={profile}/>
        <div className={styles.desktop}>
        <Tabs style={'outline'} tabs={tabs} activeTab={!tab ? 'portfolio' : tab as string}/>
        </div>
        <div className={styles.mobile}><TabSelect tabs={tabs} activeTab={tab as string}/></div>
        <div className={styles.tab}>
          {!tab || tab === 'portfolio' && <TabPortfolio {...props}/>}
          {tab === 'reviews' && <TabReviews {...props}/>}
        </div>
        <Modals/>
        <Footer/>
      </div>}

    </>
  )
};

export default TabPage
