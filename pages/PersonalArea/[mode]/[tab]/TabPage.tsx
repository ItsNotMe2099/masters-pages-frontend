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
import {withTranslation} from "react-i18next";
const TabPage = (props) => {
  const {t} = props
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
    {name: t('personalArea.menu.profile'), key: 'personal'},
    ...(mode !== 'client' ? [{name: t('personalArea.menu.portfolio'), key: 'portfolio'}] : []),
    {name: t('personalArea.menu.reviews'), key: 'reviews', badge: profile.feedbackNotificationsCount},
    {name: t('personalArea.menu.orders'), key: 'orders', badge: profile.taskResponseDeclinedNotificationsCount + profile.taskOfferDeclinedNotificationsCount + profile.taskResponseNotificationsCount + profile.taskOfferNotificationsCount},
    {name: t('personalArea.menu.messages'), key: 'messages',  badge: profile.messageNotificationsCount },
    {name: t('personalArea.menu.saved'), key: 'saved'},
    {name: t('personalArea.menu.settings'), key: 'settings'},
  ].map(item => {
    return{
      ...item,
      link: `/PersonalArea/${mode}/${item.key}`
    }})

  const getModeName = (mode) => {
    switch (mode) {
      case 'master':
        return t('personalArea.profile.modeMaster')
      case 'client':
        return t('personalArea.profile.modeClient')
      case 'volunteer':
        return t('personalArea.profile.modeVolunteer')
    }
  }

  return (
    <>
      <Header {...props}/>
      <div className={styles.container}>
      <div className={styles.desktop}>
        <div className={styles.topBar}>
          <div className={styles.hello}> {t('personalArea.profile.hello')} {profile?.firstName}. {t('personalArea.profile.youAreIn')} «{getModeName(mode)}».</div>
      </div>
      </div>
      <div className={styles.mobile}>
         <div className={styles.topBar}>
         {tab !== 'orders' ?
         <div className={styles.hello}>{t('personalArea.profile.hello')} {profile?.firstName}. {t('personalArea.profile.youAreIn')} «{getModeName(mode)}».</div>
         :
         <><img src="/img/icons/Vector 9.svg" alt=""/><Link href={`/PersonalArea/${mode}/personal`}><a className={styles.back}>{t('back')}</a></Link><div className={styles.orders}>{t('personalArea.profile.mobileOrders')}</div></>}
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
export default withTranslation('common')(TabPage)
