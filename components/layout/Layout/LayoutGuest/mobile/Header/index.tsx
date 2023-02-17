import Logo from 'components/Logo'
import { useRouter } from 'next/router'
import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import { IRootState } from 'types'
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
import { logout } from 'components/Auth/actions'
import ModeSelect from 'components/layout/Layout/components/ModeSelect'
import {IUser} from 'data/intefaces/IUser'
import {useAppContext} from 'context/state'
import {useAuthContext} from 'context/auth_state'
import { signUpOpen } from 'components/Modal/actions'


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

  const getModeClassMenu = () => {
    switch (role) {
      case 'master':
        return styles.modeMasterMenu
      case 'volunteer':
        return styles.modeVolunteerMenu
      case 'client':
      default:
        return styles.modeClientMenu
    }
  }

  const dispatch = useDispatch()

  const handleLogout = () => {
    authContext.logOut();
  }

  const {t} = useTranslation('common')


  const item = [
    {title: t('menu.findCompanies'), icon: 'find-clients-black', link: '/FindCompanies', isSeparator: true},
  ]

  const itemsVolunteer = [
    {title: t('menu.findProjects'), icon: 'find-clients-blue', link: '/FindProjectsGuest'},
    {title: t('menu.findOrders'), icon: 'orders-blue', link: '/FindOrdersGuest',},
  ]

  const itemsMaster = [
    {title: t('menu.findProjects'), icon: 'find-clients-red', link: '/FindProjectsGuest'},
    {title: t('menu.findOrders'), icon: 'orders-red', link: '/FindOrdersGuest',},
  ]
  const itemsCompanies = [
    {title: t('menu.findVolunteer'), icon: 'find-clients-yellow', link: '/FindVolunteerGuest'},
    {title: t('menu.findMaster'), icon: 'find-clients-yellow', link: '/FindMasterGuest',},
  ]

  const router = useRouter()

  return (
    <div className={cx(styles.root)}>
      <Logo/>
      <div className={styles.right}>
        {!isMenuMobileOpen &&
        <>
        <SearchMobile className={styles.search} color='black'/>
        <NotificationSelect color='black' className={styles.notification}/>
        <LangSelect isAuth={false} className={styles.lang}/>
        <MenuMobile onClick={handleOpenMobileMenu} className={styles.open} color='black'/></>}
        {isMenuMobileOpen &&
          <>
          <LangSelect isAuth={false} className={styles.lang}/>
          <MenuMobileClose className={styles.open} onClick={handleCloseMobileMenu} color='black'/>
          </>
        }
        {isMenuMobileOpen && (
        <div className={cx(styles.dropdownMobile)}>
          <div
            className={styles.hello}>Hello guest! Please register for <span onClick={() => router.push('/registration/user')}>FREE</span> to get full functionality.
          </div>
          {item.map(item => <>{item.isSeparator && <div className={styles.menuSeparator}/>}<MenuItem
          isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
          link={item.link}/></>)}
        <div className={styles.volunteers}>
          <div className={styles.title}>
            {t('guestPage.forVolunteers')}
          </div>
          {itemsVolunteer.map(item =>
          <MenuItem
          className={styles.volunteersItem}
          isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
          link={item.link}/>)}
        </div>
        <div className={styles.masters}>
          <div className={styles.title}>
          {t('guestPage.forMasters')}
          </div>
          {itemsMaster.map(item =>
          <MenuItem
          className={styles.mastersItem}
          isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
          link={item.link}/>)}
        </div>
        <div className={styles.companies}>
          <div className={styles.title}>
          {t('guestPage.forCompanies')}
          </div>
          {itemsCompanies.map(item =>
          <MenuItem
          className={styles.companiesItem}
          isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
          link={item.link}/>)}
        </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Header
