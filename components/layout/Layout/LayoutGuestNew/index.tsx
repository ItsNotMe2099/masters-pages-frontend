import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import MenuItem from 'components/layout/Layout/components/MenuItem'
import { useTranslation } from 'next-i18next'
import { default as React, ReactElement, useEffect, useState } from 'react'
import Logo from 'components/Logo'
import cx from 'classnames'
import { useRouter } from 'next/router'
import LogoSvg from 'components/svg/Logo'
import cookie from 'js-cookie'
import LangSelect from 'components/LangSelect'
import { IUser } from 'data/intefaces/IUser'
import { signInOpen } from 'components/Modal/actions'
import MainSectionButton from 'components/for_pages/Corporate/Button'
import classNames from 'classnames'
import ArrowNewSvg from 'components/svg/ArrowNewSvg'
import DropdownLinks from 'components/ui/DropDownLinks'
import { useResize } from 'components/hooks/useResize'
import MainSectionHeader from 'components/for_pages/MainUserPage/Header'
import Menu from './Menu'

interface Props {
  children?: ReactElement[] | ReactElement,
  showLeftMenu?: boolean
  user?: IUser
  isCurrentProfileOpened?: boolean
}

export default function LayoutGuestNew(props: Props) {
  const { children, showLeftMenu, isCurrentProfileOpened } = props
  const { route: currentRoute } = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    setCollapsed(!!cookie.get('menu-collapsed'))
  }, [])

  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  const item = [
    { title: t('menu.findCompanies'), icon: 'find-clients-black', link: '/FindCompanies', isSeparator: true },
  ]

  const itemsVolunteer = [
    { title: t('menu.findCompanies'), icon: 'find-clients-black', link: '/FindCompanies', isSeparator: true },
    { title: t('menu.findProjects'), icon: 'find-clients-blue', link: '/FindProjectsGuest' },
  ]

  const itemsMaster = [
    { title: t('menu.findOrders'), icon: 'orders-red', link: '/FindOrdersGuest', },
    { title: 'Find clients', icon: 'find-clients-red', link: '/FindClientsGuest' },
  ]
  const itemsCompanies = [
    { title: t('menu.findVolunteer'), icon: 'find-clients-yellow', link: '/FindVolunteerGuest' },
    //{ title: t('menu.findMaster'), icon: 'find-clients-yellow', link: '/FindMasterGuest', },
  ]

  const itemsClubs = [
    { title: 'Find Clubs', icon: 'find-clients-yellow', link: '/FindClubs' },
    { title: 'Find Groups', icon: 'find-clients-yellow', link: '/FindGroups' },
    //{ title: t('menu.findMaster'), icon: 'find-clients-yellow', link: '/FindMasterGuest', },
  ]

  const itemsMembers = [
    { title: 'Find Members', icon: 'find-clients-yellow', link: '/FindMembers' },
  ]

  const itemsClients = [
    { title: 'Find Masters', icon: 'find-clients-green', link: '/FindMasterGuest', },
  ]
  const handleCollapse = () => {
    if (!collapsed) {

      cookie.set('menu-collapsed', '1', { expires: 60 * 60 * 24 * 365 })
    } else {
      cookie.remove('menu-collapsed')
    }
    setCollapsed(!collapsed)
  }

  const [isScrollable, setIsScrollable] = useState(true)

  const logo = (<div className={styles.logo}>
    {collapsed && <LogoSvg className={styles.logoCollapsed} />}
    {!collapsed && <Logo />}
    <div className={styles.collapseMenu} onClick={handleCollapse} />
  </div>)

  const router = useRouter()

  const { isDesktopWidth, isSmDesktopWidth, isTabletWidth } = useResize()

  const getLinkSelf = () => {
    if (currentRoute === '/FindOrdersGuest') {
      return '/FindOrdersGuest'
    }
    else if (currentRoute === '/FindClientsGuest') {
      return '/FindClientsGuest'
    }
    else {
      return '/FindOrdersGuest'
    }
  }

  const getLinkVol = () => {
    if (currentRoute === '/FindVolunteerGuest') {
      return '/FindVolunteerGuest'
    }
    else if (currentRoute === '/FindProjectsGuest') {
      return '/FindProjectsGuest'
    }
    else {
      return '/FindCompanies'
    }
  }

  const getLinkClubs = () => {
    if (currentRoute === '/FindGroups') {
      return '/FindGroups'
    }
    else if (currentRoute === '/FindMembers') {
      return '/FindMembers'
    }
    else {
      return '/FindClubs'
    }
  }

  const options = [{
    label: 'Self-Employed', link: getLinkSelf()
  },
  {
    label: 'Volunteering', link: getLinkVol()
  },
  {
    label: 'Clubs', link: getLinkClubs()
  }
  ]


  return (
    <div className={cx(styles.root, { [styles.collapsed]: collapsed, [styles.menuHidden]: !showLeftMenu, [styles.noScroll]: !isScrollable })} id='scrollableDiv'>
      {showLeftMenu && !isSmDesktopWidth && <div className={styles.leftMenu}>
        {logo}
        {/*item.map(item => <>{item.isSeparator && <div className={styles.menuSeparator} />}<MenuItem
          isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
  link={item.link} /></>)*/}
        {(currentRoute === '/FindClubs' || currentRoute === '/FindGroups' || currentRoute === '/FindMembers') &&
          <div className={styles.clubs}>
            <div className={styles.title}>
              For Members
            </div>
            {itemsClubs.map(item =>
              <MenuItem
                className={styles.clubsItem}
                isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
                link={item.link} />)}
          </div>
        }
        {(currentRoute === '/FindClubs' || currentRoute === '/FindGroups' || currentRoute === '/FindMembers') &&
          <div className={styles.members}>
            <div className={styles.title}>
              For Clubs
            </div>
            {itemsMembers.map(item =>
              <MenuItem
                className={styles.membersItem}
                isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
                link={item.link} />)}
          </div>
        }
        {(currentRoute === '/FindCompanies' || currentRoute === '/FindVolunteerGuest' || currentRoute === '/FindProjectsGuest') &&
          <div className={styles.volunteers}>
            <div className={styles.title}>
              {t('guestPage.forVolunteers')}
            </div>
            {itemsVolunteer.map(item =>
              <MenuItem
                className={styles.volunteersItem}
                isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
                link={item.link} />)}
          </div>}
        {(currentRoute === '/FindMasterGuest' || currentRoute === '/FindOrdersGuest' || currentRoute === '/FindClientsGuest') &&
          <>
            <div className={styles.masters}>
              <div className={styles.title}>
                {t('guestPage.forMasters')}
              </div>
              {itemsMaster.map(item =>
                <MenuItem
                  className={styles.mastersItem}
                  isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
                  link={item.link} />)}
            </div>
            <div className={styles.clients}>
              <div className={styles.title}>
                for Clients
              </div>
              {itemsClients.map(item =>
                <MenuItem
                  className={styles.clientsItem}
                  isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
                  link={item.link} />)}
            </div>
          </>
        }
        {(currentRoute === '/FindCompanies' || currentRoute === '/FindVolunteerGuest' || currentRoute === '/FindProjectsGuest') &&
          <div className={styles.companies}>
            <div className={styles.title}>
              {t('guestPage.forCompanies')}
            </div>
            {itemsCompanies.map(item =>
              <MenuItem
                className={styles.companiesItem}
                isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
                link={item.link} />)}
          </div>}
      </div>}
      {!isSmDesktopWidth ? <div className={classNames(styles.header, { [styles.proj]: !showLeftMenu })}>
        <div className={styles.headerLeft}>
          {!showLeftMenu && logo}
          <div
            className={classNames(styles.hello, { [styles.none]: !showLeftMenu })}>
            Hello Guest! You’re exploring
          </div>
          <DropdownLinks className={styles.dropdown} options={options} />
        </div>

        <div className={styles.btns}>
          {isDesktopWidth && <div className={styles.free}>
            <span>For FREE full access</span> <ArrowNewSvg />
          </div>}
          <MainSectionButton size={'small'} href='/registration/user'>{t('auth.signUp.title')}</MainSectionButton>
          <div className={styles.free}>
            <span>or</span> <ArrowNewSvg />
          </div>
          <MainSectionButton size={'small'} color='outlineRed' onClick={() => dispatch(signInOpen())}>{t('auth.signIn.title')}</MainSectionButton>
          <LangSelect isAuth={false} />
        </div>
      </div> : <>
        <MainSectionHeader />
        <div className={styles.topContent}>
          <div
            className={styles.helloMobile}>
            Hello Guest! You’re exploring
          </div>
          <div className={styles.wrapper}>
            <DropdownLinks className={styles.dropdown} options={options} />
          </div>
          <Menu />
        </div>
      </>}
      <div className={cx(styles.container)}>
        {children}
      </div>
    </div>
  )
}
LayoutGuestNew.defaultProps = {
  showLeftMenu: true
}
