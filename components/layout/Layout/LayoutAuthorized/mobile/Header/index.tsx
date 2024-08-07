import Logo from 'components/Logo'
import { useRouter } from 'next/router'
import styles from './index.module.scss'
import {useDispatch} from 'react-redux'
import {getProfileRoleByRoute} from 'utils/profileRole'
import cx from 'classnames'
import MenuMobile from 'components/svg/MenuMobile'
import NotificationSelect from 'components/layout/Layout/components/NotificationSelect'
import SearchMobile from 'components/svg/SearchMobile'
import { useState } from 'react'
import LangSelect  from 'components/LangSelect'
import MenuMobileClose from 'components/svg/MenuMobileClose'
import { useTranslation } from 'next-i18next'
import MenuItem from 'components/layout/Layout/components/MenuItem'
import ModeSelect from 'components/layout/Layout/components/ModeSelect'
import {IUser} from 'data/intefaces/IUser'
import {useAppContext} from 'context/state'
import {useAuthContext} from 'context/auth_state'
import { ProfileRole } from 'data/intefaces/IProfile'
import Routes from "pages/routes";


interface Props {
  isCurrentProfileOpened?: boolean
  user?: IUser
  onClick?: () => void
  state?: boolean
}

const Header = (props: Props) => {

  const {route: currentRoute} = useRouter()
  const appContext = useAppContext()
  const authContext = useAuthContext()
  const roleCurrent = appContext.role
  const role =  getProfileRoleByRoute(currentRoute)  || roleCurrent
  const profile = appContext.profile
  const [isMenuMobileOpen, setMenuMobileOpen] = useState(false)
  const [isScrollable, setIsScrollable] = useState(props.state)

  const handleClick = (isScrollable: boolean) => {
    setIsScrollable(isScrollable)
    props.onClick && props.onClick()
  }

  const handleOpenMobileMenu = () => {
    if (process.browser) {
      document.body.classList.add('modal-open')
    }
    handleClick(false)
    setMenuMobileOpen(true)
  }

  const handleCloseMobileMenu = () => {
    if (process.browser) {
      document.body.classList.remove('modal-open')
    }
    handleClick(true)
    setMenuMobileOpen(false)
  }

  const getModeClass = () => {
    switch (role) {
      case 'master':
        return styles.modeMaster
      case 'volunteer':
        return styles.modeVolunteer
      case 'corporate':
        return styles.modeCorporate
      case 'client':
      default:
        return styles.modeClient
    }
  }

  const getModeClassMenu = () => {
    switch (role) {
      case 'master':
        return styles.modeMasterMenu
      case 'volunteer':
        return styles.modeVolunteerMenu
      case 'corporate':
        return styles.modeCorproateMenu
      default:
        return styles.modeClientMenu
    }
  }

  const handleLogout = () => {
    authContext.logOut();
  }

  const {t} = useTranslation('common')

  const profileLink = `${Routes.profile(profile)}`

  const items = role === ProfileRole.Corporate ? [
    {title: t('menu.profile'), icon: 'profile', link: profileLink},
    {title: t('menu.posts'), icon: 'posts', link: '/Posts'},
    {title: t('menu.news'), icon: 'news', link: '/News', badge: profile.notificationNewsCount},
    {title: t('menu.contacts'), icon: 'subscriptions', link: '/Contacts'},
    {title: t('menu.messages'), icon: 'messages', link: '/Chat', badge: profile.notificationMessageCount},
    {title: t('menu.volunteerProjects'), icon: 'orders', link: '/projects', isSeparator: true},
    {title: t('menu.findVolunteer'), icon: 'find-clients', link: '/SearchVolunteerPage', isSeparator: true},
    {title: t('menu.events'), icon: 'events', link: '/Calendar', badge: profile.notificationEventCount},
    {title: t('menu.reports'), icon: 'reports', link: '/Report'},

    {title: t('menu.settings'), icon: 'settings', link: '/me/settings', isSeparator: true},
  ] : [
    {title: t('menu.profile'), icon: 'profile', link: profileLink},
    {title: t('menu.share'), icon: 'share', link: '/Share'},
    {title: t('menu.invite'), icon: 'invite', link: '/Invite'},
    ...(role === ProfileRole.Master ? [
    {title: t('menu.findOrders'), icon: 'find-orders', link: '/SearchTaskPage', isSeparator: true}
    ] : []),
    ...(role === ProfileRole.Client ?
      [
    {title: t('menu.orders'), icon: 'orders', link: '/orders', isSeparator: profile.role === 'client', badge: profile.notificationTaskResponseDeclinedCount + profile.notificationTaskOfferDeclinedCount + profile.notificationTaskResponseCount + profile.notificationTaskOfferCount},
      ] : []),
    ...(role === ProfileRole.Volunteer ? [
      {title: t('menu.projects'), icon: 'projects', link: '/projects', isSeparator: true},
      {title: t('menu.findProjects'), icon: 'find-projects', link: '/project-search', isSeparator: false},
      {title: t('menu.findCompanies'), icon: 'find-clients', link: '/FindCompanies', isSeparator: false},
      ] : []),
    {title: t('menu.events'), icon: 'events', link: '/Calendar', badge: profile.notificationEventCount},
    {title: t('menu.reports'), icon: 'reports', link: '/Report'},

    ...(role === ProfileRole.Client ? [
      {title: t('menu.findMaster'), icon: 'find-clients', link: '/SearchMasterPage', isSeparator: true},
    ] : []),
    ...(role === ProfileRole.Master ? [
      {title: t('menu.findClients'), icon: 'find-clients', link: '/SearchClientPage', isSeparator: true},
    ] : []),

    {title: t('menu.messages'), icon: 'messages', link: '/Chat', badge: profile.notificationMessageCount},
    {title: t('menu.contacts'), icon: 'subscriptions', link: '/Contacts'},
    {title: t('menu.posts'), icon: 'posts', link: '/Posts', isSeparator: true},
    {title: t('menu.news'), icon: 'news', link: '/News', badge: profile.notificationNewsCount},

    {title: t('menu.settings'), icon: 'settings', link: '/me/settings', isSeparator: true},
  ]

  return (
    <div className={cx(styles.root, getModeClass())}>
      <Logo color='white'/>
      <div className={styles.right}>
        {!isMenuMobileOpen &&
        <>
        <NotificationSelect color='white'/>
        <SearchMobile className={styles.search}/>
        <MenuMobile onClick={handleOpenMobileMenu} className={styles.open}/></>}
        {isMenuMobileOpen &&
          <>
          <LangSelect isAuth/>
          <MenuMobileClose className={styles.open} onClick={handleCloseMobileMenu}/>
          </>
        }
        {isMenuMobileOpen && (
        <div className={cx(styles.dropdownMobile, getModeClassMenu())}>
          <div
            className={styles.hello}>{t('personalArea.profile.hello')} {profile?.firstName}. {t('personalArea.profile.youAreIn')}
          </div>
          <ModeSelect onClick={handleCloseMobileMenu} user={props.user}/>
          {items.map(item => <>{item.isSeparator && <div className={styles.menuSeparator}/>}<div onClick={handleCloseMobileMenu}><MenuItem
          isActive={(props.isCurrentProfileOpened && item.link === profileLink ) || (item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
          link={item.link} badge={item.badge} mode={role}/></div></>)}
        <MenuItem isActive={false} onClick={handleLogout} title={t('menu.logout')} icon={'logout'}
                  mode={role}/>
        </div>
      )}
      </div>
    </div>
  )
}

export default Header
