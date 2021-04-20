import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import MenuItem from 'components/layout/Layout/components/MenuItem'
import {useTranslation} from 'react-i18next'
import {default as React, ReactElement} from 'react'
import {IRootState} from 'types'
import Logo from 'components/Logo'
import {LangSelect} from 'components/layout/Header/components/LangSelect'
import ModeSelect from 'components/layout/Header/components/ModeSelect'
import {useRouter} from 'next/router'
import {logout} from 'components/Auth/actions'

interface Props {
  children?: ReactElement[] | ReactElement
}

export default function Layout(props: Props) {
  const {children} = props;
  const  {route: currentRoute} = useRouter();
  const role = useSelector((state: IRootState) => state.profile.role)
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)

  const { t } = useTranslation();
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
    {title: t('menu.profile'), icon: 'profile', link: `/PublicProfile/${profile.id}`},
    {title: t('menu.share'), icon: 'share', link: ''},
    {title: t('menu.invite'), icon: 'invite', link: ''},
    {title: t('menu.order'), icon: 'order', link: '/CreateTaskPage'},
    {title: t('menu.orders'), icon: 'orders', link: '/PersonalArea/orders'},
    {title: t('menu.events'), icon: 'events', link: '/Calendar'},
    {title: t('menu.messages'), icon: 'messages', link: '/Chat'},
    {title: t('menu.findOrders'), icon: 'find-orders', link: '/SearchTaskPage'},
    {title: t('menu.findClients'), icon: 'find-clients', link: '/SearchMasterPage'},
    {title: t('menu.posts'), icon: 'posts', link: ''},
    {title: t('menu.news'), icon: 'news', link: ''},
    {title: t('menu.subscriptions'), icon: 'subscriptions', link: ''},
    {title: t('menu.account'), icon: 'account', link: '/PersonalArea/profile'},
    {title: t('menu.settings'), icon: 'settings', link: '/PersonalArea/settings'},
    {title: t('menu.reports'), icon: 'reports', link: ''},
  ]
  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <div className={`${styles.root}  ${getModeClass()}`}>
    <div className={styles.leftMenu}>
      <div className={styles.logo}>
        <Logo color={'white'}/>
      </div>
      {items.map(item => <MenuItem isActive={item.link && currentRoute.indexOf(`${item.link}`) >= 0} title={item.title} icon={item.icon} link={item.link} mode={role}/>)}
      <MenuItem isActive={false} onClick={handleLogout} title={t('menu.logout')} icon={'logout'} link={'logout'} mode={role}/>
    </div>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
        <div className={styles.hello}>{t('personalArea.profile.hello')} {profile?.firstName}. {t('personalArea.profile.youAreIn')} «{getModeName(profile.role)}».</div>
        <ModeSelect/>
        </div>
        <LangSelect isAuth={false}/>
      </div>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  )
}
