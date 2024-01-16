import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import MenuItem from 'components/layout/Layout/components/MenuItem'
import { useTranslation } from 'next-i18next'
import { default as React, ReactElement, useEffect, useState } from 'react'
import Logo from 'components/Logo'
import { useRouter } from 'next/router'
import LogoSvg from 'components/svg/Logo'
import cookie from 'js-cookie'
import { IUser } from 'data/intefaces/IUser'
import { useResize } from 'components/hooks/useResize'

interface Props {
  children?: ReactElement[] | ReactElement,
  showLeftMenu?: boolean
  user?: IUser
  isCurrentProfileOpened?: boolean
}

export default function Menu(props: Props) {
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

  const { isDesktopWidth, isSmDesktopWidth } = useResize()


  return (
    <div className={styles.root}>
      <div className={styles.leftMenu}>
        {(currentRoute === '/FindClubs' || currentRoute === '/FindGroups' || currentRoute === '/FindMembers') &&
          <div className={styles.clubs}>
            <div className={styles.title}>
              For Members
            </div>
            <div className={styles.items}>
              {itemsClubs.map(item =>
                <MenuItem
                  className={styles.clubsItem}
                  lineClass={styles.clubsLine}
                  isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
                  link={item.link} />)}
            </div>
          </div>
        }
        {(currentRoute === '/FindClubs' || currentRoute === '/FindGroups' || currentRoute === '/FindMembers') &&
          <div className={styles.members}>
            <div className={styles.title}>
              For Clubs
            </div>
            <div className={styles.items}>
              {itemsMembers.map(item =>
                <MenuItem
                  className={styles.membersItem}
                  lineClass={styles.membersLine}
                  isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
                  link={item.link} />)}
            </div>
          </div>
        }
        {(currentRoute === '/FindCompanies' || currentRoute === '/FindVolunteerGuest' || currentRoute === '/FindProjectsGuest') &&
          <div className={styles.volunteers}>
            <div className={styles.title}>
              {t('guestPage.forVolunteers')}
            </div>
            <div className={styles.items}>
              {itemsVolunteer.map(item =>
                <MenuItem
                  className={styles.volunteersItem}
                  lineClass={styles.volunteersLine}
                  isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
                  link={item.link} />)}
            </div>
          </div>}
        {(currentRoute === '/FindMasterGuest' || currentRoute === '/FindOrdersGuest' || currentRoute === '/FindClientsGuest') &&
          <>
            <div className={styles.masters}>
              <div className={styles.title}>
                {t('guestPage.forMasters')}
              </div>
              <div className={styles.items}>
                {itemsMaster.map(item =>
                  <MenuItem
                    className={styles.mastersItem}
                    lineClass={styles.mastersLine}
                    isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
                    link={item.link} />)}
              </div>
            </div>
            <div className={styles.clients}>
              <div className={styles.title}>
                for Clients
              </div>
              <div className={styles.items}>
                {itemsClients.map(item =>
                  <MenuItem
                    className={styles.clientsItem}
                    lineClass={styles.clientsLine}
                    isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
                    link={item.link} />)}
              </div>
            </div>
          </>
        }
        {(currentRoute === '/FindCompanies' || currentRoute === '/FindVolunteerGuest' || currentRoute === '/FindProjectsGuest') &&
          <div className={styles.companies}>
            <div className={styles.title}>
              {t('guestPage.forCompanies')}
            </div>
            <div className={styles.items}>
              {itemsCompanies.map(item =>
                <MenuItem
                  className={styles.companiesItem}
                  lineClass={styles.companiesLine}
                  isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
                  link={item.link} />)}
            </div>
          </div>}
      </div>
    </div>
  )
}
