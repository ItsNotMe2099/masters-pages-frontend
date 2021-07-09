import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import MenuItem from 'components/layout/Layout/components/MenuItem'
import {useTranslation} from 'react-i18next'
import {default as React, ReactElement, useEffect, useRef, useState} from 'react'
import {IRootState} from 'types'
import Logo from 'components/Logo'
import {LangSelect} from 'components/layout/Header/components/LangSelect'
import cx from 'classnames';
import {useRouter} from 'next/router'
import {logout} from 'components/Auth/actions'
import ModeSelect from 'components/layout/Layout/components/ModeSelect'
import {fetchProfile} from 'components/Profile/actions'
import NotificationSelect from 'components/layout/Layout/components/NotificationSelect'
import LogoSvg from 'components/svg/Logo'
import cookie from "js-cookie";

interface Props {
  children?: ReactElement[] | ReactElement
}

export default function LayoutAuthorized(props: Props) {
  const {children} = props;
  const {route: currentRoute} = useRouter();
  const role = useSelector((state: IRootState) => state.profile.role)
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const intervalRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
     dispatch(fetchProfile(profile.role));
    }, 10000)
    setCollapsed(!!cookie.get("menu-collapsed"))
    return () => clearInterval(intervalRef.current);
  }, []);

  const {t} = useTranslation();
  const dispatch = useDispatch()

  const getModeClass = () => {
    switch (role) {
      case 'master':
        return styles.modeMaster;
      case 'volunteer':
        return styles.modeVolunteer;
      case 'client':
      default:
        return styles.modeClient;
    }
  }
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

  const items = [
    {title: t('menu.profile'), icon: 'profile', link: `/id${profile?.id}`},
    {title: t('menu.share'), icon: 'share', link: '/Share'},
    {title: t('menu.invite'), icon: 'invite', link: '/Invite'},
    {title: t('menu.findOrders'), icon: 'find-orders', link: '/SearchTaskPage', isSeparator: true},
    {title: t('menu.orders'), icon: 'orders', link: '/orders', badge: profile.notificationTaskResponseDeclinedCount + profile.notificationTaskOfferDeclinedCount + profile.notificationTaskResponseCount + profile.notificationTaskOfferCount},
    {title: t('menu.events'), icon: 'events', link: '/Calendar', badge: profile.notificationEventCount},
    {title: t('menu.reports'), icon: 'reports', link: '/Report'},

    ...(profile.role === 'client' ? [
      {title: t('menu.findMaster'), icon: 'find-clients', link: '/SearchMasterPage', isSeparator: true},
      {title: t('menu.findVolunteer'), icon: 'find-clients', link: '/SearchVolunteerPage'},
    ] : [
      {title: t('menu.findClients'), icon: 'find-clients', link: '/SearchClientPage', isSeparator: true}
    ]),

    {title: t('menu.messages'), icon: 'messages', link: '/Chat', badge: profile.notificationMessageCount},
    {title: t('menu.contacts'), icon: 'subscriptions', link: '/Contacts'},
    {title: t('menu.posts'), icon: 'posts', link: '/Posts', isSeparator: true},
    {title: t('menu.news'), icon: 'news', link: '/News', badge: profile.notificationNewsCount},

    {title: t('menu.settings'), icon: 'settings', link: '/me/settings', isSeparator: true},
  ]
  const handleLogout = () => {
    dispatch(logout());
  }
  const handleCollapse = () => {
    if(!collapsed) {

      cookie.set("menu-collapsed", '1', {expires: 60 * 60* 24 * 365});
    }else{
      cookie.remove("menu-collapsed");
    }
    setCollapsed(!collapsed);
  }
  return (
    <div className={cx(styles.root, getModeClass(), {[styles.collapsed]: collapsed})}>
      <div className={styles.leftMenu}>
        <div className={styles.logo}>
          {collapsed && <LogoSvg className={styles.logoCollapsed} color={'white'}/>}
          {!collapsed && <Logo color={'white'}/>}
          <div className={styles.collapseMenu} onClick={handleCollapse}/>
        </div>
        {items.map(item => <>{item.isSeparator && <div className={styles.menuSeparator}/>}<MenuItem
          isActive={item.link && currentRoute.indexOf(`${item.link}`) >= 0} title={item.title} icon={item.icon}
          link={item.link} badge={item.badge} mode={role}/></>)}
        <MenuItem isActive={false} onClick={handleLogout} title={t('menu.logout')} icon={'logout'} link={'logout'}
                  mode={role}/>
      </div>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div
            className={styles.hello}>{t('personalArea.profile.hello')} {profile?.firstName}. {t('personalArea.profile.youAreIn')}
          </div>
          <ModeSelect/>
        </div>
        <NotificationSelect/>
        <LangSelect isAuth={false}/>
      </div>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  )
}
