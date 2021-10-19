import Logo from 'components/Logo'
import { useRouter } from 'next/router';
import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import { IRootState } from 'types';
import {getProfileRoleByRoute} from 'utils/profile'
import cx from 'classnames';
import MenuMobile from 'components/svg/MenuMobile';
import NotificationSelect from 'components/layout/Layout/components/NotificationSelect';
import Button from 'components/ui/Button';
import SearchMobile from 'components/svg/SearchMobile';
import { useState } from 'react';
import LangSelect  from 'components/LangSelect';
import MenuMobileClose from 'components/svg/MenuMobileClose';
import {useTranslation} from 'i18n'
import MenuItem from 'components/layout/Layout/components/MenuItem';
import { logout } from 'components/Auth/actions';
import ModeSelect from 'components/layout/Layout/components/ModeSelect';


interface Props {
  isCurrentProfileOpened?: boolean
}

const Header = (props: Props) => {

  const {route: currentRoute} = useRouter();
  const roleCurrent = useSelector((state: IRootState) => state.profile.role)
  const role =  getProfileRoleByRoute(currentRoute)  || roleCurrent;
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const [isMenuMobileOpen, setMenuMobileOpen] = useState(false)

  const handleOpenMobileMenu = () => {
    if (process.browser) {
      document.body.classList.add('modal-open')
    }
  
    setMenuMobileOpen(true)
  }
  
  const handleCloseMobileMenu = () => {
    if (process.browser) {
      document.body.classList.remove('modal-open')
    }
    setMenuMobileOpen(false)
  }

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

  const getModeClassMenu = () => {
    switch (role) {
      case 'master':
        return styles.modeMasterMenu;
      case 'volunteer':
        return styles.modeVolunteerMenu;
      case 'client':
      default:
        return styles.modeClientMenu;
    }
  }

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout());
  }

  const {t} = useTranslation('common');

  const profileLink = `/id${profile?.id}`;

  const items = [
    {title: t('menu.profile'), icon: 'profile', link: profileLink},
    {title: t('menu.share'), icon: 'share', link: '/Share'},
    {title: t('menu.invite'), icon: 'invite', link: '/Invite'},
    ...(profile.role !== 'client' ? [
    {title: t('menu.findOrders'), icon: 'find-orders', link: '/SearchTaskPage', isSeparator: true}
    ] : []),
    {title: t('menu.orders'), icon: 'orders', link: '/orders', isSeparator: profile.role === 'client', badge: profile.notificationTaskResponseDeclinedCount + profile.notificationTaskOfferDeclinedCount + profile.notificationTaskResponseCount + profile.notificationTaskOfferCount},
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
          <ModeSelect onClick={handleCloseMobileMenu}/>
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
