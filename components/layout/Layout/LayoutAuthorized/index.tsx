import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import MenuItem from 'components/layout/Layout/components/MenuItem'
import { useTranslation } from 'next-i18next'
import { default as React, ReactElement, useEffect, useRef, useState } from 'react'
import Logo from 'components/Logo'
import cx from 'classnames'
import { useRouter } from 'next/router'
import ModeSelect from 'components/layout/Layout/components/ModeSelect'
import NotificationSelect from 'components/layout/Layout/components/NotificationSelect'
import LogoSvg from 'components/svg/Logo'
import cookie from 'js-cookie'
import { getProfileRoleByRoute } from 'utils/profileRole'
import Header from '../LayoutAuthorized/mobile/Header'
import LangSelect from 'components/LangSelect'
import { ProfileRole } from 'data/intefaces/IProfile'
import { IUser } from 'data/intefaces/IUser'
import { useAppContext } from 'context/state'
import { useAuthContext } from 'context/auth_state'
import classNames from 'classnames'
import Routes from "pages/routes";

interface Props {
  children?: ReactElement[] | ReactElement,
  showLeftMenu?: boolean
  isCurrentProfileOpened?: boolean
  user?: IUser
  hideMenu?: boolean

}

export default function LayoutAuthorized(props: Props) {
  const { children, showLeftMenu, isCurrentProfileOpened } = props
  const { route: currentRoute } = useRouter()
  const appContext = useAppContext()
  const authContext = useAuthContext();
  const roleCurrent = appContext.role
  const role = getProfileRoleByRoute(currentRoute) || roleCurrent
  const profile = appContext.profile
  const intervalRef = useRef(null)
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    setCollapsed(!!cookie.get('menu-collapsed'))
  }, [])
  /* useInterval(() => {
     dispatch(fetchProfile(profile.role));
   }, 10000)*/

  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  const getModeClass = () => {
    switch (role) {
      case ProfileRole.Master:
        return styles.modeMaster
      case ProfileRole.Volunteer:
        return styles.modeVolunteer
      case ProfileRole.Corporate:
        return styles.modeCorporate
      case ProfileRole.Client:
      default:
        return styles.modeClient
    }
  }

  const profileLink = `${Routes.profile(profile)}`
  const items = role === ProfileRole.Corporate ? [
    { title: t('menu.profile'), icon: 'profile', link: profileLink },
    { title: t('menu.posts'), icon: 'posts', link: '/Posts' },
    { title: t('menu.news'), icon: 'news', link: '/News', badge: profile.notificationNewsCount },
    { title: t('menu.contacts'), icon: 'subscriptions', link: '/Contacts' },
    //{title: t('menu.messages'), icon: 'messages', link: '/Chat', badge: profile.notificationMessageCount},
    {
      title: t('menu.volunteerProjects'), icon: 'orders', link: '/projects', isSeparator: true, badge:
        profile.notificationsForIntakeProjectsCount +
        profile.notificationsForPausedProjectsCount +
        profile.notificationsForExecutionProjectsCount +
        profile.notificationsForCompletedProjectsCount +
        profile.notificationsForCanceledProjectsCount
    },
    { title: t('menu.findVolunteer'), icon: 'find-clients', link: '/SearchVolunteerPage', isSeparator: true },
    //{title: t('menu.events'), icon: 'events', link: '/Calendar', badge: profile.notificationEventCount},
    //{title: t('menu.reports'), icon: 'reports', link: '/Report'},

    { title: t('menu.settings'), icon: 'settings', link: '/me/settings', isSeparator: true },
  ] : [
    { title: t('menu.profile'), icon: 'profile', link: profileLink },
    { title: t('menu.share'), icon: 'share', link: '/Share' },
    //{title: t('menu.invite'), icon: 'invite', link: '/Invite'},
    ...(role === ProfileRole.Master ? [
      { title: t('menu.invite'), icon: 'invite', link: '/Invite' },
      { title: t('menu.findOrders'), icon: 'find-orders', link: '/SearchTaskPage', isSeparator: true },
      { title: t('menu.orders'), icon: 'orders', link: '/orders', isSeparator: profile.role === 'client', badge: profile.notificationTaskResponseDeclinedCount + profile.notificationTaskOfferDeclinedCount + profile.notificationTaskResponseCount + profile.notificationTaskOfferCount },
    ] : []),
    ...(role === ProfileRole.Client ?
      [
        { title: t('menu.invite'), icon: 'invite', link: '/Invite' },
        { title: t('menu.orders'), icon: 'orders', link: '/orders', isSeparator: profile.role === 'client', badge: profile.notificationTaskResponseDeclinedCount + profile.notificationTaskOfferDeclinedCount + profile.notificationTaskResponseCount + profile.notificationTaskOfferCount },
      ] : []),
    ...(role === ProfileRole.Volunteer ? [
      {
        title: t('menu.projects'), icon: 'projects', link: '/projects', isSeparator: true, badge:

          profile.notificationApplicationInvitedCount +
          profile.notificationApplicationCompletedCount +
          profile.notificationApplicationExecutionCount +
          profile.notificationApplicationRejectedByCompanyCount +
          profile.notificationProjectChatMessagesCount
      },
      { title: t('menu.findProjects'), icon: 'find-projects', link: '/project-search', isSeparator: false },
      { title: t('menu.findCompanies'), icon: 'find-clients', link: '/FindCompanies', isSeparator: false },
    ] : []),
    //{title: t('menu.events'), icon: 'events', link: '/Calendar', badge: profile.notificationEventCount},
    //{title: t('menu.reports'), icon: 'reports', link: '/Report'},

    ...(role === ProfileRole.Client ? [
      { title: t('menu.findMaster'), icon: 'find-clients', link: '/SearchMasterPage', isSeparator: true },
      { title: t('menu.messages'), icon: 'messages', link: '/Chat', badge: profile.notificationMessageCount },
      { title: t('menu.events'), icon: 'events', link: '/Calendar', badge: profile.notificationEventCount },
    ] : []),
    ...(role === ProfileRole.Master ? [
      { title: t('menu.findClients'), icon: 'find-clients', link: '/SearchClientPage', isSeparator: true },
      { title: t('menu.messages'), icon: 'messages', link: '/Chat', badge: profile.notificationMessageCount },
      { title: t('menu.events'), icon: 'events', link: '/Calendar', badge: profile.notificationEventCount },
    ] : []),

    { title: t('menu.contacts'), icon: 'subscriptions', link: '/Contacts' },
    { title: t('menu.posts'), icon: 'posts', link: '/Posts', isSeparator: true },
    { title: t('menu.news'), icon: 'news', link: '/News', badge: profile.notificationNewsCount },

    { title: t('menu.settings'), icon: 'settings', link: '/me/settings', isSeparator: true },
  ]
  const handleLogout = () => {
    authContext.logOut();
  }
  const handleCollapse = () => {
    if (!collapsed) {

      cookie.set('menu-collapsed', '1', { expires: 60 * 60 * 24 * 365 })
    } else {
      cookie.remove('menu-collapsed')
    }
    setCollapsed(!collapsed)
  }

  console.log('CURRENTROUTE', currentRoute)

  const [isScrollable, setIsScrollable] = useState(true)

  const logo = (<div className={classNames(styles.logo, { [styles.logoAlt]: !showLeftMenu })}>
    {collapsed && <LogoSvg className={styles.logoCollapsed} color={'white'} />}
    {!collapsed && <Logo color={'white'} />}
    <div className={styles.collapseMenu} onClick={handleCollapse} />
  </div>)

  return (
    <div className={cx(styles.root, getModeClass(), { [styles.collapsed]: collapsed, [styles.menuHidden]: !showLeftMenu, [styles.noScroll]: !isScrollable })} id='scrollableDiv'>

      {showLeftMenu && <div className={styles.leftMenu}>
        {logo}
        {items.map(item => <>{item.isSeparator && <div className={styles.menuSeparator} />}<MenuItem
          isActive={(isCurrentProfileOpened && item.link === profileLink) || (item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
          link={item.link} badge={item.badge} mode={role} /></>)}
        <MenuItem isActive={false} onClick={handleLogout} title={t('menu.logout')} icon={'logout'}
          mode={role} />
      </div>}
      <div className={classNames(styles.header, { [styles.proj]: !showLeftMenu })}>
        <div className={styles.headerLeft}>
          {!showLeftMenu && logo}
          <div
            className={styles.hello}>{t('personalArea.profile.hello')} {profile?.firstName}. {roleCurrent !== 'corporate' && t('personalArea.profile.youAreIn')}
          </div>
          {roleCurrent !== 'corporate' && <ModeSelect user={props.user} />}
        </div>
        <NotificationSelect color='black' />
        <LangSelect isAuth={false} />
      </div>
      <Header
        isCurrentProfileOpened={isCurrentProfileOpened}
        state={isScrollable}
        onClick={() => setIsScrollable(isScrollable ? false : true)}
      />
      <div className={cx(styles.container)}>
        {children}
      </div>
    </div>
  )
}
LayoutAuthorized.defaultProps = {
  showLeftMenu: true
}
